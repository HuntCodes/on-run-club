const Jimp = require('jimp');

async function createIcons() {
  try {
    // Create main icon
    const icon = new Jimp(1024, 1024, 0xFFFFFFFF);
    const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
    icon.print(font, 0, 480, 'OnRunClub');
    await icon.writeAsync('assets/icon.png');

    // Create adaptive icon
    const adaptiveIcon = new Jimp(1024, 1024, 0x00000000);
    adaptiveIcon.print(font, 0, 480, 'OnRunClub');
    await adaptiveIcon.writeAsync('assets/adaptive-icon.png');

    // Create favicon
    const favicon = new Jimp(32, 32, 0xFFFFFFFF);
    const smallFont = await Jimp.loadFont(Jimp.FONT_SANS_8_WHITE);
    favicon.print(smallFont, 0, 12, 'ORC');
    await favicon.writeAsync('assets/favicon.png');

    console.log('Icons created successfully!');
  } catch (err) {
    console.error('Error creating icons:', err);
  }
}

createIcons(); 