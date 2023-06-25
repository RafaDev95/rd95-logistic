export type DisplacementSimplifiedToRegister = {
  kmInicial: string
  inicioDeslocamento: string
  checkList: string
  motivo: string
  observacao: string
  idCondutor: string
  idVeiculo: string
  idCliente: string
}

export type Displacement = {
  kmInicial: number
  inicioDeslocamento: string
  checkList: string
  motivo: string
  observacao: string
  idCondutor: number
  idVeiculo: number
  idCliente: number
}

export interface DisplacementResponse extends Displacement {
  id: number
  kmFinal: number | null
  fimDeslocamento: string
}

export type CompleteDisplacementSimplifiedToRegister = {
  kmFinal: string
  fimDeslocamento: string
  observacao: string
}

export type CompleteDisplacement = {
  id: number
  kmFinal: number
  fimDeslocamento: string
  observacao: string
}
