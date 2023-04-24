import styled from 'styled-components'
import { theme } from './theme'

export const ListBody = styled.div`
padding: 0 10px;
display: flex;
flex-direction: column;
`
export const NameAndShare = styled.div`
display: flex;
padding: 30px 0 20px 0px;
justify-content: space-between;
align-items: center;
border-bottom: 1px solid ${theme.brightBorderColor};
& p {
  font-style: italic;
}
`
export const DeleteAndShare = styled.div`
display: flex;
flex-direction: row;
align-items: stretch;
`

export const StyledErrorModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
`

export const ErrorModalContent = styled.div`
  height: 50%;
  width: 50%;
  border: 1px solid ${theme.brightBorderColor};
  border-radius: 10px;
  box-shadow: 2px 2px 4px ${theme.boxShadowColor};
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${theme.bgSecondaryColor};
  background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e6a4b4' fill-opacity='0.33' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
  h3{
    color: ${theme.darkTextColor};
    text-shadow: 1px 1px 1px ${theme.thextSHadowBright};
  }
`

export const StyledButton = styled.button`
background-color: ${theme.bgTertiaryColor};
border: none;
padding: 10px 15px;
margin-right: 5px;
margin-left: 5px;
box-shadow: 2px 2px 2px ${theme.darkBoxShadow};
color: ${theme.darkTextColor};

&:hover{
  color: #222;
}
`
export const UserListContainer = styled.div`

`
export const UserListBody = styled.div`
border-bottom: 1px dotted ${theme.borderCcolor};
& div:nth-child(odd) {
  background-color: rgba(50,120,50, 0.2);
}
`

export const StyledUser = styled.div`
padding: 5px;
user-select: none;
`

export const PaymentDetail = styled.div`
display: none;
&.visible {
  display: block;
}
&.hidden {
  display: none;
}
`
export const ExpandInfo = styled.span`
margin-left: 5px;
font-size: 0.8em;
`
