'use strict';

/**
 * Reflection question 1
 * If the object doesn't have that property it will simply return false when trying to read it.
*/

const { v4: uuidv4 } = require('uuid');
const imported = require("./inventory.js");

console.log('inventory: ' + imported.inventory['Sallad']);

console.log('Object.keys():')
let names = Object.keys(imported.inventory);
names
  .sort((a, b) => a.localeCompare(b, "sv", { sensitivity: 'case' }))
  .forEach(name => console.log(name));

console.log('\n\nfor ... in:')
for (const name in imported.inventory) {
  console.log(name);
}
/**
 * Reflection question 2
 * 
 * Sort is not printed because it is in the objects property chain and 
 * not an enumerable property of that object.
 * 
 * For in loops over keys and forEach over values
 */

console.log('\n--- Assignment 1 ---------------------------------------')

function makeOptions(inv, prop) {
  let names = Object.keys(inv)
  let result = names
    .filter(n => inv[n][prop] == true)
    .map(n => "<option value=\"" + n + "\"> " + n + ", " + inv[n].price + " kr</option>\n")
    .reduce((res, val) => res.concat(val))
  return result;
}

console.log(makeOptions(imported.inventory, 'foundation'));

console.log('\n--- Assignment 2 ---------------------------------------')
class Salad {
  static instanceCounter = 0;
  constructor(salad) {
    this.id = 'salad_' + Salad.instanceCounter++;

    if (typeof salad === 'object') {
      this.ingredients = { ...this.ingredients, ...salad.ingredients }
      this.uuid = uuidv4(); // use this in the constructor
    } else if (typeof salad === 'string') {
      let obj = JSON.parse(salad)
      this.ingredients = { ...this.ingredients, ...obj.ingredients }
      this.uuid = obj.uuid
    } else {
      this.ingredients = {}
      this.uuid = uuidv4(); // use this in the constructor
    }
  }
  add(name, properties) {
    this.ingredients[name] = properties
    return this
  }
  remove(name) {
    delete this.ingredients[name]
    return this
  }

  static parseSalads(salads) {
    if(salads) {
      salads = JSON.parse(salads)
      return salads.map(salad => new Salad(salad));
    }
    return []
  }


}

let myCaesarSalad = new Salad()
  .add('Sallad', imported.inventory['Sallad'])
  .add('Kycklingfilé', imported.inventory['Kycklingfilé'])
  .add('Bacon', imported.inventory['Bacon'])
  .add('Krutonger', imported.inventory['Krutonger'])
  .add('Parmesan', imported.inventory['Parmesan'])
  .add('Ceasardressing', imported.inventory['Ceasardressing'])
  .add('Gurka', imported.inventory['Gurka']);
console.log(JSON.stringify(myCaesarSalad) + '\n');
myCaesarSalad.remove('Gurka');
console.log(JSON.stringify(myCaesarSalad) + '\n');

console.log('\n--- Assignment 3 ---------------------------------------')
Salad.prototype.getPrice = function () {
  let names = Object.keys(this.ingredients)
  console.log("Ingredients: " + names)
  return names
    .map(name => this.ingredients[name].price)
    .reduce((sum, price) => sum + price)
}
Salad.prototype.count = function (prop) {
  let names = Object.keys(this.ingredients)
  return names
    .filter(name => this.ingredients[name][prop] == true)
    .length
}
console.log('En ceasarsallad kostar ' + myCaesarSalad.getPrice() + 'kr');
//En ceasarsallad kostar 45kr
console.log('En ceasarsallad har ' + myCaesarSalad.count('lactose') + ' ingredienser med laktos');
// En ceasarsallad har 2 ingredienser med laktos
console.log('En ceasarsallad har ' + myCaesarSalad.count('extra') + ' tillbehör');
// En ceasarsallad har 3 tillbehör


console.log('\n--- reflection question 3 ---------------------------------------')
console.log('typeof Salad: ' + typeof Salad);
console.log('typeof Salad.prototype: ' + typeof Salad.prototype);
console.log('typeof Salad.prototype.prototype: ' + typeof Salad.prototype.prototype);
console.log('typeof myCaesarSalad: ' + typeof myCaesarSalad);
console.log('typeof myCaesarSalad.prototype: ' + typeof myCaesarSalad.prototype);
console.log('check 1: ' + (Salad.prototype === Object.getPrototypeOf(myCaesarSalad)));
console.log('check 2: ' + (Object.prototype === Object.getPrototypeOf(Salad.prototype)));

console.log('\n--- Assignment 4 ---------------------------------------')

const objectCopy = new Salad(myCaesarSalad);
const json = JSON.stringify(myCaesarSalad);
const jsonCopy = new Salad(json);
console.log('myCesarSalad\n' + JSON.stringify(myCaesarSalad));
console.log('copy from object\n' + JSON.stringify(objectCopy));
console.log('copy from json\n' + JSON.stringify(jsonCopy));
objectCopy.add('Gurka', imported.inventory['Gurka']);
console.log('originalet kostar kostar ' + myCaesarSalad.getPrice() + ' kr');
console.log('med gurka kostar den ' + objectCopy.getPrice() + ' kr');

console.log('\n--- Assignment 5 ---------------------------------------')
class GourmetSalad extends Salad {
  constructor(salad) {
    super(salad)
  }
  add(name, properties, size) {
    let currSize = 0
    if (this.ingredients[name])
      currSize = this.ingredients[name].size
    let propWithSize = Object.assign({}, properties)
    propWithSize.size = currSize ? currSize + size : size
    return super.add(name, propWithSize)
  }
}
GourmetSalad.prototype.getPrice = function () {
  let names = Object.keys(this.ingredients)
  return names
    .map(name => {
      if (this.ingredients[name].size)
        return this.ingredients[name].price * this.ingredients[name].size
      else
        return this.ingredients[name].price
    })
    .reduce((sum, price) => sum + price)
}
GourmetSalad.prototype.count = function (prop) {
  let names = Object.keys(this.ingredients)
  return names
    .filter(name => this.ingredients[name][prop] == true)
    .length
}
let myGourmetSalad = new GourmetSalad()
  .add('Sallad', imported.inventory['Sallad'], 0.5)
  .add('Kycklingfilé', imported.inventory['Kycklingfilé'], 2)
  .add('Bacon', imported.inventory['Bacon'], 0.5)
  .add('Krutonger', imported.inventory['Krutonger'])
  .add('Parmesan', imported.inventory['Parmesan'], 2)
  .add('Ceasardressing', imported.inventory['Ceasardressing']);
console.log(myCaesarSalad)
console.log('Min gourmetsallad med lite bacon kostar ' + myGourmetSalad.getPrice() + ' kr');
myGourmetSalad.add('Bacon', imported.inventory['Bacon'], 1)
console.log('Med extra bacon kostar den ' + myGourmetSalad.getPrice() + ' kr');

console.log('\n--- Assignment 6 ---------------------------------------')

console.log('Min gourmetsallad har id: ' + myGourmetSalad.id);
console.log('Min gourmetsallad har uuid: ' + myGourmetSalad.uuid);


/**
 * Reflection question 4
 */
/**
 * Reflection question 5
 */
/**
 * Reflection question 6
 */
export default Salad;