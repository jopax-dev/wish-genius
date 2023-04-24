import styled from 'styled-components'
import { theme } from './theme'

export const ListFormContainer = styled.div`
margin-top: 25px;
padding-bottom: 10px;
text-align: center;
border-bottom: 1px dotted #555;
`

export const StyledForm = styled.form`
display: flex;
flex-wrap: wrap;
justify-content: space-around;
align-content: center;
align-items: center;
gap: 1em;
`

export const FormButton = styled.button`
background-color: ${theme.bgTertiaryColor};
border: none;
padding: 10px 10px;
box-shadow: 2px 2px 2px ${theme.darkBoxShadow};
color: ${theme.darkTextColor};
margin-right: 5px;

&:hover{
  color: #222;
}
`

export const FormInput = styled.input`
padding: 10px;
border-radius: 5px;
border: 1px solid ${theme.borderCcolor};
display: flex;
text-align: center;
`

export const LabelForm = styled.label`
font-style: italic;
font-weight: 600;
`
