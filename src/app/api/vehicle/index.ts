import { Vehicle, VehicleResponse, VehicleSimplifiedToRegister } from '@/types/vehicle'
import { baseUrl } from '../baseUrl'

export const registerVehicle = async (vehicle: VehicleSimplifiedToRegister): Promise<boolean> => {
  const { anoFabricacao, kmAtual, ...restData } = vehicle

  const parsedVehicleData: Vehicle = {
    anoFabricacao: Number(anoFabricacao),
    kmAtual: Number(kmAtual),
    ...restData,
  }
  try {
    const res = await fetch(`${baseUrl}/Veiculo`, {
      method: 'POST',
      body: JSON.stringify(parsedVehicleData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      throw new Error(`Status ${res.status} ${res.statusText}`)
    }

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export const getVehiclesData = async (): Promise<VehicleResponse[]> => {
  try {
    const res = await fetch(`${baseUrl}/Veiculo`, {
      cache: 'no-store',
      method: 'GET',
    })

    if (!res.ok) {
      throw new Error(`Status ${res.status} ${res.statusText}`)
    }

    return res.json()
  } catch (error: any) {
    console.error(error)
    throw new Error(error)
  }
}

export const getVehicleById = async (id: number): Promise<VehicleResponse> => {
  try {
    const res = await fetch(`${baseUrl}/Veiculo/${id}`, {
      cache: 'no-store',
      method: 'GET',
    })

    if (!res.ok) {
      console.error(`Status ${res.status} ${res.statusText}`)
    }

    return res.json()
  } catch (error: any) {
    console.error(error)
    throw new Error(error)
  }
}

export const deleteVehicle = async (id: number): Promise<boolean> => {
  try {
    const res = await fetch(`${baseUrl}/Veiculo/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      throw new Error(`Status ${res.status} ${res.statusText}`)
    }

    return true
  } catch (error: any) {
    console.error(error)
    return false
  }
}

export const updateVehicle = async (
  vehicle: VehicleSimplifiedToRegister,
  id: number
): Promise<boolean> => {
  const { anoFabricacao, kmAtual, ...restData } = vehicle

  const parsedVehicleData: Vehicle & { id: number } = {
    anoFabricacao: Number(anoFabricacao),
    kmAtual: Number(kmAtual),
    id,
    ...restData,
  }

  try {
    const res = await fetch(`${baseUrl}/Veiculo/${id}`, {
      method: 'PUT',
      body: JSON.stringify(parsedVehicleData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      throw new Error(`Status ${res.status} ${res.statusText}`)
    }

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
