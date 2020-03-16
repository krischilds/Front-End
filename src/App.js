import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FruitContainer from "./Components/FruitReport";
import FruitSalesForm from "./Components/FruitReport/FruitSalesForm";
import './fruit-app.css';

export default function App() {
  return (
    <>
      <Router>
        <div>
          <ul className="navbar">
            <li className="title">
              <Link to={{ pathname: '/' }}>Fruit Store</Link>
            </li>
            <li>
              <Link to={{ pathname: '/viewFruitSales' }}>View Fruit Report</Link>
            </li>
            <li>
              <Link to={{ pathname: '/addFruitSales' }}>Add Fruit Sales</Link>
            </li>
          </ul>

          <Switch>
            <Route exact={true} path="/" component={FruitContainer} />
            <Route path="/viewFruitSales" component={FruitContainer} />
            <Route path="/addFruitSales" component={FruitSalesForm} />
          </Switch>
        </div>
      </Router>
    </>
  );
}
