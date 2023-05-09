import { Auth0Provider } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()

  const domain = process.env.REACT_APP_AUTH0_DOMAIN
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
  const redirectUri = process.env.REACT_APP_CLIENT_ORIGIN_URL
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || redirectUri)
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        audience,
        redirect_uri: redirectUri
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}
