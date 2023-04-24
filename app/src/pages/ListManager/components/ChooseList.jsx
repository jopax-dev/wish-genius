import { ListButton, ListSelector, ListsContainer } from '../../../components/StyledListManager'
import { useLists } from '../../../hooks/useLists'
import { setAllButonWidth } from '../../../utils'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const ChooseList = () => {
  const { allLists } = useLists()
  const isEmpty = Object.entries(allLists).length === 0
  const navigate = useNavigate()

  useEffect(() => {
    setAllButonWidth({ container: 'div' })
  }, [allLists])

  const handleClick = (listid) => {
    navigate(`/list/${listid}`)
  }

  return (
    <ListsContainer>
      {!isEmpty
        ? (
          <>
            <p>Estas son las listas en las que estas metido</p>
            <ListSelector>
              {allLists.map((list) => {
                const { title, id } = list
                return (
                  <ListButton key={id} onClick={() => handleClick(id)}>
                    {title}
                  </ListButton>
                )
              })}
            </ListSelector>
          </>
        )
        : <p>Aun no te has apuntado a ninguna lista &#x1F641;, crea la tuya e invita a tus amigos! <span>&#x1F467;&#x1F466;</span></p>}
    </ListsContainer>
  )
}
