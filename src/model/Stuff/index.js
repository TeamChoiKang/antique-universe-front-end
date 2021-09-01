class Stuff {
  constructor(
    stuffId = '',
    name = '',
    price = 0,
    imageUrl = '',
    description = '',
    isSold = false,
    onlyAdult = false,
  ) {
    this._stuffId = stuffId;
    this._name = name;
    this._price = price;
    this._imageUrl = imageUrl;
    this._description = description;
    this._isSold = isSold;
    this._onlyAdult = onlyAdult;
  }

  getStuffId() {
    return this._stuffId;
  }

  getName() {
    return this._name;
  }

  getPrice() {
    return this._price;
  }

  getImageUrl() {
    return this._imageUrl;
  }

  getDescription() {
    return this._description;
  }

  getIsSold() {
    return this._isSold;
  }

  getOnlyAdult() {
    return this._onlyAdult;
  }
}

export default Stuff;
