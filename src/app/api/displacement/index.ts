import {
  CompleteDisplacementSimplifiedToRegister,
  Displacement,
  DisplacementSimplifiedToRegister,
  DisplacementResponse,
} from '@/types/displacement'

import { baseUrl } from '../baseUrl'

export const registerDisplacement = async (
  displacement: DisplacementSimplifiedToRegister
): Promise<boolean> => {
  const { idCliente, idCondutor, idVeiculo, kmInicial, ...restData } = displacement

  const parsedDisplacementData: Displacement = {
    idCliente: Number(idCliente),
    idCondutor: Number(idCondutor),
    idVeiculo: Number(idVeiculo),
    kmInicial: Number(kmInicial),
    ...restData,
  }

  console.log(parsedDisplacementData)

  try {
    const res = await fetch(`${baseUrl}/Deslocamento/IniciarDeslocamento`, {
      method: 'POST',
      body: JSON.stringify(parsedDisplacementData),
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

export const getDisplacements = async (): Promise<DisplacementResponse[]> => {
  try {
    const res = await fetch(`${baseUrl}/Deslocamento`, {
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

export const getDisplacementById = async (id: number): Promise<DisplacementResponse> => {
  try {
    const res = await fetch(`${baseUrl}/Deslocamento/${id}`, {
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

export const deleteDisplacement = async (id: number): Promise<boolean> => {
  try {
    const res = await fetch(`${baseUrl}/Deslocamento/${id}`, {
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

export const updateDisplacement = async (
  displacement: CompleteDisplacementSimplifiedToRegister,
  id: number
): Promise<boolean> => {
  try {
    const res = await fetch(`${baseUrl}/Deslocamento/${id}/EncerrarDeslocamento`, {
      method: 'PUT',
      body: JSON.stringify({ ...displacement, id }),
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
