import { StyledButton } from '../../../components/StyledList'
import { useAuth0 } from '@auth0/auth0-react'
import { deleteList } from '../../../services/listService'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { LoadingSpinner } from '../../../components/LoadingSpinner'
import { ErrorModal } from './ErrorModal'

export const DeleteListButton = ({ listId }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setError] = useState(false)
  const { getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()

  const handleClick = async () => {
    try {
      setIsLoading(true)
      const token = await getAccessTokenSilently()
      await deleteList({ listId, token })
      setIsLoading(false)
      navigate('/')
    } catch (error) {
      if (error.status === 403) {
        setIsLoading(false)
        setError(true)
        setTimeout(() => {
          setError(false)
        }, 3000)
      }
    }
  }

  return (
    <>
      <StyledButton onClick={handleClick}>Eliminar la lista</StyledButton>
      {isLoading && <LoadingSpinner />}
      {isError && <ErrorModal />}
    </>
  )
}
