const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const ROOT_DIR = path.join(__dirname, '..');
const VALID_EXTS = ['.png', '.jpg', '.jpeg'];

const convertedMap = {}; // oldRelativePath -> newRelativePath

async function walkAndConvert(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkAndConvert(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (VALID_EXTS.includes(ext)) {
        const webpName = entry.name.slice(0, -ext.length) + '.webp';
        const webpFullPath = path.join(dir, webpName);
        try {
          await sharp(fullPath)
            .webp({ quality: 80 })
            .toFile(webpFullPath);
          
          const relOld = '/' + path.relative(PUBLIC_DIR, fullPath).replace(/\\/g, '/');
          const relNew = '/' + path.relative(PUBLIC_DIR, webpFullPath).replace(/\\/g, '/');
          convertedMap[relOld] = relNew;
          console.log(`Converted: ${relOld} -> ${relNew}`);
        } catch (err) {
          console.error(`Failed to convert ${fullPath}:`, err.message);
        }
      }
    }
  }
}

async function updateReferences(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.git' || entry.name === 'scratch') continue;
    if (entry.isDirectory()) {
      await updateReferences(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.js', '.jsx', '.ts', '.tsx', '.json', '.css'].includes(ext)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let modified = false;
        for (const [oldPath, newPath] of Object.entries(convertedMap)) {
          if (content.includes(oldPath)) {
            content = content.replaceAll(oldPath, newPath);
            modified = true;
          }
        }
        if (modified) {
          fs.writeFileSync(fullPath, content, 'utf8');
          console.log(`Updated references in: ${path.relative(__dirname, fullPath)}`);
        }
      }
    }
  }
}

async function main() {
  console.log('--- Starting WebP Conversion ---');
  await walkAndConvert(PUBLIC_DIR);
  console.log(`--- Total Converted: ${Object.keys(convertedMap).length} images ---`);
  console.log('--- Updating References Across Codebase & DB ---');
  await updateReferences(ROOT_DIR);
  console.log('--- Finished successfully! ---');
}

main().catch(console.error);
