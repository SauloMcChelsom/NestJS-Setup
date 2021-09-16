export class RetornPerfilUser  {
  private uid: string;
  private name: string;
  private lastName: string;
  private email: string;
  private timestamp: Date;
  private providers: string;

  constructor(values:any){
    this.uid = values?.uid;
    this.name = values?.name;
    this.lastName = values?.lastName;
    this.email = values?.email;
    this.timestamp = values?.timestamp;
  }
}




