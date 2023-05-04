import { assignGift, buyGift, deleteGift, buyAlone } from '../services/giftService'
import { useAuth0 } from '@auth0/auth0-react'

export const useGifts = () => {
  const { getAccessTokenSilently } = useAuth0()

  const assign = async ({ giftId }) => {
    const token = await getAccessTokenSilently()
    await assignGift({ giftId, token })
  }

  const remove = async ({ giftId }) => {
    const token = await getAccessTokenSilently()
    await deleteGift({ giftId, token })
  }

  const purchased = async ({ info }) => {
    const { gift, listInfo } = info
    const { listId: list, numberUsers } = listInfo
    const { price, uid, id } = gift
    const applicant = uid
    const splitBy = gift.toOther ? numberUsers : numberUsers - 1
    const toPay = price / (splitBy)
    const paid = price
    const giftId = id
    const data = { giftId, list, paid, applicant, toPay }
    const token = await getAccessTokenSilently()

    await buyGift({ data, token })
  }

  const purchasedAlone = async ({ giftId }) => {
    const token = await getAccessTokenSilently()
    await buyAlone({ giftId, token })
  }

  return {
    assign,
    remove,
    purchased,
    purchasedAlone
  }
}
