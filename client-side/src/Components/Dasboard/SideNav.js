// import {useContext} from "react";
// import AuthContext from "../../store/auth-context";
import {useSelector} from "react-redux";

const SideNav = () => {
  const user = useSelector(state => state.auth.user)
  console.log('user in side ', user)
  return (
    <div>
      <button>{user.role === 'DRIVER' ? 'My trucks' : 'My loads'}</button>
       <button>{user.role === 'DRIVER' ? 'Completed Freights' : 'Completed Loads'}</button>
    </div>
    )
}
export default SideNav
