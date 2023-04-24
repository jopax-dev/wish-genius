import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { theme } from './theme'

const navBarButtons = `
  text-decoration: none;
  background-color: #ffbed1;
  text-align: center;
  padding: 5px 15px;
  box-shadow: 2px 2px 4px ${theme.boxShadowColor};
  font-size: 16px;
  color: white;
  text-shadow: 1px 1px 1px ${theme.textShadowDark};
  transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
  cursor: pointer;
  &:hover{
    background-color: rgba(255,166,200,0.7);
  }
  `

export const NavComponent = styled.header`
  padding: 20px 0px;
  background-color: ${theme.bgSecondaryColor};
  background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e6a4b4' fill-opacity='0.33' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
  background-size: 5px;
  box-shadow: 1px 1px 5px ${theme.boxShadowColor};
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100%;
  top: 0px;
  z-index: 3;
`

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: ${theme.maxContentWidth};
`

export const NavButton = styled(NavLink)`
  ${navBarButtons};
  margin-left: 10px;

  &:hover{
    box-shadow: 4px 4px 6px ${theme.boxShadowColor};
    transform: translate(-1px, -1px);
    text-shadow: 1px 1px 1px ${theme.textShadowDark};
  }
`

export const LogoutButton = styled.button`
  ${navBarButtons};
  margin-right: 15px;
  margin-left: 10px;

  border: none;
  &:hover{
    box-shadow: 4px 4px 6px ${theme.boxShadowColor};
    transform: translate(-1px, -1px);
    text-shadow: 1px 1px 1px ${theme.textShadowDark};
  }
`
