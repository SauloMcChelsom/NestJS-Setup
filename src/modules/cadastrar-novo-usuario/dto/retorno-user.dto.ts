export class RetornoDto  {
  private id: number;
  private nome: string;
  private sobreNome: string;
  private email: string;
  private data_de_cadastro: Date;

  constructor(values:any){
    this.nome = values.nome;
    this.sobreNome = values.sobreNome;
    this.email = values.email;
    this.id = values.id;
    this.data_de_cadastro = values.data_de_cadastro;
  }
}