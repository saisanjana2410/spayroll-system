
// const jimp = require('jimp');
// const PNG = require('pngjs').PNG;

// const pixelmatch = require('pixelmatch');

// const urlToBuffer = async (url) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const image = await jimp.read(url);
//             image.resize(400, 400);
//             return image.getBuffer(jimp.MIME_PNG, (err, buffer) => {
//                 if (err) {
//                     console.log(`error converting image url to buffer: ${err}`);
//                     reject(err);
//                 }
//                 resolve(buffer);
//             });
//         } catch (err) {
//             console.log(`error reading image in jimp: ${err}`);
//             reject(err);
//         }
//     });
// };


// const compareImage = async (
//     twitterProfilePicURL,
//     assetCDNURL
// ) => {
//     try {
//         console.log('> Started comparing two images');
//         const img1Buffer = await urlToBuffer(twitterProfilePicURL);
//         const img2Buffer = await urlToBuffer(assetCDNURL);
//         const img1 = PNG.sync.read(img1Buffer);
//         const img2 = PNG.sync.read(img2Buffer);
//         const { width, height } = img1;
//         const diff = new PNG({ width, height });

//         const difference = pixelmatch(
//             img1.data,
//             img2.data,
//             diff.data,
//             width,
//             height,
//             {
//                 threshold: 0.1,
//             }
//         );

//         const compatibility = 100 - (difference * 100) / (width * height);
//         console.log(`${difference} pixels differences`);
//         console.log(`Compatibility: ${compatibility}%`);
//         console.log('< Completed comparing two images');
//         return compatibility;
//     } catch (error) {
//         console.log(`error comparing images: ${error}`);
//         throw error;
//     }
// };


// compareImage('./ab1.jpg','./abhi1.jpg')











// const Jimp = require('jimp');

// async function compareImages() {
//   const image1 = await Jimp.read('./abhi2.jpg');
//   const image2 = await Jimp.read('./abhi1.jpg');

//   const distance = Jimp.distance(image1, image2);
//   const threshold = (1 - distance) * 100;

//   console.log('Distance:', distance);
//   console.log('Similarity Threshold:', threshold);
// }

// compareImages();

// async function compareImages() {

//     const ImageDataURI = require('image-data-uri');
//     const {imageHash} = require('image-hash');

//     const img1 = await ImageDataURI.encodeFromFile('./abhi1.jpg');
//     const img2 = await ImageDataURI.encodeFromFile('./abhi2.jpg');

//     const hash1 = await imageHash.hash(Buffer.from(img1.split(',')[1], 'base64'));
//     const hash2 = await imageHash.hash(Buffer.from(img2.split(',')[1], 'base64'));

//     const threshold = 5;
//     const distance = imageHash.distance(hash1, hash2, threshold);

//     console.log('Distance:', distance);
//     console.log('Accuracy:', (1 - distance) * 100);
// }
// compareImages();





// const phash = require('phash-image');
// const fs = require('fs');

// async function compareImages() {
//   const image1 = fs.readFileSync('./abhi1.jpg');
//   const image2 = fs.readFileSync('./abhi2.jpg');

//   const hash1 = await phash(image1);
//   const hash2 = await phash(image2);

//   const distance = phash.getHammingDistance(hash1, hash2);

//   console.log('Distance:', distance);
//   console.log('Accuracy:', (1 - distance / 64) * 100 + '%');
// }

// compareImages();


// const looksSame = require('looks-same');
// const fs = require('fs');

// const img1 = fs.readFileSync('./abhi1.jpg');
// const img2 = fs.readFileSync('./abhi2.jpg');

// looksSame(img1, img2, function(error, {equal}) {
//   if (error) {
//     console.log('Error:', error);
//   } else {
//     const similarity = equal ? 1 : looksSame.createDiff({reference: img1, current: img2, diffPath: './diff.png'}).diff
//     const accuracy = similarity * 100;
//     console.log('Accuracy:', accuracy);
//   }
// });


// const fs = require('fs');
// const diff = require('image-diff');

// const img1 = fs.readFileSync('./abhi1.jpg');
// const img2 = fs.readFileSync('./abhi2.jpg');

// diff.getFullResult({
//     actualImage: img1,
//     expectedImage: img2,
//     shadow: true,
//     highlightColor: '#ff00ff'
// }, function(err, result) {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log('The images are ' + result.percentageDiff * 100 + '% similar.');
//     }
// });


// const pixelmatch = require('pixelmatch');
// const { PNG } = require('pngjs');
// const fs = require('fs');

// const img1 = PNG.sync.read(fs.readFileSync('./abhi1.jpg'));
// const img2 = PNG.sync.read(fs.readFileSync('./abhi2.jpg'));

// const { width, height } = img1;
// const diff = new PNG({ width, height });

// const threshold = 0.1; // 10% threshold

// const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold });

// const accuracy = ((img1.width * img1.height) - numDiffPixels) / (img1.width * img1.height) * 100;

// console.log('Accuracy:', accuracy.toFixed(2) + '%');

// const pixelmatch = require('pixelmatch');
// const { JPEG } = require('jpeg-js');
// const fs = require('fs');

// // const img1 = JPEG.decode(fs.readFileSync('./abhi1.jpg'));
// const img1Data = fs.readFileSync('./abhi1.jpg');
// const img1 = JPEG.decode(img1Data);
// const img2 = JPEG.decode(fs.readFileSync('./abhi2.jpg'));

// const { width, height } = img1;
// const diff = new Uint8ClampedArray(width * height * 4);

// const threshold = 0.1; // 10% threshold

// const numDiffPixels = pixelmatch(img1.data, img2.data, diff, width, height, { threshold });

// const accuracy = ((img1.width * img1.height) - numDiffPixels) / (img1.width * img1.height) * 100;

// console.log('Accuracy:', accuracy.toFixed(2) + '%');



// const cv = require('opencv');

// function compareImages(img1, img2) {
//   // Load images
//   const img1Mat = cv.imread(img1);
//   const img2Mat = cv.imread(img2);

//   // Convert images to grayscale
//   const grayImg1Mat = img1Mat.cvtColor(cv.COLOR_BGR2GRAY);
//   const grayImg2Mat = img2Mat.cvtColor(cv.COLOR_BGR2GRAY);

//   // Compute the Structural Similarity Index (SSIM) between the two images
//   const ssim = grayImg1Mat.ssim(grayImg2Mat);

//   // Print the SSIM score
//   console.log(`SSIM score: ${ssim}`);
// }

// // Example usage
// compareImages('./abhi1.jpg', './abhi2.jpg');

// const cv = require('opencv');

// function compareImages(base64str1, base64str2) {
//   // Decode base64 strings into Buffers
//   const buffer1 = Buffer.from(base64str1, 'base64');
//   const buffer2 = Buffer.from(base64str2, 'base64');

//   // Decode Buffers into cv.Mat objects
//   const mat1 = cv.imdecode(buffer1);
//   const mat2 = cv.imdecode(buffer2);

//   // Convert images to grayscale
//   const grayMat1 = new cv.Mat();
//   const grayMat2 = new cv.Mat();
//   cv.cvtColor(mat1, grayMat1, cv.COLOR_RGBA2GRAY);
//   cv.cvtColor(mat2, grayMat2, cv.COLOR_RGBA2GRAY);

//   // Compute the Structural Similarity Index (SSIM) between the two images
//   const ssim = cv.compareHist(grayMat1, grayMat2, cv.HISTCMP_CORREL);

//   // Free memory
//   mat1.delete();
//   mat2.delete();
//   grayMat1.delete();
//   grayMat2.delete();

//   return ssim;
// }

// // Example usage
// const base64str1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAEklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==';
// const base64str2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAEklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==';
// const similarity = compareImages(base64str1, base64str2);
// console.log(similarity);