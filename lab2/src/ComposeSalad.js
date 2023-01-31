import { useState } from 'react';
import SelectSalad from './SelectSalad';
import 'bootstrap/dist/css/bootstrap.css';
import Salad from './lab1.ES6.js';


function ComposeSalad(props) {
  let foundations = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  let proteins =  Object.keys(props.inventory).filter(name => props.inventory[name].protein);
  let extras = Object.keys(props.inventory).filter(name => props.inventory[name].extra);
  let dressings = Object.keys(props.inventory).filter(name => props.inventory[name].dressing);
  let salad = new Salad()
  
  const [foundation, setFoundation] = useState('Pasta'); 
  const [protein, setProtein] = useState('Kycklingfilé');
  const [dressing, setDressing] = useState('Ceasardressing');
  const [extra, setExtra] = useState({Bacon: true, Fetaost: true});

  const handleCheckboxChange = (e) => {
    setExtra({
        ...extra,
        [e.target.name]: e.target.checked
      })
  }

  const handleSubmit = (e) => {
    salad.add(foundation, props.inventory[foundation])
    salad.add(protein, props.inventory[protein])
    salad.add(dressing, props.inventory[dressing])
    extras.filter(e => extra[e]).forEach(extra => salad.add(extra, props.inventory[extra]))
    props.addSalad(salad)
    e.preventDefault()

    setFoundation('');
    setProtein('');
    setDressing('');
    setExtra({});
  }

  return (
    <div className="container col-12">
      <div className="column h-200 p-5 bg-light border rounded-3">
      <h2>Välj innehållet i din sallad</h2>
        <form onSubmit={handleSubmit}>
          <SelectSalad 
            label="Välj bas: " 
            value={foundation} 
            options={foundations} 
            onChange={e => setFoundation(e.target.value)}/>
          <SelectSalad 
            label="Välj protein: " 
            value={protein} 
            options={proteins} 
            onChange={e => setProtein(e.target.value)}/>
          <label>
            Välj tillbehör
            {extras.map((name, index) => 
              <div key={index}>
                <input 
                  type="checkbox"
                  name={name}
                  checked={extra[name] || false}
                  onChange={handleCheckboxChange}/>
                <span>{name}</span>
              </div> 
            )}
          </label>
          <SelectSalad 
            label="Välj dressing: " 
            value={dressing} 
            options={dressings} 
            onChange={e => setDressing(e.target.value)}/>
          <input type="submit" value="Beställ" />
        </form>
      </div>
    </div>
  );
}
export default ComposeSalad;