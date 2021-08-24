export class RetornoDto  {
  private id: number;
  private eu_curti: boolean
  private publicacao_id: number;
  private usuario_id: number;

  constructor(values:any) {
    this.id = values.id;
    this.eu_curti = values.eu_curti;
    this.publicacao_id = values.publicacao_id;
    this.usuario_id = values.usuario_id;
  }
}