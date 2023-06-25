import { create } from 'zustand'

type DateValue = {
  date: string
  id: string
}

type Props = {
  dateValue: DateValue
  setDateValue: (value: DateValue) => void
  isWrongDate: boolean
  toggleWrongDate: () => void
}

const useDateValueStore = create<Props>((set) => ({
  dateValue: { date: '', id: '' },
  setDateValue: (value) => set({ dateValue: { ...value } }),
  isWrongDate: false,
  toggleWrongDate: () => set((state) => ({ isWrongDate: !state.isWrongDate })),
}))

export default useDateValueStore
