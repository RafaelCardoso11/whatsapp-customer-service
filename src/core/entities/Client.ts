class Client {
  _id?: string;
  name: string;
  nameSave?: string;
  telephone: string;

  constructor(name: string, telephone: string) {
    this.name = name;
    this.telephone = telephone;
  }
}

export { Client };
