import { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { PageLoader } from './components/PageLoader'
import { Container } from './components/Container'
import { useAuthAndUpsert } from './hooks/useAuthAndUpsert'
import { Error404 } from './pages/404/404'
import { NavBar } from './pages/NavBar/NavBar'
import { ListManager } from './pages/ListManager/ListManager'
import { List } from './pages/List/List'
import { SuscribeFromUrl } from './pages/SuscribeFromURL/SuscribeFromUrl'

function App () {
  const [isReady, setIsReady] = useState(false)
  useAuthAndUpsert(() => setIsReady(true))

  if (!isReady) {
    return <PageLoader />
  }
  return (
    <>
      <NavBar />
      <Container>
        <Routes>
          <Route path='/' element={<ListManager />} />
          <Route path='/list/:idList' element={<List />} />
          <Route path='/add/:hash/:invitationalHash' element={<SuscribeFromUrl />} />

          <Route path='/404' element={<Error404 />} />
          <Route path='*' element={<Navigate to='/404' replace />} />
        </Routes>
      </Container>
    </>
  )
}

export default withAuthenticationRequired(App)
