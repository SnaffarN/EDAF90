import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import inventory from './inventory.ES6';
import ComposeSalad from './ComposeSalad';
import ViewOrder from './ViewOrder';

function App()
{
  const [shoppingCart, setShoppingCart] = useState([]);

  const addSalad = (salad) => {
    setShoppingCart([
      ...shoppingCart,
      salad
    ])
  }

  return (
    <div className="container py-4">
    <header className="pb-3 mb-4 border-bottom">
      <span className="fs-4">Min egen salladsbar</span>
    </header>
    <ViewOrder shoppingCart={shoppingCart}/>
    <ComposeSalad inventory={inventory} addSalad={addSalad}/>
    <footer className="pt-3 mt-4 text-muted border-top">
      EDAF90 - webprogrammering
    </footer>
  </div>
  );
  }

export default App;

/*
Reflection 1: Nope, only syntax difference

Reflection 2: It wont update

Reflection 3: Add it as a state? Or use a cache hook.
*/