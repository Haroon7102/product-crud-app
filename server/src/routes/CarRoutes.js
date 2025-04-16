const express = require('express');
const router = express.Router();
const carsController = require('../controllers/CarController');
const upload = require('../middleware/upload')
// Create a car (with image upload)
router.post('/', upload.single('image'), carsController.createCar);

// Get all cars
router.get('/', carsController.getAllCars);

// Get single car by ID
router.get('/:id', carsController.getCarById);

// Update car
router.put('/:id', upload.single('image'), carsController.updateCar);

// Delete car
router.delete('/:id', carsController.deleteCar);

module.exports = router;
