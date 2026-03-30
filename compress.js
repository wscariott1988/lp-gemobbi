const sharp = require('sharp');
const fs = require('fs');
const files = ['moto-honda-fan-inteira.webp', 'painel-digital-honda-fan.webp', 'farol-led-honda-fan.webp', 'banco-confortavel-honda-fan.webp'];

async function processImages() {
  for (const file of files) {
    if (fs.existsSync(file)) {
      const buffer = fs.readFileSync(file);
      await sharp(buffer)
        .resize({ width: 600, withoutEnlargement: true })
        .webp({ quality: 75, effort: 6 })
        .toFile(file);
      console.log(`Compressed ${file}`);
    }
  }
}

processImages().catch(console.error);
