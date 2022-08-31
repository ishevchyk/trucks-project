
import Navigation from './Navigation';
import classes from './MainHeader.module.css';
import {Link} from "react-router-dom";

const MainHeader = () => {
  return (
    <header className={classes['main-header']}>
      <div className={classes['main-header__logo']}>
        <img src="https://img.icons8.com/ios-filled/50/ef1bd8/interstate-truck.png" alt="Freight Logo"/>
        <h1><Link to={'/'} style={{ textDecoration: 'none', color: '#0ee0e0'}}>Epam Freight</Link></h1>
      </div>
      <Navigation className={classes['main-header__nav']}/>
    </header>
  );
};

export default MainHeader;
