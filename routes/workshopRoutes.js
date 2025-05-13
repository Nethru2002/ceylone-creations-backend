const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { 
  createWorkshop, 
  getWorkshops, 
  updateWorkshop, 
  deleteWorkshop 
} = require('../controller/workshopController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/', upload.single('image'), createWorkshop);
router.get('/', getWorkshops);
router.put('/:id', upload.single('image'), updateWorkshop);
router.delete('/:id', deleteWorkshop);

module.exports = router;