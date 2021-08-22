export class RetornoDto  {
  private id: number;
  private texto: string;
  private pagina_id: number;
  private data_da_publicacao: Date;


  constructor(values:any) {
    this.id = values.id;
    this.texto = values.texto;
    this.pagina_id = values.pagina_id;
    this.data_da_publicacao = values.data_da_publicacao;
  }
}