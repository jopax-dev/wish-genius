import { Nav, NavButton, NavComponent } from '../../components/Nav'
import { Logout } from './components/Logout'
import { useLocation } from 'react-router-dom'

export const NavBar = () => {
  const { pathname } = useLocation()
  return (
    <NavComponent>
      <Nav>
        {pathname !== '/' && <NavButton to='/'>Volver al listado</NavButton>}
        <Logout />
      </Nav>
    </NavComponent>
  )
}
