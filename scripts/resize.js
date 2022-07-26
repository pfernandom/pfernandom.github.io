import sharp from 'sharp';

sharp('/public/book.jpeg')
  .rotate()
  .resize(200)
  .jpeg({ mozjpeg: true });
