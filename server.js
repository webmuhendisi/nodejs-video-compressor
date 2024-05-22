const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

const inputFilePath = path.join(__dirname, 'test.mp4');
const outputFilePath = path.join(__dirname, 'compressed_test.mp4');

function compressVideo(input, output) {
  return new Promise((resolve, reject) => {
    ffmpeg(input)
      .outputOptions([
        '-c:v libx264',       // Video codec
        '-crf 28',            // Constant Rate Factor (lower is better quality, but larger file size)
        '-preset veryslow',   // Compression preset (slower is better compression)
        '-b:v 500k',          // Bitrate for video
        '-c:a aac',           // Audio codec
        '-b:a 128k'           // Bitrate for audio
      ])
      .on('end', () => {
        console.log('Compression completed');
        resolve();
      })
      .on('error', (err) => {
        console.error('Error during compression', err);
        reject(err);
      })
      .save(output);
  });
}

compressVideo(inputFilePath, outputFilePath)
  .then(() => {
    console.log('Video compressed successfully.');
  })
  .catch((err) => {
    console.error('Failed to compress video:', err);
  });
