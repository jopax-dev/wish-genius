import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import { createList } from '../../../services/listService'
import { FormButton, FormInput, LabelForm, ListFormContainer, StyledForm } from '../../../components/FormContainer'
import { LoadingSpinner } from '../../../components/LoadingSpinner'

export const CreateListForm = () => {
  const [listName, setListName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    setIsLoading(true)
    const token = await getAccessTokenSilently()
    const newList = await createList({ listName, token })
    setIsLoading(false)
    navigate(`/list/${newList}`)
  }

  const handleInput = (e) => setListName(e.target.value)

  return (
    <ListFormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <LabelForm htmlFor='newList'>Crea una nueva lista </LabelForm>
        <FormInput
          id='newList'
          name='newList'
          onChange={handleInput}
          value={listName}
          placeholder='Lista de cumpleaños'
        />
        <FormButton disabled={isLoading}>Crear lista</FormButton>
        {isLoading && <LoadingSpinner />}
      </StyledForm>
    </ListFormContainer>
  )
}
