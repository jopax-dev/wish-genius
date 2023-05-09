import { AddGiftForm } from './AddGiftForm'
import { GiftAlreadyPurchased } from './GiftAlreadyPurchased'
import { Gifts } from './Gifts'

export const GiftManager = ({ list, refreshState }) => {
  if (list.length === 0) return null

  const listInfo = {
    listId: list.id,
    numberUsers: Object.keys(list.userList).length,
    userList: list.userList
  }
  return (
    <>
      <AddGiftForm refreshState={refreshState} listId={list.id} />
      <Gifts refreshState={refreshState} listInfo={listInfo} giftsList={list.regalos} />
      <GiftAlreadyPurchased userList={list.userList} giftstList={list.regalos} />
    </>
  )
}
