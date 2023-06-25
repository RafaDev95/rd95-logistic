import { Client, ClientResponse } from '@/types/client'

import { baseUrl } from '../baseUrl'

export const registerClient = async (client: Client): Promise<boolean> => {
  try {
    const res = await fetch(`${baseUrl}/Cliente`, {
      method: 'POST',
      body: JSON.stringify(client),
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

export const getClients = async (): Promise<ClientResponse[]> => {
  try {
    const res = await fetch(`${baseUrl}/Cliente`, {
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

export const getClientById = async (id: number): Promise<ClientResponse> => {
  try {
    const res = await fetch(`${baseUrl}/Cliente/${id}`, {
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

export const deleteClient = async (id: number): Promise<boolean> => {
  try {
    const res = await fetch(`${baseUrl}/Cliente/${id}`, {
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

export const updateClient = async (client: Client, id: number): Promise<boolean> => {
  try {
    const res = await fetch(`${baseUrl}/Cliente/${id}`, {
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
