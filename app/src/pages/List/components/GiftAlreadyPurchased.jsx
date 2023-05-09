import { BoughtGift } from '../../../components/StyledGifts'

export const GiftAlreadyPurchased = ({ giftstList, userList }) => {
  return (
    <div>
      {giftstList
        .filter(gift => gift.bought)
        .map((gift, key) => {
          const userName = userList.find(user => user.user.uid === gift.uid)
          return (
            <BoughtGift key={key}>
              El regalo {gift.nombre} de <i><b>{userName.user.name}</b></i> ya se ha comprado
            </BoughtGift>
          )
        }
        )}
    </div>
  )
}
