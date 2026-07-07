// scripts/compress-images.js
// Walk public/ for .jpg / .jpeg / .png larger than SIZE_THRESHOLD,
// emit a WebP sibling at QUALITY, and re-encode the original at the same
// extension if the re-encoded fallback comes out smaller than what's on disk.
//
// Run with: node scripts/compress-images.js
// Originals are kept at the same path so any `<img src="X.jpg">` in the site
// continues to resolve. WebP is added next to the original so a `<picture>`
// or next/image consumer can pick it up.

const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const SIZE_THRESHOLD = 500 * 1024;
const QUALITY = 80;
const MAX_DIMENSION = 1920;
const EXTS = new Set([".jpg", ".jpeg", ".png"]);

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

function fmtKb(bytes) {
  return `${(bytes / 1024).toFixed(0)} KB`;
}

function fmtMb(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function run() {
  const candidates = [];
  for await (const p of walk(PUBLIC_DIR)) {
    const ext = path.extname(p).toLowerCase();
    if (!EXTS.has(ext)) continue;
    const stat = await fs.stat(p);
    if (stat.size >= SIZE_THRESHOLD) {
      candidates.push({ path: p, size: stat.size, ext });
    }
  }

  if (candidates.length === 0) {
    console.log("No images over 500 KB found under public/. Nothing to do.");
    return;
  }

  console.log(`Found ${candidates.length} image(s) over 500 KB.`);
  console.log(`Quality ${QUALITY}, max dimension ${MAX_DIMENSION}px.\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const c of candidates) {
    const rel = path.relative(PUBLIC_DIR, c.path);
    const base = c.path.replace(/\.[^.]+$/, "");
    const webpPath = `${base}.webp`;

    const buf = await fs.readFile(c.path);
    const pipeline = sharp(buf).rotate().resize({
      width: MAX_DIMENSION,
      height: MAX_DIMENSION,
      fit: "inside",
      withoutEnlargement: true,
    });

    // Build the WebP sibling.
    const webpBuf = await pipeline.clone().webp({ quality: QUALITY }).toBuffer();
    await fs.writeFile(webpPath, webpBuf);

    // Build a same-extension fallback. Only overwrite if the new file is
    // smaller than what's currently on disk.
    let fallbackBuf;
    if (c.ext === ".png") {
      fallbackBuf = await pipeline
        .clone()
        .png({ quality: QUALITY, compressionLevel: 9 })
        .toBuffer();
    } else {
      fallbackBuf = await pipeline
        .clone()
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toBuffer();
    }

    const beforeSize = c.size;
    let fallbackWritten = false;
    let afterFallback = beforeSize;
    if (fallbackBuf.length < beforeSize) {
      await fs.writeFile(c.path, fallbackBuf);
      fallbackWritten = true;
      afterFallback = fallbackBuf.length;
    }

    totalBefore += beforeSize;
    totalAfter += afterFallback + webpBuf.length;

    const beforeStr = fmtKb(beforeSize);
    const fallbackStr = fallbackWritten
      ? `${fmtKb(beforeSize)} -> ${fmtKb(afterFallback)} (re-encoded fallback)`
      : `${fmtKb(beforeSize)} (left alone, on-disk smaller than re-encoded)`;
    const webpStr = `${fmtKb(webpBuf.length)} (new .webp)`;
    console.log(`  ${rel}`);
    console.log(`    fallback: ${fallbackStr}`);
    console.log(`    webp:     ${webpStr}`);
  }

  console.log(`\nTotal before: ${fmtMb(totalBefore)}`);
  console.log(`Total after (fallback + webp): ${fmtMb(totalAfter)}`);
  const saved = totalBefore - totalAfter;
  if (saved > 0) {
    console.log(`Saved: ${fmtMb(saved)}`);
  } else {
    console.log(`Net change: +${fmtMb(-saved)} (WebP siblings added).`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
