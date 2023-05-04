import { EmptyGift, GiftContainer, GiftData, GiftItem, GiftName, GiftURL } from '../../../components/StyledGifts'
import { BotoneraRegalos } from './BotoneraRegalos'

const EmptyList = () => {
  return (
    <EmptyGift>
      <h2>La lista de regalos esta vacía o todos los regalos ya se han comprado</h2>
    </EmptyGift>
  )
}

export const Gifts = ({ gifstList, listInfo, refreshState }) => {
  if (gifstList.every(item => item === false)) return <EmptyList />
  console.log({ gifstList })
  return (
    <GiftContainer>
      {gifstList
        .filter(gift => !gift.comprado)
        .map((gift) => {
          const userName = listInfo.userList.find(user => user.user.uid === gift.uid)

          return (
            <GiftItem key={gift.id}>
              <div>{userName.user.name} quiere </div>
              <GiftData>
                <GiftName>{gift.nombre}</GiftName>
                {gift.url
                  ? <span><GiftURL href={gift.url} target='_blank' rel='noreferrer'>{gift.url}</GiftURL></span>
                  : null}
                <span>Precio: {gift.price}€</span>
                <BotoneraRegalos refreshState={refreshState} info={{ gift, listInfo }} applicant={gift.uid} buyer={gift.cid} />
              </GiftData>
            </GiftItem>
          )
        })}
    </GiftContainer>
  )
}
