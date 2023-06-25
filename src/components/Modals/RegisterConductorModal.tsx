'use client'

import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button, Grid } from '@mui/material'

import { Conductor } from '@/types/conductor'
import { useConductorModalStore, useDateValueStore } from '@/shared/hooks'
import useDate from '@/hooks/useDate'
import BaseModal from './BaseModal'
import Input from '../Input'

const RegisterConductorSchema = z.object({
  nome: z.string().min(5, 'Precisa ter 5 caracteres ao menos'),
  numeroHabilitacao: z.string().min(9, 'Precisa ter 9 caracteres ao menos'),
  categoriaHabilitacao: z.string().min(1, 'Precisa ter 1 caracteres ao menos'),
  vencimentoHabilitacao: z.string(),
})

const UpdateConductorSchema = z.object({
  categoriaHabilitacao: z.string().min(1, 'Precisa ter 1 caracteres ao menos'),
  vencimentoHabilitacao: z.string(),
})

type Props = {
  onRegister: (data: Conductor) => Promise<boolean>
  onUpdate: (data: Conductor, id: number) => Promise<boolean>
}

const requiredFields = [
  {
    id: 'nome',
    label: 'Nome',
  },
  {
    id: 'numeroHabilitacao',
    label: 'Nª da Habilitação',
  },
  {
    id: 'categoriaHabilitacao',
    label: 'Categoria da Habilitação',
  },
  {
    id: 'vencimentoHabilitacao',
    label: 'Vencimento da Habilitação',
    isDateFormat: true,
  },
]

const updateFields = [
  {
    id: 'categoriaHabilitacao',
    label: 'Categoria da Habilitação',
  },
  {
    id: 'vencimentoHabilitacao',
    label: 'Vencimento da Habilitação',
    isDateFormat: true,
  },
]

const RegisterConductorModal = ({ onRegister, onUpdate }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const { dateValue, isWrongDate } = useDateValueStore()
  const { onClose, isOpen, isUpdate, deactivateUpdateState, conductorIdToUpate } =
    useConductorModalStore()

  const handleOnClose = () => {
    if (isUpdate) {
      deactivateUpdateState()
      onClose()
    } else {
      onClose()
    }
  }

  const fieldsToMap = isUpdate ? updateFields : requiredFields

  const zodSchemaForZodResolver = isUpdate ? UpdateConductorSchema : RegisterConductorSchema

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<Conductor & { id: number }>({
    resolver: zodResolver(zodSchemaForZodResolver),
  })

  const { isoFormatDate } = useDate(
    (dateValue.id === 'vencimentoHabilitacao' && dateValue.date) || ''
  )

  useEffect(() => {
    if (isOpen) {
      reset()
    }
  }, [isOpen])

  const onSubmit = async (data: Conductor & { id: number }) => {
    setIsLoading(true)

    const { vencimentoHabilitacao, ...restData } = data

    const isSuccess = isUpdate
      ? await onUpdate(
          {
            vencimentoHabilitacao: isoFormatDate,
            ...restData,
          },
          conductorIdToUpate
        )
      : onRegister({
          vencimentoHabilitacao: isoFormatDate,
          ...restData,
        })

    if (isSuccess) {
      toast.success(`${isUpdate ? 'Atualizado' : 'Condutor Cadastrado'}`)
      onClose()
      reset()
    } else {
      toast.error('Algo deu errado.')
    }
    setIsLoading(false)
  }

  const bodyContent = (
    <Grid container component='form' spacing={2} mt={3} onSubmit={handleSubmit(onSubmit)}>
      {fieldsToMap.map((requiredField) => (
        <Grid item key={requiredField.id} md={6} sm={6} xs={12}>
          <Controller
            name={requiredField.id as keyof Conductor}
            control={control}
            render={({ field }) => (
              <Input
                label={requiredField.label}
                id={requiredField.id}
                register={register}
                errors={errors}
                fullWidth
                disabled={isLoading}
                isDateFormat={requiredField.isDateFormat}
                {...field}
              />
            )}
          />
        </Grid>
      ))}
      <Button
        disabled={isLoading || dateValue.date.length < 10 || isWrongDate}
        type='submit'
        sx={{ ml: 'auto', mt: 1 }}
        variant='action'
      >
        Enviar
      </Button>
    </Grid>
  )

  return (
    <BaseModal
      onClose={handleOnClose}
      isOpen={isOpen}
      title={`${isUpdate ? 'Atualizar' : 'Cadastrar'} Condutor`}
      bodyContent={bodyContent}
    />
  )
}
export default RegisterConductorModal
