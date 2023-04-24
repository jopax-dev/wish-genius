import styled from 'styled-components'
import { theme } from './theme'

export const ListsContainer = styled.div`
  text-align: center;
  & p {
    font-weight: bold;
    & span {
      font-size: 35px;
    }
  }
`

export const ListSelector = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 1em;
  margin: 0px 5px;
`
export const ListButton = styled.button`
  color: ${theme.darkTextColor};
  text-shadow: 1px 1px 1px ${theme.thextSHadowBright};
  padding: 10px 5px;
  margin: 5px; 
  box-shadow: 2px 1px 4px; 
  background-color: #c1e1c5;
  box-shadow: 2px 2px 3px ${theme.primaryShadowColor} ;
  border: none;
  transition: all 0.2s ease-in-out;
  
  &:hover{
    box-shadow: 4px 4px 6px ${theme.primaryShadowColor};
    transform: translate(-1px, -1px);
    color: #444;
    text-shadow: 1px 1px 1px #6e7d6d;
  }
`
