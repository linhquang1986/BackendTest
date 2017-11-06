
var Img = require('../models').trafficDb.img;
var ObjectId = require('mongoose').Types.ObjectId;
var Vision = require('../middleware').vision;

exports.upload_img = (req, res) => {
  let fileName = req.file.originalname;
  let imgUri = './public/images/' + fileName;
  let img = new Img({
    name: fileName,
    url: imgUri
  });
  let vision = new Vision(imgUri);
  vision.labelDetection().then(rs => {
    res.json(rs)
  })
  // img.save((err) => {
  //   if (err) res.status(400).send(err)
  //   res.status(200).json({ message: 'Upload successfuly' })
  // })
}