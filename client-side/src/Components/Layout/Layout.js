import { Fragment } from 'react';
import MainHeader from "../MainHeader/MainHeader";

const Layout = (props) => {
  return (
    <Fragment>
      <MainHeader />
      <main style={{'marginTop': '12vh'}}>{props.children}</main>
    </Fragment>
  );
};

export default Layout
