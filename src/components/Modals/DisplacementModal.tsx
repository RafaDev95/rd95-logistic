'use client'

import useDate from '@/hooks/useDate'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  DisplacementSimplifiedToRegister,
  CompleteDisplacementSimplifiedToRegister,
} from '@/types/displacement'
import { useDisplacementModalStore, useDateValueStore } from '@/shared/hooks'
import Input from '../Input'
import BaseModal from './BaseModal'
import toast from 'react-hot-toast'

const RegisterDisplacementSchema = z.object({
  kmInicial: z.string().nonempty('Campo Obrigatório'),
  inicioDeslocamento: z.string(),
  checkList: z.string().max(10, 'No máximo, 10 caracteres.').min(2, 'No mínimo, 2 caracteres'),
  motivo: z.string().nonempty('Campo Obrigatório'),
  observacao: z.string().nonempty('Campo Obrigatório'),
  idCondutor: z.string().nonempty('Campo obrigatório'),
  idVeiculo: z.string().nonempty('Campo obrigatório'),
  idCliente: z.string().nonempty('Campo obrigatório'),
})

const CompleteDisplacementSchema = z.object({
  kmFinal: z.string().nonempty('Campo obrigatório'),
  fimDeslocamento: z.string(),
  observacao: z.string().nonempty('Campo obrigatório'),
})

type Props = {
  onRegister: (data: DisplacementSimplifiedToRegister) => Promise<boolean>
  onUpdate: (data: CompleteDisplacementSimplifiedToRegister, id: number) => Promise<boolean>
}

const requiredFields = [
  {
    id: 'kmInicial',
    label: 'Km Inicial',
    type: 'number',
  },
  {
    id: 'inicioDeslocamento',
    label: 'Data de saída',
    isDateFormat: true,
  },
  {
    id: 'checkList',
    label: 'Check List',
  },
  {
    id: 'motivo',
    label: 'Motivo',
  },
  {
    id: 'observacao',
    label: 'Observação',
  },
  {
    id: 'idCondutor',
    label: 'ID Condutor',
    type: 'number',
  },
  {
    id: 'idVeiculo',
    label: 'ID Veículo',
    type: 'number',
  },
  {
    id: 'idCliente',
    label: 'ID Cliente',
    type: 'number',
  },
]
const completeDisplacementFields = [
  {
    id: 'kmFinal',
    label: 'Km Final',
    type: 'number',
  },
  {
    id: 'fimDeslocamento',
    label: 'Data de chegada',
    isDateFormat: true,
  },
  {
    id: 'observacao',
    label: 'Observação',
  },
]

const DisplacementModal = ({ onRegister, onUpdate }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const { dateValue, isWrongDate } = useDateValueStore()
  const { onClose, isOpen, isUpdate, deactivateUpdateState, displacementIdToUpate } =
    useDisplacementModalStore()

  const { isoFormatDate } = useDate(
    (dateValue.id === ('inicioDeslocamento' || 'fimDeslocamento') && dateValue.date) || ''
  )

  const fieldsToMap = isUpdate ? completeDisplacementFields : requiredFields

  const zodSchemaForZodResolver = isUpdate ? CompleteDisplacementSchema : RegisterDisplacementSchema

  const handleClose = () => {
    if (isUpdate) {
      deactivateUpdateState()
      onClose()
    } else {
      onClose()
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<DisplacementSimplifiedToRegister & CompleteDisplacementSimplifiedToRegister>({
    resolver: zodResolver(zodSchemaForZodResolver),
  })

  useEffect(() => {
    if (isOpen) {
      reset()
    }
  }, [isOpen])

  const onSubmit = async (
    data: DisplacementSimplifiedToRegister & CompleteDisplacementSimplifiedToRegister
  ) => {
    setIsLoading(true)

    if (isUpdate) {
      const {
        kmInicial,
        inicioDeslocamento,
        checkList,
        motivo,
        idCondutor,
        idVeiculo,
        fimDeslocamento,
        idCliente,
        ...restData
      } = data

      const isSuccess = await onUpdate(
        {
          fimDeslocamento: isoFormatDate,
          ...restData,
        },
        displacementIdToUpate
      )

      if (isSuccess) {
        toast.success('Deslocamento finalizado')
        onClose()
        reset()
      } else {
        toast.error('Algo deu errado.')
      }
    } else {
      const { inicioDeslocamento, kmFinal, fimDeslocamento, ...restData } = data

      const isSuccess = await onRegister({
        inicioDeslocamento: isoFormatDate,
        ...restData,
      })

      if (isSuccess) {
        toast.success('Deslocamento Cadastrado')
        onClose()
        reset()
      } else {
        toast.error('Algo deu errado. Verifique os campos de IDs')
      }
    }

    setIsLoading(false)
  }

  const bodyContent = (
    <Grid container component='form' spacing={2} mt={3} onSubmit={handleSubmit(onSubmit)}>
      {fieldsToMap.map((requiredField) => (
        <Grid item key={requiredField.id} md={6} sm={6} xs={12}>
          <Controller
            name={requiredField.id as keyof DisplacementSimplifiedToRegister}
            control={control}
            render={({ field }) => (
              <Input
                label={requiredField.label}
                id={requiredField.id}
                register={register}
                errors={errors}
                type={requiredField.type}
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
      onClose={handleClose}
      isOpen={isOpen}
      title={`${isUpdate ? 'Finalizar' : 'Cadastrar'} Deslocamento`}
      bodyContent={bodyContent}
    />
  )
}
export default DisplacementModal
