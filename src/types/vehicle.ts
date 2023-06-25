export type VehicleSimplifiedToRegister = {
  placa: string
  marcaModelo: string
  anoFabricacao: string
  kmAtual: string
}

export type Vehicle = {
  placa: string
  marcaModelo: string
  anoFabricacao: number
  kmAtual: number
}

export interface VehicleResponse extends Vehicle {
  id: number
}
