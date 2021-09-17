export class RetornoDto  {
  public id: number;
  public eu_curti: boolean
  public publicacao_id: number;
  public usuario_id: number;

  constructor(values:any) {
    this.id = values.id;
    this.eu_curti = values.eu_curti ? true : false;
    this.publicacao_id = values.publicacao_id;
    this.usuario_id = values.usuario_id;
  }
}