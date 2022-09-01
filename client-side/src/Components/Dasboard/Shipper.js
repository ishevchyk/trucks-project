import {Fragment, useCallback, useEffect, useState} from "react";
import {getLoads} from "../../api/loadsApi";
import LoadItem from "./LoadItem";

const Shipper = () => {
  const [loads, setLoads] = useState([])
  const fetchItems = useCallback(async () => {
    try {
      const res = await getLoads();
      if(!res.data.loads) return; //throq err
      const items = [];
      const loads = res.data.loads;
      for(const key in loads) {
        items.push({
          id: loads[key]._id,
          name: loads[key].name,
          pickup_address: loads[key].pickup_address,
          status: loads[key].status,
          delivery_address: loads[key].delivery_address,
          state: loads[key].state,
          date: loads[key].createdAt,
          payload: loads[key].payload,
          dimensions: {
            ...loads[key].dimensions
          }
        })
      }
      setLoads(items)
      console.log(loads)

    } catch (error) {
      console.log(error)
    }
  }, [])
  useEffect(() => {
    fetchItems()
  },[fetchItems])

  return (
    <Fragment>
      {loads.map(load => (
        <LoadItem
          key={load.id}
          name={load.name}
          pickup_address={load.pickup_address}
          status={load.status}
          delivery_address={load.delivery_address}
          state={load.state}
          date={load.createdAt}
          payload={load.payload}
          dimensions={load.dimensions}
        />))}
    </Fragment>

  )




}
export default Shipper
