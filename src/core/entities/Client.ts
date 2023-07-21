class Client {
  name: string;
  telephone: string;

  constructor(_id: string, name: string, telephone: string) {
    this.name = name;
    this.telephone = telephone;
  }
}

export { Client };
