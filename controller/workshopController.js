const Workshop = require('../model/workshop');
const path = require('path');
const fs = require('fs');

const createWorkshop = async (req, res) => {
  try {
    const { title, description, duration, price, capacity, difficulty, materials, contact, schedule } = req.body;
    
    let imagePath = '';
    if (req.file) {
      imagePath = req.file.filename;
    }

    const newWorkshop = new Workshop({
      title,
      description,
      duration,
      price,
      capacity,
      difficulty,
      materials,
      image: imagePath,
      contact: JSON.parse(contact),
      schedule: JSON.parse(schedule)
    });

    await newWorkshop.save();
    res.status(201).json(newWorkshop);
  } catch (error) {
    console.error('Error creating workshop:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getWorkshops = async (req, res) => {
  try {
    const workshops = await Workshop.find().sort({ createdAt: -1 });
    res.status(200).json(workshops);
  } catch (error) {
    console.error('Error fetching workshops:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateWorkshop = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, duration, price, capacity, difficulty, materials, contact, schedule } = req.body;
    
    let updateData = {
      title,
      description,
      duration,
      price,
      capacity,
      difficulty,
      materials,
      contact: JSON.parse(contact),
      schedule: JSON.parse(schedule)
    };

    if (req.file) {
      updateData.image = req.file.filename;
      // Delete old image if exists
      const oldWorkshop = await Workshop.findById(id);
      if (oldWorkshop.image) {
        const oldImagePath = path.join(__dirname, '../uploads', oldWorkshop.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    const updatedWorkshop = await Workshop.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json(updatedWorkshop);
  } catch (error) {
    console.error('Error updating workshop:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteWorkshop = async (req, res) => {
  try {
    const { id } = req.params;
    const workshop = await Workshop.findByIdAndDelete(id);
    
    if (workshop.image) {
      const imagePath = path.join(__dirname, '../uploads', workshop.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    res.status(200).json({ message: 'Workshop deleted successfully' });
  } catch (error) {
    console.error('Error deleting workshop:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createWorkshop,
  getWorkshops,
  updateWorkshop,
  deleteWorkshop
};