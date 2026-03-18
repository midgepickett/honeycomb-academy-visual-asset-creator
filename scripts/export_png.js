#!/usr/bin/env node
/**
 * Export an HTML file to PNG using Puppeteer.
 * Takes a tight crop around the first child of <body> — no extra whitespace.
 *
 * Usage:
 *   node scripts/export_png.js <path/to/file.html> [output/path/to/file.png]
 *
 * If no output path is given, saves alongside the HTML file with a .png extension.
 *
 * Examples:
 *   node scripts/export_png.js output/diagrams/html/otel-pipeline.html
 *   node scripts/export_png.js output/comics/html/my-comic.html output/comics/png/my-comic.png
 */

const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

async function exportPng(htmlPath, outPath) {
  const absHtml = path.resolve(htmlPath);
  if (!fs.existsSync(absHtml)) {
    console.error(`File not found: ${absHtml}`);
    process.exit(1);
  }

  if (!outPath) {
    outPath = absHtml.replace(/\.html$/, ".png");
  }
  const absOut = path.resolve(outPath);
  fs.mkdirSync(path.dirname(absOut), { recursive: true });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 1600, height: 1200, deviceScaleFactor: 2 });
  await page.goto(`file://${absHtml}`, { waitUntil: "networkidle0" });

  // Tight crop around the first child element of body
  const el = await page.$("body > *:first-child");
  if (!el) {
    console.error("No content element found in <body>");
    await browser.close();
    process.exit(1);
  }

  const box = await el.boundingBox();
  await page.screenshot({
    path: absOut,
    clip: { x: box.x, y: box.y, width: box.width, height: box.height },
  });

  await browser.close();
  console.log(`Saved: ${path.relative(process.cwd(), absOut)}`);
}

const [, , htmlArg, outArg] = process.argv;
if (!htmlArg) {
  console.error("Usage: node scripts/export_png.js <file.html> [output.png]");
  process.exit(1);
}

exportPng(htmlArg, outArg).catch((err) => {
  console.error(err);
  process.exit(1);
});
