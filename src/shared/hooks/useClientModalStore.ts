import { create } from 'zustand'

type Props = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  isUpdate: boolean
  activateUpdateState: () => void
  deactivateUpdateState: () => void
  clientIdToUpate: number
  setClientIdToUpate: (id: number) => void
}

const useClientModalStore = create<Props>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  isUpdate: false,
  clientIdToUpate: 0,
  setClientIdToUpate: (id) => set({ clientIdToUpate: id }),
  activateUpdateState: () => set({ isUpdate: true }),
  deactivateUpdateState: () => set({ isUpdate: false }),
}))

export default useClientModalStore
