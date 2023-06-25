'use client'

import * as React from 'react'

import { TextField } from '@mui/material'

import { UseFormRegister, FieldErrors, UseFormReset } from 'react-hook-form'
import InputMask from 'react-input-mask'
import useDateValueStore from '@/shared/hooks/useDateValueStore'

type Props = {
  id: string
  label: string
  type?: string
  disabled?: boolean
  register: UseFormRegister<any>
  errors: FieldErrors
  fullWidth?: boolean
  sx?: { [key: string]: any }
  isDateFormat?: boolean
  maxLength?: number
}

const Input = React.memo(
  ({
    errors,
    id,
    label,
    register,
    disabled,
    type,
    fullWidth = false,
    sx,
    isDateFormat,
    maxLength,
  }: Props) => {
    const [dateInputValue, setDateInputValue] = React.useState('')

    const { setDateValue, isWrongDate, toggleWrongDate } = useDateValueStore()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setDateInputValue(e.target.value)

      if (isWrongDate) {
        setDateValue({ date: '', id })
        toggleWrongDate()
      }
    }

    React.useEffect(() => {
      if (dateInputValue.length >= 10) {
        setDateValue({ date: dateInputValue, id })
      }
    }, [dateInputValue])

    if (isDateFormat) {
      const { onChange, onBlur, ...registerProps } = register(id)

      return (
        <InputMask
          mask='99/99/9999'
          value={dateInputValue}
          onChange={handleChange}
          maskPlaceholder={null}
        >
          <TextField
            label={label}
            placeholder='Ex.:10/05/2030'
            fullWidth
            size='small'
            {...registerProps}
            inputProps={{ maxLength: 11 }}
            error={!!errors[id]}
            helperText={errors[id] ? errors[id]?.message?.toString() : null}
            sx={sx}
          />
        </InputMask>
      )
    }

    return (
      <TextField
        label={label}
        {...register(id)}
        error={!!errors[id]}
        helperText={errors[id] ? errors[id]?.message?.toString() : null}
        type={type ?? 'text'}
        fullWidth={fullWidth}
        sx={sx}
        disabled={disabled}
        size='small'
        inputProps={{ maxLength }}
        defaultValue=''
      />
    )
  }
)
export default Input
