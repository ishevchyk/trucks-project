const express = require('express');
const {getLoads, addLoad, getActiveLoad, changeLoadState, getLoadShippingInfo, postLoadById, deleteLoadById,
  updateLoadById, getLoadById
} = require("../controllers/loadsController");
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const shipperMiddleware = require('../middleware/shipperMiddleware')
const driverMiddleware = require('../middleware/driverMiddleware')


//available for both
router.get('/', authMiddleware, getLoads);
//available for shipper
router.post('/', authMiddleware, shipperMiddleware, addLoad);
//available for driver
router.get('/active', authMiddleware, driverMiddleware, getActiveLoad);
router.patch('/active/state', authMiddleware, driverMiddleware, changeLoadState);

//available for both
router.get('/:id', authMiddleware, getLoadById);

//available for shipper
router.put('/:id', authMiddleware, shipperMiddleware, updateLoadById);
router.delete('/:id', authMiddleware, shipperMiddleware, deleteLoadById);

//available for driver
router.post('/:id/post', authMiddleware, shipperMiddleware, postLoadById);
router.get('/:id/shipping_info', authMiddleware, shipperMiddleware, getLoadShippingInfo);


module.exports = router;
