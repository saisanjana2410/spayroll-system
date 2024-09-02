// //face rec - working
// const faceapi = require('face-api.js')
// const canvas = require('canvas')
// const fs = require('fs')
// const fetch = require('node-fetch')
// const { Canvas, Image, ImageData } = canvas
// faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

// const MODEL_URL = './face-api/models'

// async function loadModels() {
//   await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL)
//   await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL)
//   await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL)
//   console.log('Models loaded')
// }

// const faceDetectionOptions = new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 })

// async function compareImage(imageUrl1, imageUrl2) {
//     console.log('Started comparing two images')
//     const image1 = await loadImage(imageUrl1)
//     const image2 = await loadImage(imageUrl2)
  
//     const detection1 = await faceapi.detectSingleFace(image1).withFaceLandmarks().withFaceDescriptor()
//     const detection2 = await faceapi.detectSingleFace(image2).withFaceLandmarks().withFaceDescriptor()
  
//     if (!detection1) {
//       console.log('No face detected in image1')
//       return false
//     }
//     if (!detection2) {
//       console.log('No face detected in image2')
//       return false
//     }
  
//     const distance = faceapi.euclideanDistance(detection1.descriptor, detection2.descriptor)
//     const similarity = 100 - (distance * 100)
//     console.log(`Similarity Percentage: ${similarity.toFixed(2)}%`)
//     return true
//   }
  

// async function loadImage(imageUrl) {
//   const img = await canvas.loadImage(imageUrl)
//   const imgCanvas = canvas.createCanvas(img.width, img.height)
//   const ctx = imgCanvas.getContext('2d')
//   ctx.drawImage(img, 0, 0, img.width, img.height)
//   return imgCanvas
// }

// loadModels().then(() => {
//   const imageUrl1 = './ab1.jpg'
//   const imageUrl2 = './ab2.jpg'
//   compareImage(imageUrl1, imageUrl2)
//     .then(result => console.log(result))
//     .catch(error => console.error(`Error comparing images: ${error}`))
// }).catch(error => console.error(`Error loading models: ${error}`))



// faster - code
const faceapi = require('face-api.js')
const canvas = require('canvas')
const fs = require('fs')
const fetch = require('node-fetch')
const { Canvas, Image, ImageData } = canvas
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

// Load the Tiny Face Detector model instead of the SSD Mobilenet model
const MODEL_URL = './face-api/models'
const detectionOptions = new faceapi.TinyFaceDetectorOptions({ inputSize: 256 })

async function loadModels() {
  await faceapi.nets.tinyFaceDetector.loadFromDisk(MODEL_URL)
  await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL)
  await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL)
  console.log('Models loaded')
}

async function compareImage(imageUrl1, imageUrl2) {
  console.log('Started comparing two images')
  const image1 = await loadImage(imageUrl1)
  const image2 = await loadImage(imageUrl2)

  // Use the Tiny Face Detector model and smaller input size for face detection
  const detection1 = await faceapi.detectSingleFace(image1, detectionOptions).withFaceLandmarks().withFaceDescriptor()
  const detection2 = await faceapi.detectSingleFace(image2, detectionOptions).withFaceLandmarks().withFaceDescriptor()

  if (!detection1) {
    console.log('No face detected in image1')
    return false
  }
  if (!detection2) {
    console.log('No face detected in image2')
    return false
  }

  const distance = faceapi.euclideanDistance(detection1.descriptor, detection2.descriptor)
  const similarity = 100 - (distance * 100)
  console.log(`Similarity Percentage: ${similarity.toFixed(2)}%`)
  return true
}

async function loadImage(imageUrl) {
  const img = await canvas.loadImage(imageUrl)
  const imgCanvas = canvas.createCanvas(img.width, img.height)
  const ctx = imgCanvas.getContext('2d')
  ctx.drawImage(img, 0, 0, img.width, img.height)
  return imgCanvas
}

loadModels().then(() => {
  const imageUrl1 = './ab1.jpg'
  const imageUrl2 = './kohli.jpg'
  compareImage(imageUrl1, imageUrl2)
    .then(result => console.log(result))
    .catch(error => console.error(`Error comparing images: ${error}`))
}).catch(error => console.error(`Error loading models: ${error}`))
