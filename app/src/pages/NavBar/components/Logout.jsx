import { useAuth0 } from '@auth0/auth0-react'
import { LogoutButton } from '../../../components/Nav'

export const Logout = () => {
  const { logout, isAuthenticated } = useAuth0()

  if (!isAuthenticated) return null

  return (
    <LogoutButton onClick={logout}>
      Logout
    </LogoutButton>
  )
}
