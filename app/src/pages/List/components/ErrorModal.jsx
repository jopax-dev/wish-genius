import { ErrorModalContent, StyledErrorModal } from '../../../components/StyledList'

export const ErrorModal = () => {
  return (
    <StyledErrorModal>
      <ErrorModalContent>
        <h3>No se puede eliminar la lista porque aun hay regalos por comprar</h3>
      </ErrorModalContent>
    </StyledErrorModal>
  )
}
