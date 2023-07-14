class Consultant {
  name: string;
  number: string;
  clientCurrent: {
    name: string;
    number: string;
  };

  constructor(name: string, number: string, clientCurrent: { name: string; number: string }) {
    this.name = name;
    this.number = number;
    this.clientCurrent = clientCurrent;
  }
}

export { Consultant };