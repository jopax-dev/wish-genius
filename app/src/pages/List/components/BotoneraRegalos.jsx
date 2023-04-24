import { useUser } from '../../../hooks/useUser'
import { useGifts } from '../../../hooks/useGifts'
import { FormButton } from '../../../components/FormContainer'
import { AlreadyBought } from '../../../components/StyledGifts'

export const BotoneraRegalos = ({ applicant, buyer, info, refreshState }) => {
  const { assign, remove, purchased, purchasedAlone } = useGifts()
  const userId = useUser()
  const { gift } = info
  const giftId = gift.id

  return (
    <>
      {applicant !== userId && !buyer && <span><FormButton onClick={async () => { await assign({ giftId }); refreshState() }}>Me lo quedo</FormButton></span>}
      {applicant === userId && !buyer && <span><FormButton onClick={async () => { await remove({ giftId }); refreshState() }}>Eliminar</FormButton></span>}
      {buyer === userId && <span><FormButton onClick={async () => { await purchased({ info }); refreshState() }}>Ya lo he comprado</FormButton></span>}
      {buyer === userId && <span><FormButton onClick={async () => { await purchasedAlone({ giftId }); refreshState() }}>Comprado solo yo</FormButton></span>}
      {buyer && buyer !== userId && <AlreadyBought>Ya asignado</AlreadyBought>}
    </>
  )
}
