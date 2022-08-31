
import Freight from './Freight';

const FreightsList = (props) => {
  return (
    <ul>
      {props.freights.map(freight => (
        <Freight
          key={freight.id}
          type={freight.type}
          status={freight.status}
        />
      ))}
    </ul>
  );
};

export default FreightsList;
