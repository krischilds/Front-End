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
            <div className="title"><Link to="/">Fruit Store</Link></div>
            <li>
              <Link to="/viewFruitPrices">View Fruit Report</Link>
            </li>
            <li>
              <Link to="/addFruitSales">Add Fruit Sales</Link>
            </li>
          </ul>

          <Switch>
            <Route exact path="/" component={FruitContainer} />
            <Route path="/viewFruitPrices" component={FruitContainer} />
            <Route path="/addFruitSales" component={FruitSalesForm} />
            <Route path="" component={FruitContainer} />
          </Switch>
        </div>
      </Router>
    </>
  );
}
