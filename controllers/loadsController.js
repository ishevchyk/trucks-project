// noinspection ExceptionCaughtLocallyJS

const {Load} = require("../models/Load");
const {Truck} = require("../models/Truck");

const getLoads = async (req, res) => {
  const user = req.user;
  let loads;
  if(user.role === 'DRIVER'){
    loads = await Load.find({assigned_to: user._id})
  } else {
    loads = await Load.find({created_by: user._id})
  }

  res.status(200).send({loads: loads})
}

const addLoad = async (req, res) => {
  const load = await new Load(
    {
      ...req.body,
      created_by: req.user._id
    }
  )
  await load.save()

  res.status(200).send({
    "message": "Load created successfully"
  })

}

const getActiveLoad = async (req, res) => {
  try {
    const userId = req.user._id;
    const load = await Load.findOne({assigned_to: userId, status: 'ASSIGNED'});

    if (!load) throw new Error('No active load found.')

    res.status(200).send({load})
  } catch (err) {
    res.status(404).send({"message": err.message})
  }
}


const changeLoadState = async (req, res) => {
  try {
    const states = Load.schema.path('state').enumValues
    const driverId = req.user._id
    console.log(driverId)

    const load = Load.find({assigned_to: driverId})
    if (!load) throw new Error('There is no load assigned to you')

    switch (load.state) {
      case states[0]:
        load.state = states[1];
        break;
      case states[1]:
        load.state = states[2];
        break;
      case states[2]:
        load.state = states[3];
        load.status = 'SHIPPED'
        break;
    }

    await load.save();
    res.status(200).send({
      "message": `Load state changed to ${load.state}`
    })

  } catch (err){
      res.status(404).send({ "message": err.message })
  }

}

const getLoadById = async (req, res) => {
  try {
    const userId = req.user._id;
    const load = await Load.findById(req.params.id);

    if(!load) throw new Error('No loads by provided ID');
    if(load.created_by.toString() !== userId ) throw new Error('You cannot get load related to another user');

    res.send( { load } )
  } catch (err) {
    res.status(404).send({ "message": err.message })
  }
}

const updateLoadById = async (req, res) => {
  try {
    const userId = req.user._id;
    const load = await Load.findById(req.params.id);

    if(!load) throw new Error('No loads by provided ID');
    if(load.created_by.toString() !== userId ) throw new Error('You cannot change other Users load');

    const dataToUpdate = await req.body;

    await Load.updateOne({_id: req.params.id}, {
      $set: dataToUpdate
    }, {new: true})

    res.send({"message": "Load details changed successfully"})
  } catch (err) {
    res.status(404).send({ "message": err.message })
  }
}

const deleteLoadById = async (req, res) => {
  try {
    const userId = req.user._id;
    const load = await Load.findById(req.params.id);

    if(!load) throw new Error('No loads by provided ID');
    if(load.created_by.toString() !== userId ) throw new Error('You cannot get load related to another User');

    await Load.deleteOne({_id: req.params.id})
    res.send( { "message": "Load deleted successfully" } )
  } catch (err) {
    res.status(404).send({ "message": err.message })
  }
}

const postLoadById = async (req, res) => {
  try {
    const load = await Load.findById(req.params.id);

    if(!load) throw new Error('No load found')

    if (load) {
      load.status = 'POSTED';
      const {dimensions, payload} = load;
      const matched = await Truck.findOne()
        .where('status').equals('IS')
        .where('payload').gt(payload)
        .where('dimensions.height').gt(dimensions.height)
        .where('dimensions.width').gt(dimensions.width)
        .where('dimensions.length').gt(dimensions.length)

      if (matched) {
        matched.status = 'OL'

        load.set({
          status: 'ASSIGNED',
          assigned_to: matched.created_by,
          state: 'En route to Pick Up',
          truck: matched._id,
          logs: [
            ...load.logs,
            {
              message: `Load assigned to driver with id ${matched.created_by}`,
            },
          ]
        })
        await matched.save();
        await load.save();

        res.status(200).send({
          "message": "Load posted successfully",
          "driver_found": true
        })

      } else {
        load.logs = [...load.logs, {message: `Couldn't not find driver`}];
        await load.save();
        throw new Error('No drivers available for your load. PLease try again later')
      }
      }

  } catch (err){
    res.status(404).send({ "message": err.message })
  }


}

const getLoadShippingInfo = async (req, res) => {
  try {
    const load = await Load.findById(req.params.id);
    if(!load) throw new Error('No load found');

    const truck = await Truck.find({assigned_to: load.assigned_to})

    res.status(200).send({
      load,
      truck
    })

  } catch (err){
    res.status(404).send({ "message": err.message })
  }
}


module.exports = {
  getLoads,
  addLoad,
  getActiveLoad,
  changeLoadState,
  getLoadById,
  updateLoadById,
  deleteLoadById,
  postLoadById,
  getLoadShippingInfo
}
