import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { addGift } from '../../../services/giftService'
import { GiftForm, GiftFormBody, GiftInput, GiftCheckBoxWrapper } from '../../../components/StyledGifts'
import { FormButton, LabelForm } from '../../../components/FormContainer'

export const AddGiftForm = ({ listId, refreshState }) => {
  const [giftInput, setGiftInput] = useState('')
  const [giftPrice, setGiftPrice] = useState('')
  const [giftURL, setGiftURL] = useState('')
  const [toOther, setToOther] = useState(false)
  const { getAccessTokenSilently } = useAuth0()

  const handleCheckbox = (event) => {
    setToOther(event.target.checked)
  }

  const hadnleForm = async (event) => {
    event.preventDefault()

    const newGift = {
      price: parseFloat(giftPrice),
      url: giftURL,
      present: giftInput,
      listId,
      toOther
    }

    const token = await getAccessTokenSilently()
    await addGift({ newGift, token })

    setGiftInput('')
    setGiftPrice('')
    setGiftURL('')
    refreshState()
  }

  const handleProduct = (event) => setGiftInput(event.target.value)
  const handlePrice = (event) => setGiftPrice(event.target.value)
  const handleURL = (event) => setGiftURL(event.target.value)

  return (
    <GiftFormBody>
      <h5>Añade un nuevo regalo</h5>
      <GiftForm onSubmit={hadnleForm}>
        <GiftCheckBoxWrapper>
          <LabelForm htmlFor='forOther'>Regalo para otra persona</LabelForm>
          <input type='checkbox' onClick={handleCheckbox} name='forOther' id='forOther' />
        </GiftCheckBoxWrapper>
        <div>
          <LabelForm htmlFor='regalo'>Regalo</LabelForm>
          <GiftInput type='text' required id='regalo' name='regalo' onChange={handleProduct} value={giftInput} placeholder='Regalo' />
        </div>
        <div>
          <LabelForm htmlFor='precio'>Precio</LabelForm>
          <GiftInput type='number' required step='0.01' min='0.01' id='precio' name='precio' onChange={handlePrice} value={giftPrice} placeholder='9.99' />
        </div>
        <div>
          <LabelForm htmlFor='enlace'>Enlace</LabelForm>
          <GiftInput type='text' id='enlace' name='enlace' onChange={handleURL} value={giftURL} placeholder='http://www.amazon.es' />
        </div>
        <div>
          <FormButton type='submit'>Guardar</FormButton>
        </div>
      </GiftForm>
    </GiftFormBody>
  )
}
