import { useState, useEffect, useRef } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import ComposeSaladWrapper from './ComposeSaladWrapper';
import ViewOrder from './ViewOrder';
import { NavLink, Link, Route, Routes } from 'react-router-dom'
//import inventory from './inventory.ES6';
import ViewIngridient from './ViewIngredient';
import Salad from './lab1.ES6.js';

function App() {
  const [shoppingCart, setShoppingCart] = useState([]);

  useEffect(() => {
    if (shoppingCart.length > 0) 
      localStorage.setItem("orders", JSON.stringify(shoppingCart));
  }, [shoppingCart])

  const addSalad = (salad) => {
    setShoppingCart([
      ...shoppingCart,
      salad
    ]);
  }

  const [inventory, setInventory] = useState({});
  useEffect(() => {
    fetchIngredientList("foundations");
    fetchIngredientList("proteins");
    fetchIngredientList("extras");
    fetchIngredientList("dressings");

    setShoppingCart(Salad.parseSalads(localStorage.getItem("orders")));
  }, []);



  const fetchIngredient = async (type, ingredient) => {
    return fetch("http://localhost:8080/" + type + "/" + ingredient)
      .then(response => {
        if(!response.ok) {
          throw new Error('${url} returned status ${response.status}');
        }
        return response.json();
      })
      .then(data => {
        return {[ingredient]: data}
      })
      .catch(error => {
        console.log("Error getting " + ingredient + ": ", error)
      })
  }

  const fetchIngredientList = (type) => {
    return fetch("http://localhost:8080/" + type)
      .then(response => {
        console.log(response);
        if(!response.ok) {
          throw new Error('${url} returned status ${response.status}');
        }
        return response.json();
      })
      .then(results => {
        return Promise.all(
          results.map(ingredient => fetchIngredient(type, ingredient))
        )
        .then(result => {
          result = result.reduce((acc, ing) => {return {...acc, ...ing}})
          setInventory(prev => 
            ({
              ...prev, 
              ...result
            })
          )        
          });
      })
      .catch((error) => {
        console.error("Error getting ingredientlist: ", error);
      });
  }

  


  const Header = () => { 
    return (
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Min egen salladsbar</span>
      </header>
    )
}

  const Navbar = () => { 
    return (
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink className="nav-link" to="/compose-salad">
             Komponera en sallad
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/view-order">
            Din order
          </NavLink>
        </li>
        {/* more links */}
    </ul>
    );
  }

  const PageContent = () => { 
    return (
      <Routes>
        <Route path="/" element={
          <h2>Välkommen till min salladsbar</h2>
        } />
        <Route path="/view-order" element={
          <ViewOrder shoppingCart={shoppingCart} />
        }/>
        <Route path="/compose-salad" element={
          <ComposeSaladWrapper inventory={inventory} addSalad={addSalad} />
        } />
        <Route path="/view-ingredient/:name" element={
          <ViewIngridient inventory={inventory} />
        } />
        <Route path="*" element = {
          <h2>Page not found!</h2>
        } />
      </Routes>
    );
  }

  const Footer = () => { return (
      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webprogrammering
      </footer>
  );}

  return (
    <div className="container py-4">
      <Header />
      <Navbar />
      <PageContent />
      <Footer />
    </div>
  );
}

export default App;

/*
Reflection 1: Nope, only syntax difference

Reflection 2: It wont update

Reflection 3: Add it as a state? Or use a cache hook.
*/