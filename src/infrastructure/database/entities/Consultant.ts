class Consultant {
  _id: string;
  name: string;
  number: string;
  clientCurrent: {
    _id: string;
    name: string;
    number: string;
  };

  constructor(
    id: string,
    name: string,
    number: string,
    clientCurrent: { _id: string; name: string; number: string }
  ) {
    this._id = id;
    this.name = name;
    this.number = number;
    this.clientCurrent = clientCurrent;
  }
}

export { Consultant };
