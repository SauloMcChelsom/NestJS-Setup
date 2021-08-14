export class RetornoUserDto  {
  private id: number;
  private nome: string;
  private sobreNome: string;
  private email: string;
  private lastChangedDateTime: Date;

  constructor(user:any){
    this.nome = user.nome;
    this.sobreNome = user.sobreNome;
    this.email = user.email;
    this.id = user.id;
    this.lastChangedDateTime = user.lastChangedDateTime;
  }
}