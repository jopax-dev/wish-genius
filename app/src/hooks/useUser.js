import { useEffect, useState } from 'react'
import { getUser } from '../services/userService'
import { useAuth0 } from '@auth0/auth0-react'

export const useUser = () => {
  const { getAccessTokenSilently } = useAuth0()
  const [userId, setUserId] = useState()

  useEffect(() => {
    const fetchUserId = async () => {
      const token = await getAccessTokenSilently()
      setUserId(await getUser({ token }))
    }
    fetchUserId()
  }, [getAccessTokenSilently, setUserId])

  return userId
}
