import { useAuth0 } from '@auth0/auth0-react'
import { upsertUser } from '../services/userService'
import { useEffect } from 'react'

export const useAuthAndUpsert = (callback) => {
  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    const fetchAndRedirect = async () => {
      const token = await getAccessTokenSilently()
      await upsertUser({ token })
      callback()
    }
    fetchAndRedirect()
  }, [getAccessTokenSilently, callback])
}
