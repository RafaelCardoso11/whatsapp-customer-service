class Client {
  _id?: string
  name: string
  nameSave?: string
  telephone: string

  constructor(id: string, name: string, telephone: string) {
    this._id = id
    this.name = name
    this.telephone = telephone
  }
}

export { Client }
