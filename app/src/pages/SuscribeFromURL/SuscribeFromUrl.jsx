import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { suscribeToList } from '../../services/listService'
import { EmptyGift } from '../../components/StyledGifts'

export const SuscribeFromUrl = () => {
  const { hash, invitationalHash } = useParams()
  const { getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()

  useEffect(() => {
    const suscribe = async () => {
      const token = await getAccessTokenSilently()
      const suscribedList = await suscribeToList({ token, hash, invitationalHash })
      console.log(suscribedList)
      setTimeout(() => {
        navigate(`/list/${suscribedList}`)
      }, 2000)
    }
    suscribe()
  })

  return (
    <>
      <EmptyGift>
        <h2>Te has suscrito a la lista, en breve seras redirigido</h2>
      </EmptyGift>

    </>
  )
}
