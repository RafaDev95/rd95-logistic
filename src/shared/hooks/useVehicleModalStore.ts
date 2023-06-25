import { create } from 'zustand'

type Props = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  isUpdate: boolean
  vehicleIdToUpate: number
  setVehicleIdToUpate: (id: number) => void
  activateUpdateState: () => void
  deactivateUpdateState: () => void
}

const useVehicleModalStore = create<Props>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  isUpdate: false,
  vehicleIdToUpate: 0,
  setVehicleIdToUpate: (id) => set({ vehicleIdToUpate: id }),
  activateUpdateState: () => set({ isUpdate: true }),
  deactivateUpdateState: () => set({ isUpdate: false }),
}))

export default useVehicleModalStore
