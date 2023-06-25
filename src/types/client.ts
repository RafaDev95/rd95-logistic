export type Client = {
  nome: string
  numeroDocumento: string
  tipoDocumento: string
  logradouro: string
  numero: string
  bairro: string
  cidade: string
  uf: string
}

export interface ClientResponse extends Client {
  id: number
}
