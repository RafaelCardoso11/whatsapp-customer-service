class Consultant {
  _id: string
  name: string
  telephone: string
  clientCurrent: {
    _id: string
    name: string
    telephone: string
  }

  constructor(
    id: string,
    name: string,
    telephone: string,
    clientCurrent: { _id: string; name: string; telephone: string }
  ) {
    this._id = id
    this.name = name
    this.telephone = telephone
    this.clientCurrent = clientCurrent
  }
}

export { Consultant }
