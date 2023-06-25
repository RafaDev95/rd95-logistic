export type Conductor = {
  nome: string
  numeroHabilitacao: string
  categoriaHabilitacao: string
  vencimentoHabilitacao: string
}

export interface ConductorResponse extends Conductor {
  id: number
}
