class Stuff {
  constructor(name, price, thumbNail, description) {
    this._name = name;
    this._price = price;
    this._thumbNail = thumbNail;
    this._description = description;
  }

  getName() {
    return this._name;
  }

  getPrice() {
    return this._price;
  }

  getThumbNail() {
    return this._thumbNail;
  }

  getDescription() {
    return this._description;
  }
}

export default Stuff;
