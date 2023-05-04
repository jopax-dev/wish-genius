import styled from 'styled-components'
import { theme } from './theme'

export const GiftFormBody = styled.div`
display: flex;
flex-direction: column;
border-bottom: 1px dotted ${theme.borderCcolor};
padding-bottom: 20px;
margin-bottom: 10px;
`

export const GiftForm = styled.form`
display: grid;
grid-auto-rows: 5rem;
gap: 1rem;
grid-template-columns: repeat(auto-fit, minmax(33%, 1fr));
grid-auto-flow: dense;
justify-items: center;
align-items: center;
margin-left: 5px;
div{
  width: 100%;
  margin-right: 5px;
}
div:last-child{
  grid-column-end: 3;
}
div:last-child button{
  margin-top: 1rem;
  width: 100%;
}
`
export const GiftInput = styled.input`
padding: 10px 0px;
border-radius: 5px;
border: 1px solid ${theme.borderCcolor};
display: flex;
text-align: center;
width: 100%;
`

export const GiftContainer = styled.div`
 border-bottom: 1px solid black;
 padding-bottom: 10px;
 & > :nth-child(odd) {
  background-color: rgba(50,120,50, 0.2);
}
`
export const GiftItem = styled.div`
  align-items: center;
  padding: 5px 2px;
`
export const GiftName = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const GiftURL = styled.a`
  display: block;
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis;
  max-width: 250px;
`

export const GiftData = styled.div`
  display: grid;
  overflow: hidden;
  gap: 1rem;
  grid-template-columns: minmax(50px, 2fr) minmax(50px, 2fr) minmax(50px, 100px) minmax(100px, 1fr);
  text-align: center;
  align-items: center;
  width: 100%;
  span{
    width: 100%;
  }
  span:last-child{
    text-align: right;
    margin-right: 5px;
    padding: 5px 0px;
  }
`

export const ButtonPanel = styled.button`
background-color: ${theme.bgTertiaryColor};
border: none;
width: 95%;
padding: 10px 0px;
box-shadow: 2px 2px 2px ${theme.darkBoxShadow};
color: ${theme.darkTextColor};
margin-right: 5px;
margin-bottom: 5px;

&:hover{
  color: #222;
}
`

export const AlreadyBought = styled.span`
  padding: 10px 0px;
  margin-right: 5px;
`

export const GiftCheckBoxWrapper = styled.div`
grid-column: 1 / -1;

input{
  transform: scale(1.5);
  margin: 0px 10px;
}
`

export const BoughtGift = styled.p`
  background-color: rgba(50,120,50, 0.2);
  padding: 5px 0px;
`
export const EmptyGift = styled.div`
  text-align: center;
`
