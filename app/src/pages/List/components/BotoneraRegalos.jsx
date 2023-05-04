import { useUser } from '../../../hooks/useUser'
import { useGifts } from '../../../hooks/useGifts'
import { AlreadyBought, ButtonPanel } from '../../../components/StyledGifts'

export const BotoneraRegalos = ({ applicant, buyer, info, refreshState }) => {
  const { assign, remove, purchased, purchasedAlone } = useGifts()
  const userId = useUser()
  const { gift } = info
  const giftId = gift.id

  return (
    <span>
      {(applicant !== userId || gift.toOther) && !buyer && <><ButtonPanel onClick={async () => { await assign({ giftId }); refreshState() }}>Me lo quedo</ButtonPanel></>}
      {applicant === userId && !buyer && <><ButtonPanel onClick={async () => { await remove({ giftId }); refreshState() }}>Eliminar</ButtonPanel></>}
      {buyer === userId &&
        <>
          <ButtonPanel onClick={async () => { await purchased({ info }); refreshState() }}>Ya lo he comprado</ButtonPanel>
          <ButtonPanel onClick={async () => { await purchasedAlone({ giftId }); refreshState() }}>Comprado solo yo</ButtonPanel>
        </>}
      {buyer && buyer !== userId && <AlreadyBought>Ya asignado</AlreadyBought>}
    </span>
  )
}
