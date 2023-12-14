export class Product{
  id: number;
  name: string;
  description: string;
  photo: string;
  price: number;
  enabled: boolean;

  constructor(name: string){
    this.name = name;
  }
}
