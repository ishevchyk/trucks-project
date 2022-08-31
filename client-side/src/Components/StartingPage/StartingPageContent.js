import classes from './StartingPageContent.module.css';
import Card from "../UI/Card";
// import AuthContext from "../../store/auth-context";
import {Link} from "react-router-dom";
// import {useContext} from "react";
import {useSelector} from "react-redux";

const StartingPageContent = () => {
  // const authCtx = useContext(AuthContext)
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  return (
    <Card className={classes.starting}>
      <div className={classes['starting-info']}>
        <h2>Moving what matters when it matters most</h2>
        <p>The freight industry is the lifeblood of the economy. Demand for essential goods has grown,
          directly affecting the shippers and carriers who are on the front lines of producing and delivering
          these goods. As we face the challenges of this health crisis together, Uber Freight remains committed
          to supporting our carriers and our shippers.</p>
        {!isLoggedIn && <button className={classes['signup-btn']}>
          <Link to={'/register'} style={{ textDecoration: 'none', color: '#0ee0e0'}}>
            Getting started!
          </Link>
        </button>}
        {isLoggedIn && <button className={classes['dashboard']}>
          <Link to={'/dashboard'} style={{ textDecoration: 'none', color: '#0ee0e0'}}>
            Go to your dashboard!
          </Link>
        </button>}
      </div>
      <div className={classes['starting-img']}>
        <img src="https://images.squarespace-cdn.com/content/v1/5b7e301aaa49a19f2226968f/1537760622045-JG31HZX4P9H7TZU0WWXL/BIG+TRUCK+LOGISTICS+Home+Hero+Semi+Truck+Trailer+Tampa+FL+cropped.jpg?format=2500w" alt=""/>
      </div>
    </Card>
  );
};

export default StartingPageContent;
