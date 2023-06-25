import { create } from 'zustand'

type Props = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  isUpdate: boolean
  activateUpdateState: () => void
  deactivateUpdateState: () => void
  conductorIdToUpate: number
  setConductorIdToUpate: (id: number) => void
}

const useConductorModalStore = create<Props>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  isUpdate: false,
  conductorIdToUpate: 0,
  setConductorIdToUpate: (id) => set({ conductorIdToUpate: id }),
  activateUpdateState: () => set({ isUpdate: true }),
  deactivateUpdateState: () => set({ isUpdate: false }),
}))

export default useConductorModalStore
