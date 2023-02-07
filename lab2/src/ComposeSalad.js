import { useState } from 'react';
import SelectSalad from './SelectSalad';
import 'bootstrap/dist/css/bootstrap.css';
import Salad from './lab1.ES6.js';


function ComposeSalad(props) {
  let foundations = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  let proteins = Object.keys(props.inventory).filter(name => props.inventory[name].protein);
  let extras = Object.keys(props.inventory).filter(name => props.inventory[name].extra);
  let dressings = Object.keys(props.inventory).filter(name => props.inventory[name].dressing);

  const [foundation, setFoundation] = useState('Pasta');
  const [protein, setProtein] = useState('Kycklingfilé');
  const [dressing, setDressing] = useState('Ceasardressing');
  const [extra, setExtra] = useState({});

  const handleCheckboxChange = (e) => {
    setExtra(prev => ({
      ...prev,
      [e.target.name]: e.target.checked
    }))
  }

  const handleSubmit = (e) => {
    let salad = new Salad();
    salad.add(foundation, props.inventory[foundation]);
    salad.add(protein, props.inventory[protein]);
    salad.add(dressing, props.inventory[dressing]);
    extras.filter(e => extra[e]).forEach(extra => salad.add(extra, props.inventory[extra]));
    props.addSalad(salad);
    e.preventDefault();

    setFoundation('');
    setProtein('');
    setDressing('');
    setExtra({});
  }

  return (
    <form onSubmit={handleSubmit}>
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
      <div class="form-group" style={{ marginBottom: 10 }}>
        <label>
          Välj tillbehör
          <div className="row">
            {extras.map((name, index) =>
              <div class="form-check" className="col-4" key={index}>
                <input
                  class="form-check-input"
                  style={{ marginRight: 5 }}
                  type="checkbox"
                  name={name}
                  checked={extra[name] || false}
                  onChange={handleCheckboxChange} />
                <label class="form-check-label">
                  {name}
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
  );
}
export default ComposeSalad;