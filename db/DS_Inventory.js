class Inventory {
  constructor() {
    this.knex = require('../knex/knex.js')
    this._count = 1;
    this._storage = [];
    this.add({
      name: 'Boring Sword',
      description: 'A non-descript piece of cardboard cut into a triangle'
    });
    this.add({
      name: 'Old Shotgun',
      description: 'A piece of metal that resides on the porch with a dog.'
    });
    this.add({
      name: 'Jasons Cucumber',
      description: 'Makes people faint.'
    });
  }
  all() {
    return this.knex.raw('SELECT * FROM items')
    
  }
  getItemById(id) {
    return this._storage.filter(item => id == item.id)[0];
  }
  add(item) {
    item.id = this._count;
    this._storage.push(item);
    this._count++;
    return item.id;
  }
  updateItemById(id) {}
  deleteItemById(id) {}
}

module.exports = Inventory;
