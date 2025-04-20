const fs = require('fs');

const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg">
    <rect width="1024" height="1024" fill="white"/>
    <text x="512" y="512" 
          font-family="Arial, sans-serif" 
          font-size="120" 
          font-weight="bold" 
          text-anchor="middle" 
          dominant-baseline="middle"
          fill="black">
        OnRunClub
    </text>
</svg>`;

const outputDir = 'assets';
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

fs.writeFileSync('assets/icon.svg', svgContent);
console.log('Icon created at assets/icon.svg'); 