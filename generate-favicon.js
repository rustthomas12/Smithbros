const sharp = require('sharp');
const fs = require('fs');

async function generateFavicons() {
    const logoPath = './public/images/logo.png';

    // Generate favicon.ico (32x32)
    await sharp(logoPath)
        .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
        .toFile('./public/favicon-32x32.png');

    // Generate 16x16
    await sharp(logoPath)
        .resize(16, 16, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
        .toFile('./public/favicon-16x16.png');

    // Generate Apple Touch Icon (180x180)
    await sharp(logoPath)
        .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
        .toFile('./public/apple-touch-icon.png');

    // Generate Android Chrome icons
    await sharp(logoPath)
        .resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
        .toFile('./public/android-chrome-192x192.png');

    await sharp(logoPath)
        .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
        .toFile('./public/android-chrome-512x512.png');

    console.log('Favicons generated successfully!');
}

generateFavicons().catch(console.error);
