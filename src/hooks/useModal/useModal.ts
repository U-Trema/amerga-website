import {useState, useCallback} from 'react'
import {useDisclosure} from '@mantine/hooks'

type OpenModalProps = {
  slice: any
  openModal: (slice: unknown) => void
}


export const useModal = () => {
  const [modalContent, setModalContent] = useState<unknown>(null)
  const [opened, {open, close}] = useDisclosure(false)

  const handleOpenModal = useCallback((content: unknown) => {
    setModalContent(content)
    open()
  }, [open])

  const handleCloseModal = useCallback(() => {
    close()
    setTimeout(() => setModalContent(null), 150)
  }, [close])

  return {modalContent, opened, handleOpenModal, handleCloseModal}
}


export const openModalHandler = ({slice, openModal}: OpenModalProps) => () => {openModal(slice.slice)}
