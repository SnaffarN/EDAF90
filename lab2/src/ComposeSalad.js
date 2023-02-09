import { useState } from 'react';
import SelectSalad from './SelectSalad';
import ViewIngridient from './ViewIngredient';
import 'bootstrap/dist/css/bootstrap.css';
import Salad from './lab1.ES6.js';
import {Link} from "react-router-dom";


function ComposeSalad(props) {
  let foundations = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  let proteins = Object.keys(props.inventory).filter(name => props.inventory[name].protein);
  let extras = Object.keys(props.inventory).filter(name => props.inventory[name].extra);
  let dressings = Object.keys(props.inventory).filter(name => props.inventory[name].dressing);

  const [foundation, setFoundation] = useState('');
  const [protein, setProtein] = useState('');
  const [dressing, setDressing] = useState('');
  const [extra, setExtra] = useState({});

  const handleCheckboxChange = (e) => {
    setExtra(prev => ({
      ...prev,
      [e.target.name]: e.target.checked
    }))
  }

  const handleSubmit = (e) => {
    if(e.target.checkValidity()){
      let salad = new Salad();
      salad.add(foundation, props.inventory[foundation]);
      salad.add(protein, props.inventory[protein]);
      salad.add(dressing, props.inventory[dressing]);
      extras.filter(e => extra[e]).forEach(extra => salad.add(extra, props.inventory[extra]));
      props.addSalad(salad);
      
      setFoundation('');
      setProtein('');
      setDressing('');
      setExtra({});
      
      props.navigate("/view-order");
    }
    
    e.target.classList.add("was-validated");
    e.preventDefault();
  }

  return (
    <div className="container col-12">
      <div className="column h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>
        <form onSubmit={handleSubmit} noValidate>
          <SelectSalad
            label="Välj bas: "
            value={foundation}
            options={foundations}
            onChange={e => setFoundation(e.target.value)} />
          <SelectSalad
            label="Välj protein: "
            value={protein}
            options={proteins}
            onChange={e => setProtein(e.target.value)} />
          <div className="form-group" style={{ marginBottom: 10 }}>
            <label>
              Välj tillbehör
              <div className="row">
                {extras.map((name, index) =>
                  <div className="form-check col-4" key={index}>
                    <input
                      className="form-check-input"
                      style={{ marginRight: 5 }}
                      type="checkbox"
                      name={name}
                      checked={extra[name] || false}
                      onChange={handleCheckboxChange} />
                    <label className="form-check-label">
                      <Link to={"/view-ingredient/" + name}>
                        {name}
                      </Link>
                    </label>
                  </div>
                )}
              </div>
            </label>
          </div>
          <SelectSalad
            label="Välj dressing: "
            value={dressing}
            options={dressings}
            onChange={e => setDressing(e.target.value)} />
          <input type="submit" value="Beställ" />
        </form>
      </div>
    </div>
  );
}
export default ComposeSalad;