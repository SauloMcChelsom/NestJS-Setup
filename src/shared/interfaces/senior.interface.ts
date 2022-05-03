
export interface CheckInSenior  {
  senior_id: number
  adicional_veiculo: boolean
  valor: string
  dataEntrada: Date
  dataSaida: Date
}

export interface CreateSenior  {
  documents: string
  name: string
  phone: string
}

export interface UpdateSenior  {
  comment: string
}