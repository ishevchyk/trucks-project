import Card from "../UI/Card";
import classes from "./TruckItem.module.css";

const LoadItem = (props) => {
  return (
    <Card className={classes.trucks}>
      <div>
        img
      </div>
      <div>
        <h2>{props.type}</h2>
        <h3>{props.status}</h3>
        <h3>{props.dimensions.width}</h3>
      </div>
      <div>
        <button>Assign</button>
        <button>Delete</button>
      </div>

    </Card>
  );
};

export default LoadItem;
