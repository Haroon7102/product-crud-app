const Cars = require('../models/Cars');

// CREATE a car
exports.createCar = async (req, res) => {
    console.log(req.body); // Log the body (name, price)
    console.log(req.file); // Log the file (image)
    try {
        const { name, price } = req.body;
        const image = req.file ? req.file.path : null;

        const newCar = new Cars({ name, price, image });
        await newCar.save();

        res.status(201).json(newCar);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create car' });
    }
};

// GET all cars
exports.getAllCars = async (req, res) => {
    try {
        const cars = await Cars.find();
        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cars' });
    }
};

// GET a car by ID
exports.getCarById = async (req, res) => {
    try {
        const car = await Cars.findById(req.params.id);
        if (!car) return res.status(404).json({ error: 'Car not found' });

        res.json(car);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch car' });
    }
};

// UPDATE a car
exports.updateCar = async (req, res) => {
    try {
        const { name, price } = req.body;
        const image = req.file ? req.file.path : null;

        const updateData = { name, price };
        if (image) updateData.image = image;

        const updatedCar = await Cars.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedCar) return res.status(404).json({ error: 'Car not found' });

        res.json(updatedCar);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update car' });
    }
};

// DELETE a car
exports.deleteCar = async (req, res) => {
    try {
        const deletedCar = await Cars.findByIdAndDelete(req.params.id);
        if (!deletedCar) return res.status(404).json({ error: 'Car not found' });

        res.json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete car' });
    }
};
