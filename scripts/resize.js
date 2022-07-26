const sharp = require('sharp');
const fs = require('fs');

const files = fs.readdirSync('./images');

files.forEach(f => {
  const input = `./images/${f}`;
  sharp(input)
    .metadata()
    .then(({ width }) => {
      sharp(input)
        .resize(400)
        .blur(5)
        .webp({ lossless: false, quality: 50 })
        .toFile(`./public/blur_${f}`, function(err) {
          // output.jpg is a 300 pixels wide and 200 pixels high image
          // containing a scaled and cropped version of input.jpg
          if (err) {
            console.error(err);
          }
        });

      sharp(input)
        // .resize(Math.round(width * 0.5))
        .resize(400)
        .jpeg({ mozjpeg: true, quality: 90 })
        .toFile(`./public/${f}`, function(err) {
          // output.jpg is a 300 pixels wide and 200 pixels high image
          // containing a scaled and cropped version of input.jpg
          if (err) {
            console.error(err);
          }
        });
    });
});
