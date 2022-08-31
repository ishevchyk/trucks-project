// import {useContext, useState} from "react";
//
import {getTrucks} from "../../api/trucksApi";
// import {getLoads} from "../../api/loadsApi";
// import FreightsList from "./FreightsList";
// import authContext from "../../store/auth-context";
import {useSelector} from "react-redux";


// const MainContent = async () => {
//   // const {user} = useContext(authContext);
//   const user = useSelector(state => state.auth.user)
//   console.log('user in main ', user)
//   console.log(user.role)
  // const freights = [];

  // if (user.role === 'DRIVER') {
  //   const {data} = await getTrucks()
  //   console.log(data.trucks)
  //   for (const key in data.trucks) {
  //     freights.push({
  //       id: data.trucks[key]._id,
  //       status: data.trucks[key].status,
  //       type: data.trucks[key].type
  //     })
  //   }
  //
  //
  // } else {
  //   const {data} = await getLoads()
  //   console.log(data.loads)
  // }
  // console.log('freights', freights)

  // const trucks = res.data;

//   return (
//     <div>
//       <h2>Main content<h2/>
//     </div>
//   )
// }

const MainContent = () => {
  const user = useSelector(state => state.auth.user)
  console.log(user)
  console.log(user.role)
  let content;
  if(user.role === 'DRIVER') {
    const res = getTrucks()
    if(!res.data){
      content = 'No assigned Trucks!'
    }

    // if(data.trucks) {
    //   console.log('exist')
    // } else {
    //   console.log('not exist')
    // }
  }
  return (
    <div>
      <h2>Main content</h2>
      <p>{content}</p>
      <button>Get info</button>
    </div>
  )
}


export default MainContent
