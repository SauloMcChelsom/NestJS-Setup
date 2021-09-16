export class checkIfUserExistsByEmailMap  {
  private email: string;
  private providers: string;
  constructor(values:any){
    this.providers = values?.providers;
    this.email = values?.email;
  }
}