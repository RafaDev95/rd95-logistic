'use client'

import { isAfter, isToday, format, parse, parseISO } from 'date-fns'

import toast from 'react-hot-toast'
import { useState, useEffect } from 'react'

import { useDateValueStore } from '@/shared/hooks'

const useDate = (dateInputValue: string) => {
  const { toggleWrongDate } = useDateValueStore()
  const [isoFormatDate, setIsoFormatDate] = useState('')

  useEffect(() => {
    if (dateInputValue?.length >= 10) {
      convertDateToISOFormat()
    }
  }, [dateInputValue])

  const convertDateToISOFormat = () => {
    const parsedDate = parse(dateInputValue, 'dd/MM/yyyy', new Date())

    const currentDate = new Date()

    parsedDate.setHours(currentDate.getHours())
    parsedDate.setMinutes(currentDate.getMinutes())
    parsedDate.setSeconds(currentDate.getSeconds())
    parsedDate.setMilliseconds(currentDate.getMilliseconds())

    if (isNaN(parsedDate.getDate())) {
      toast.error('Data inválida.')
      toggleWrongDate()
    } else if (isAfter(parsedDate, new Date()) || isToday(parsedDate)) {
      const formattedDateString = format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS")

      setIsoFormatDate(formattedDateString)
    } else {
      toast.error('A data não pode menor que hoje.')
      toggleWrongDate()
    }
  }

  const userFriendlyDateFormat = (dateString: string) => {
    const parsedData = parseISO(dateString)
    const formattedData = format(parsedData, 'dd/MM/yyyy')

    return formattedData
  }

  return { isoFormatDate, dateInputValue, userFriendlyDateFormat }
}
export default useDate
