import { StyledButton } from '../../../components/StyledList'
import { getHash } from '../../../services/listService'
import { useAuth0 } from '@auth0/auth0-react'

const baseUrl = process.env.REACT_APP_CLIENT_ORIGIN_URL

export const ShareListButton = ({ listId }) => {
  const { getAccessTokenSilently } = useAuth0()
  const getData = async () => {
    const token = await getAccessTokenSilently()
    const data = await getHash({ listId, token })
    return data
  }

  const handleClick = async () => {
    const data = await getData()

    const { hash, invitationHash } = data
    const url = `${baseUrl}/add/${hash}/${invitationHash}`

    if (navigator.share) {
      navigator
        .share({
          text: 'Apuntate a esta lista de regalos!',
          url
        })
        .catch(error => {
          console.error('Something went wrong sharing the link', error)
        })
    }
  }

  return (
    <StyledButton onClick={handleClick}>Compartir</StyledButton>
  )
}
