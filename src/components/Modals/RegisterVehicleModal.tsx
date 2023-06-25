'use client'

import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Button, Grid } from '@mui/material'

import BaseModal from './BaseModal'
import Input from '../Input'
import { VehicleSimplifiedToRegister } from '@/types/vehicle'
import { useVehicleModalStore } from '@/shared/hooks'

const RegisterVehicleSchema = z.object({
  placa: z.string().min(7, 'Precisa ter no mínimo 7 dígitos.'),
  marcaModelo: z.string().min(4, 'Precisa ter no mínimo 4 dígitos'),
  anoFabricacao: z.string().min(4, 'Precisa ter no mínimo 4 dígitos'),
  kmAtual: z.string().nonempty('Campo obrigatório'),
})

export type RegisterVehicleFormData = z.infer<typeof RegisterVehicleSchema>

type Props = {
  onRegister: (data: RegisterVehicleFormData) => Promise<boolean>
  onUpdate: (data: RegisterVehicleFormData, id: number) => Promise<boolean>
}

const requiredFields = [
  {
    id: 'placa',
    label: 'Placa',
    maxLength: 7,
  },
  {
    id: 'marcaModelo',
    label: 'Marca - Modelo',
  },
  {
    id: 'anoFabricacao',
    label: 'Ano de fabricação',
    type: 'number',
    maxLength: 4,
  },
  {
    id: 'kmAtual',
    label: 'KM atual',
    type: 'number',
  },
]

const RegisterVehicleModal = ({ onRegister, onUpdate }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const { onClose, isOpen, isUpdate, deactivateUpdateState, vehicleIdToUpate } =
    useVehicleModalStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<VehicleSimplifiedToRegister>({
    resolver: zodResolver(RegisterVehicleSchema),
  })

  const handleClose = () => {
    if (isUpdate) {
      deactivateUpdateState()
      onClose()
    }
  }

  useEffect(() => {
    if (isOpen) {
      reset()
    }
  }, [isOpen])

  const onSubmit = async (data: RegisterVehicleFormData) => {
    setIsLoading(true)

    const isSuccess = isUpdate ? await onUpdate(data, vehicleIdToUpate) : await onRegister(data)

    if (isSuccess) {
      toast.success(`${isUpdate ? 'Atualizado' : 'Veículo Cadastrado'}`)
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
            name={requiredField.id as keyof VehicleSimplifiedToRegister}
            control={control}
            render={({ field }) => (
              <Input
                label={requiredField.label}
                id={requiredField.id}
                register={register}
                errors={errors}
                fullWidth
                type={requiredField.type}
                disabled={isLoading}
                maxLength={requiredField.maxLength}
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
      title={`${isUpdate ? 'Atualizar' : 'Cadastrar'} Veículo`}
      bodyContent={bodyContent}
    />
  )
}
export default RegisterVehicleModal
