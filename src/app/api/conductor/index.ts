import { Conductor, ConductorResponse } from '@/types/conductor'

export const registerConductor = async (conductor: Conductor): Promise<boolean> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/Condutor`, {
      method: 'POST',
      body: JSON.stringify(conductor),
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

export const getConductors = async (): Promise<ConductorResponse[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/Condutor`, {
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

export const getConductorById = async (id: number): Promise<ConductorResponse> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/Condutor/${id}`, {
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

export const deleteConductor = async (id: number): Promise<boolean> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/Condutor/${id}`, {
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

export const updateConductor = async (client: Conductor, id: number): Promise<boolean> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/Condutor/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...client, id }),
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
