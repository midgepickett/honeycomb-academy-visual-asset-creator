#!/usr/bin/env python3
"""
Add an MP4 file as an asset to the Camtasia User Library.

Usage:
  python3 scripts/add_to_camtasia.py <path/to/video.mp4> [--library-folder "Folder Name"]

Drops the asset into the HNY Academy Animations folder inside the library package
found at ~/Library/Application Support/TechSmith/Camtasia/Library/User Libraries/.
"""

import argparse
import json
import os
import shutil
import subprocess
import sys
import uuid
from datetime import datetime, timezone
from pathlib import Path

LIBRARY_ROOT = Path.home() / "Library/Application Support/TechSmith/Camtasia/Library/User Libraries"
EDIT_RATE = 705600000
VIDEO_EDIT_RATE = 90000

def find_library_package():
    """Return the first *.camtasia library or LibPkg_* folder found."""
    for p in sorted(LIBRARY_ROOT.iterdir()):
        if p.is_dir():
            return p
    raise FileNotFoundError(f"No library package found in {LIBRARY_ROOT}")

def get_video_metadata(mp4_path: Path):
    """Use macOS mdls to get duration, width, height."""
    result = subprocess.run(
        ["mdls", "-name", "kMDItemDurationSeconds",
                 "-name", "kMDItemPixelWidth",
                 "-name", "kMDItemPixelHeight",
                 str(mp4_path)],
        capture_output=True, text=True
    )
    meta = {}
    for line in result.stdout.splitlines():
        key, _, val = line.partition(" = ")
        meta[key.strip()] = val.strip()
    return {
        "duration": float(meta["kMDItemDurationSeconds"]),
        "width": int(meta["kMDItemPixelWidth"]),
        "height": int(meta["kMDItemPixelHeight"]),
    }

def generate_thumbnail(mp4_path: Path, out_path: Path):
    """Extract a thumbnail using qlmanage, fallback to a solid cobalt PNG."""
    tmp = out_path.parent / "_ql_thumb"
    tmp.mkdir(exist_ok=True)
    result = subprocess.run(
        ["qlmanage", "-t", "-s", "400", "-o", str(tmp), str(mp4_path)],
        capture_output=True
    )
    # qlmanage writes e.g. "video.mp4.png"
    candidates = list(tmp.glob("*.png"))
    if candidates:
        shutil.move(str(candidates[0]), str(out_path))
        shutil.rmtree(tmp, ignore_errors=True)
        return
    shutil.rmtree(tmp, ignore_errors=True)
    # Fallback: 320x180 cobalt PNG via Python
    try:
        import struct, zlib
        def png(w, h, color):
            def chunk(tag, data):
                c = zlib.crc32(tag + data) & 0xffffffff
                return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", c)
            raw = b"".join(b"\x00" + bytes(color) * w for _ in range(h))
            return (b"\x89PNG\r\n\x1a\n"
                    + chunk(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0))
                    + chunk(b"IDAT", zlib.compress(raw))
                    + chunk(b"IEND", b""))
        out_path.write_bytes(png(320, 180, [2, 120, 205]))  # #0278CD cobalt
    except Exception as e:
        print(f"  Warning: could not generate thumbnail: {e}")

def build_assetproj(name: str, mp4_filename: str, width: int, height: int, duration_s: float) -> dict:
    dur_ticks = int(duration_s * EDIT_RATE)
    vid_ticks = int(duration_s * VIDEO_EDIT_RATE)
    now = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S")
    return {
        "width": float(width),
        "height": float(height),
        "ident": "",
        "version": "8.0",
        "clientName": "Camtasia",
        "editRate": EDIT_RATE,
        "sourceBin": [
            {
                "id": 1,
                "src": mp4_filename,
                "rect": [0, 0, width, height],
                "lastMod": now,
                "loudnessNormalization": True,
                "sourceTracks": [
                    {
                        "range": [0, vid_ticks],
                        "type": 0,
                        "editRate": VIDEO_EDIT_RATE,
                        "trackRect": [0, 0, width, height],
                        "sampleRate": "30000/1001",
                        "bitDepth": 24,
                        "numChannels": 0,
                        "integratedLUFS": 100.0,
                        "peakLevel": -1.0,
                        "metaData": ""
                    }
                ],
                "metadata": {"timeAdded": datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S.%f")[:22]}
            }
        ],
        "timeline": {
            "id": 2,
            "sceneTrack": {
                "scenes": [
                    {
                        "csml": {
                            "tracks": [
                                {
                                    "trackIndex": 0,
                                    "medias": [
                                        {
                                            "id": 3,
                                            "_type": "UnifiedMedia",
                                            "video": {
                                                "id": 4,
                                                "_type": "VMFile",
                                                "src": 1,
                                                "trackNumber": 0,
                                                "attributes": {"ident": ""},
                                                "parameters": {
                                                    "geometryCrop0": {"type": "double", "defaultValue": 0.0, "interp": "eioe"},
                                                    "geometryCrop1": {"type": "double", "defaultValue": 0.0, "interp": "eioe"},
                                                    "geometryCrop2": {"type": "double", "defaultValue": 0.0, "interp": "eioe"},
                                                    "geometryCrop3": {"type": "double", "defaultValue": 0.0, "interp": "eioe"},
                                                },
                                                "effects": [],
                                                "start": 0,
                                                "duration": dur_ticks,
                                                "mediaStart": 0,
                                                "mediaDuration": dur_ticks,
                                                "scalar": 1,
                                                "animationTracks": {}
                                            },
                                            "start": 0,
                                            "duration": dur_ticks,
                                            "mediaStart": 0,
                                            "mediaDuration": dur_ticks,
                                            "scalar": 1
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                ]
            },
            "trackAttributes": [
                {
                    "ident": "",
                    "audioMuted": False,
                    "videoHidden": False,
                    "magnetic": False,
                    "matte": 0,
                    "solo": False
                }
            ],
            "captionAttributes": {
                "enabled": True,
                "fontName": "Arial",
                "fontSize": 32,
                "backgroundColor": [0, 0, 0, 191],
                "foregroundColor": [255, 255, 255, 255],
                "lang": "en",
                "alignment": 0,
                "defaultFontSize": True,
                "opacity": 0.5,
                "backgroundEnabled": True,
                "backgroundOnlyAroundText": True
            },
            "gain": 1.0,
            "legacyAttenuateAudioMix": False,
            "backgroundColor": [0, 0, 0, 255]
        },
        "duration": -1
    }

def build_info_json(width: int, height: int, duration_s: float, file_size: int) -> dict:
    now = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S")
    return {
        "Asset Created Date": now,
        "Asset Creator": os.environ.get("USER", "claude"),
        "Asset Duration": str(int(duration_s * EDIT_RATE)),
        "Asset Edit Rate": f"{EDIT_RATE}/1",
        "Asset Height": str(height),
        "Asset Id": str(uuid.uuid4()),
        "Asset Info Version": "1",
        "Asset Last Used Date": now,
        "Asset Project Version": "8.0",
        "Asset Size": str(file_size),
        "Asset Type": "1",
        "Asset Width": str(width),
    }

def add_to_camtasia(mp4_path: Path, library_folder: str = "HNY Academy Animations"):
    mp4_path = mp4_path.resolve()
    if not mp4_path.exists():
        print(f"Error: {mp4_path} not found")
        sys.exit(1)

    name = mp4_path.stem
    lib_pkg = find_library_package()
    dest_folder = lib_pkg / library_folder
    dest_folder.mkdir(exist_ok=True)

    asset_dir = dest_folder / f"{name}.asset"
    if asset_dir.exists():
        shutil.rmtree(asset_dir)
    asset_dir.mkdir()

    print(f"  Getting video metadata...")
    meta = get_video_metadata(mp4_path)
    print(f"  {meta['width']}x{meta['height']}, {meta['duration']:.3f}s")

    mp4_dest = asset_dir / mp4_path.name
    shutil.copy2(mp4_path, mp4_dest)

    print(f"  Generating thumbnail...")
    generate_thumbnail(mp4_path, asset_dir / f"{name}.thumb.png")

    assetproj = build_assetproj(name, mp4_path.name, meta["width"], meta["height"], meta["duration"])
    (asset_dir / f"{name}.assetproj").write_text(json.dumps(assetproj, indent=2))

    info = build_info_json(meta["width"], meta["height"], meta["duration"], mp4_dest.stat().st_size)
    (asset_dir / f"{name}.info.json").write_text(json.dumps(info, indent=2))

    print(f"  Added to library: {asset_dir.relative_to(LIBRARY_ROOT)}")

def main():
    parser = argparse.ArgumentParser(description="Add MP4 to Camtasia library")
    parser.add_argument("mp4", nargs="+", help="Path(s) to MP4 file(s)")
    parser.add_argument("--library-folder", default="HNY Academy Animations", help="Subfolder within the library package")
    args = parser.parse_args()

    for path in args.mp4:
        print(f"\nAdding {Path(path).name}...")
        add_to_camtasia(Path(path), args.library_folder)

    print("\nDone. Restart Camtasia if it was open.")

if __name__ == "__main__":
    main()
