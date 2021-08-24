export class RetornoDto  {
  private id: number;
  private quantidade_de_curtidas: string;
  private publicacao_id: number;


  constructor(values:any) {
    this.id = values.id;
    this.quantidade_de_curtidas = values.quantidade_de_curtidas;
    this.publicacao_id = values.publicacao_id;
  }
}