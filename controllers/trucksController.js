const { Truck, validateTruck } = require('../models/Truck');

const truckTypes = {
  SPRINTER: {
    dimensions: {
      length: 300,
      width: 250,
      height: 170,
    },
    payload: 1700,
  },
  'SMALL STRAIGHT': {
    dimensions: {
      length: 500,
      width: 250,
      height: 170,
    },
    payload: 2500,
  },
  'LARGE STRAIGHT': {
    dimensions: {
      length: 700,
      width: 350,
      height: 200,
    },
    payload: 4000,
  },

};

const getTrucks = async (req, res) => {
  const userId = req.user._id;
  const trucks = await Truck.find({ created_by: userId });

  res.status(200).send({ trucks });
};

const addTruck = async (req, res) => {
  try {
    const { error } = validateTruck(req.body);
    if (error) throw new Error();

    const type = req.body.type.toUpperCase();
    const truck = await new Truck({
      type,
      created_by: req.user._id,
      dimensions: truckTypes[type].dimensions,
      payload: truckTypes[type].payload,
    });
    await truck.save();

    res.status(200).send({
      message: 'Truck created successfully',
    });
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
};

const getTruckById = async (req, res) => {
  try {
    const userId = req.user._id;
    const truck = await Truck.findById(req.params.id);

    if (!truck) throw new Error('No trucks by provided ID');
    if (truck.created_by.toString() !== userId) throw new Error('You cannot get other Drivers truck');

    res.send({ truck });
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
};

const updateTruckById = async (req, res) => {
  try {
    const userId = req.user._id;
    const truck = await Truck.findById(req.params.id);

    if (!truck) throw new Error('No trucks by provided ID');
    if (truck.created_by.toString() !== userId) throw new Error('You cannot change other Drivers truck');

    await Truck.findByIdAndUpdate(req.params.id, { type: req.body.type.toUpperCase() });
    res.send({ message: 'Truck details changed successfully' });
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
};

const deleteTruckById = async (req, res) => {
  try {
    const userId = req.user._id;
    const truck = await Truck.findById(req.params.id);

    if (!truck) throw new Error('No trucks by provided ID');
    if (truck.created_by.toString() !== userId) throw new Error('You cannot get other Drivers truck');

    await Truck.deleteOne({ _id: req.params.id });
    res.send({ message: 'Removed' });
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
};

const assignTruckById = async (req, res) => {
  try {
    const { user } = req;
    const truck = await Truck.findById(req.params.id);

    if (!truck) {
      throw new Error('No trucks by provided ID');
    }
    if (truck.created_by.toString() !== user._id) throw new Error('You cannot get other Drivers truck');
    if (user.assigned_truck) throw new Error('You can assign only one truck at a time');

    await Truck.findByIdAndUpdate(req.params.id, { assigned_to: user._id });
    res.send({ message: 'Truck assigned successfully' });
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
};

module.exports = {
  getTrucks,
  addTruck,
  getTruckById,
  updateTruckById,
  deleteTruckById,
  assignTruckById,
};
