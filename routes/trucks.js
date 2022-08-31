const express = require('express');
const router = express.Router();

const {
  getTrucks, addTruck, getTruckById,
  updateTruckById, deleteTruckById,
  assignTruckById} = require("../controllers/trucksController");

const authMiddleware = require('../middleware/authMiddleware');
const driverMiddleware = require('../middleware/driverMiddleware');


router.get('/', authMiddleware, driverMiddleware, getTrucks);
router.post('/', authMiddleware, driverMiddleware, addTruck);
router.get('/:id', authMiddleware, driverMiddleware, getTruckById);
router.put('/:id', authMiddleware, driverMiddleware, updateTruckById);
router.delete('/:id', authMiddleware, driverMiddleware, deleteTruckById);
router.post('/:id/assign', authMiddleware, driverMiddleware, assignTruckById);

module.exports = router;
