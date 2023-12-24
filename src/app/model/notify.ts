export class Notify{
  header: string;
  message: string;
  color: string;
  opacity = "100%";
  translate = "-100%";

  constructor(header: string, message: string, color: string){
    this.header = header;
    this.message = message;
    this.color = color;
  }
}
