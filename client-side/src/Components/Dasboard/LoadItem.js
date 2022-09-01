import Card from "../UI/Card";
import classes from "./LoadItem.module.css";

const LoadItem = (props) => {
  return (
    <Card className={classes.loads}>
      <div>
        img
      </div>
      <div>
        <h2>{props.name}</h2>
        <h3>{props.status}</h3>
        <h3>{props.state}</h3>
      </div>
      <div>
        <button>Post</button>
        <button>Delete</button>
        <button>Update</button>
      </div>

    </Card>
  );
};

export default LoadItem;
