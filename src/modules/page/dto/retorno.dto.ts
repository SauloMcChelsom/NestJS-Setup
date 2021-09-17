export class RetornoDto  {
  private id: number;
  private descricao_da_pagina: string;
  private nome_da_pagina: string;
  private usuario_id: number;
  private data_criacao_pagina: Date;


  constructor(values:any) {
    this.id = values.id;
    this.descricao_da_pagina = values.descricao_da_pagina;
    this.nome_da_pagina = values.nome_da_pagina;
    this.usuario_id = values.usuario_id;
    this.data_criacao_pagina = values.data_criacao_pagina;
  }
}