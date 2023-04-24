import { useAuth0 } from '@auth0/auth0-react'
import { ExpandInfo, PaymentDetail, StyledUser, UserListBody, UserListContainer } from '../../../components/StyledList'
import { useState } from 'react'

export const UsersInList = ({ userList }) => {
  const { user } = useAuth0()
  const [isPaymentDetailVisible, setIsPaymentDetailVisible] = useState(false)

  const handleUserClick = () => {
    setIsPaymentDetailVisible(!isPaymentDetailVisible)
  }

  const loggedUserId = user.sub.split('|')[1]
  const duplicatedNames = userList?.reduce((acc, obj, index, array) => {
    if (array.findIndex(el => el.user.name === obj.user.name) !== index && !acc.includes(obj.user.name)) {
      acc.push(obj.user.name)
    }
    return acc
  }, [])
  return (
    <UserListContainer>
      <h5>Usuarios en la lista</h5>
      <UserListBody>
        {
          userList?.map((user, key) => {
            const isDuplicated = duplicatedNames.includes(user.user?.name)
            return (
              <StyledUser onClick={handleUserClick} key={key}>
                {
                  isDuplicated
                    ? (
                      <span title={`Hay 2 o mas usuarios con el mismo nombre\nPara que te sea mas facil diferenciarlos, aqui tienes su correo\nEmail: ${user.user?.email}`}>
                        {user.user?.name}<sup>&bull;</sup>
                      </span>)
                    : (
                      <span>{user.user?.name}</span>
                    )
                }
                {
                  user.user.userId === loggedUserId &&
                    <>
                      {isPaymentDetailVisible
                        ? (<ExpandInfo>&#x2796;</ExpandInfo>)
                        : (<ExpandInfo>&#x2795;</ExpandInfo>)}

                      <PaymentDetail
                        className={
                          isPaymentDetailVisible
                            ? 'visible'
                            : 'hidden'
                        }
                      >
                        <p>Total pagado: {user.pagado}€</p>
                        {user.aPagar.length > 0 &&
                          <p>Le debo:</p>}
                        {user.aPagar.map((user, key) => (
                          <p key={key}>&#x27A1; A {user.usuarioAPagar.name} - {user.cantidadAPagar.toFixed(2)}€ </p>)
                        )}

                      </PaymentDetail>
                    </>
                }
              </StyledUser>
            )
          })
        }
      </UserListBody>
    </UserListContainer>
  )
}
