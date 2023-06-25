import { create } from 'zustand'

type Props = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  isUpdate: boolean
  activateUpdateState: () => void
  deactivateUpdateState: () => void
  displacementIdToUpate: number
  setDisplacementIdToUpate: (id: number) => void
}

const useDisplacementModalStore = create<Props>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  isUpdate: false,
  displacementIdToUpate: 0,
  setDisplacementIdToUpate: (id) => set({ displacementIdToUpate: id }),
  activateUpdateState: () => set({ isUpdate: true }),
  deactivateUpdateState: () => set({ isUpdate: false }),
}))

export default useDisplacementModalStore
