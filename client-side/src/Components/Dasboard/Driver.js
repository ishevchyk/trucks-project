import {Fragment, useCallback, useEffect, useState} from "react";
import {getTrucks} from "../../api/trucksApi";
import TruckItem from "./TruckItem";

const Driver = () => {
  const [trucks, setTrucks] = useState([])
  const fetchItems = useCallback(async () => {
    try {
      const res = await getTrucks();
      if(!res.data.trucks) return; //throw err
      const items = [];
      const trucks = res.data.trucks;
      for(const key in trucks) {
        items.push({
          id: trucks[key]._id,
          type: trucks[key].type,
          status: trucks[key].status,
          date: trucks[key].createdAt,
          payload: trucks[key].payload,
          dimensions: trucks[key].dimensions
        })
      }
      setTrucks(items)
      console.log(trucks)
      console.log(trucks.dimensions)

    } catch (error) {
      console.log(error)
    }
  }, [])
  useEffect(() => {
    fetchItems()
  },[fetchItems])


  return (
    <Fragment>
      {trucks.map(truck => (
        <TruckItem
          key={truck.id}
          type={truck.type}
          status={truck.status}
          date={truck.createdAt}
          payload={truck.payload}
          dimensions={truck.dimensions}
        />))}
    </Fragment>

  )


}
export default Driver
