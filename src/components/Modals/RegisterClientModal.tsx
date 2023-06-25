'use client'

import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Button, Grid } from '@mui/material'

import useClientModalStore from '@/shared/hooks/useClientModalStore'
import { Client } from '@/types/client'
import BaseModal from './BaseModal'
import Input from '../Input'

const RegisterClientSchema = z.object({
  nome: z.string().min(5, 'Precisa ter 5 caracteres ao menos'),
  numeroDocumento: z
    .string()
    .nonempty('Campo Obrigatório')
    .min(6, 'Precisa ter 6 caracteres ao menos'),
  tipoDocumento: z
    .string()
    .nonempty('Campo Obrigatório')
    .min(2, 'Precisa ter 2 caracteres ao menos'),
  logradouro: z.string().min(5, 'Precisa ter 5 caracteres ao menos'),
  numero: z.string().min(1, 'Precisa ter 1 caracter ao menos'),
  bairro: z.string().min(5, 'Precisa ter 5 caracteres ao menos'),
  cidade: z.string().min(5, 'Precisa ter 5 caracteres ao menos'),
  uf: z.string().min(2, 'Precisa ter 2 caracteres ao menos'),
})

type RegisterClientFormData = z.infer<typeof RegisterClientSchema>

const requiredFields = [
  {
    id: 'nome',
    label: 'Nome',
  },
  {
    id: 'numeroDocumento',
    label: 'Nª do Documento',
  },
  {
    id: 'tipoDocumento',
    label: 'Tipo do Documento',
  },
  {
    id: 'logradouro',
    label: 'Logradouro',
  },
  {
    id: 'numero',
    label: 'Número',
  },
  {
    id: 'bairro',
    label: 'Bairro',
  },
  {
    id: 'cidade',
    label: 'Cidade',
  },
  {
    id: 'uf',
    label: 'UF',
  },
]

type Props = {
  onRegister: (data: RegisterClientFormData) => Promise<boolean>
  onUpdate: (data: RegisterClientFormData, id: number) => Promise<boolean>
}

const RegisterClientModal = ({ onRegister, onUpdate }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const { onClose, isOpen, isUpdate, deactivateUpdateState, clientIdToUpate } =
    useClientModalStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<Client>({
    resolver: zodResolver(RegisterClientSchema),
  })

  const handleClose = () => {
    if (isUpdate) {
      deactivateUpdateState()
      onClose()
    } else {
      onClose()
    }
  }

  useEffect(() => {
    if (isOpen) {
      reset()
    }
  }, [isOpen])

  const onSubmit = async (data: RegisterClientFormData) => {
    setIsLoading(true)

    const isSuccess = isUpdate ? await onUpdate(data, clientIdToUpate) : await onRegister(data)

    if (isSuccess) {
      toast.success(`${isUpdate ? 'Atualizado' : 'Cadastrado'}`)
      onClose()
      reset()
    } else {
      toast.error('Algo deu errado.')
    }
    setIsLoading(false)
  }
  const bodyContent = (
    <Grid container component='form' spacing={2} mt={3} onSubmit={handleSubmit(onSubmit)}>
      {requiredFields.map((requiredField) => (
        <Grid item key={requiredField.id} md={6} sm={6} xs={12}>
          <Controller
            name={requiredField.id as keyof Client}
            control={control}
            render={({ field }) => (
              <Input
                label={requiredField.label}
                id={requiredField.id}
                register={register}
                errors={errors}
                fullWidth
                disabled={isLoading}
                {...field}
              />
            )}
          />
        </Grid>
      ))}
      <Button disabled={isLoading} type='submit' sx={{ ml: 'auto', mt: 1 }} variant='action'>
        Enviar
      </Button>
    </Grid>
  )

  return (
    <BaseModal
      onClose={handleClose}
      isOpen={isOpen}
      title={`${isUpdate ? 'Atualizar' : 'Cadastrar'} Cliente`}
      bodyContent={bodyContent}
    />
  )
}
export default RegisterClientModal
