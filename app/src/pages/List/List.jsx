import { useParams, useNavigate } from 'react-router-dom'
import { useLists } from '../../hooks/useLists'
import { useEffect } from 'react'
import { UsersInList } from './components/UsersInList'
import { ShareListButton } from './components/ShareListButton'
import { GiftManager } from './components/GiftManager'
import { PageLoader } from '../../components/PageLoader'
import { DeleteAndShare, ListBody, NameAndShare } from '../../components/StyledList'
import { DeleteListButton } from './components/DeleteListButton'

export const List = () => {
  const { idList } = useParams()
  const { setIdList, list, getNewData } = useLists()
  const navigate = useNavigate()

  useEffect(() => {
    setIdList(idList)
  }, [setIdList, idList, getNewData])

  function refreshState () {
    getNewData(state => !state)
  }

  if (!list) return navigate('/')
  return (
    <>
      <PageLoader />
      <ListBody>
        <NameAndShare>
          <p><b>Lista: {list.title}</b></p>
          <DeleteAndShare>
            <DeleteListButton listId={list.id} />
            <ShareListButton listId={list.id} />
          </DeleteAndShare>
        </NameAndShare>
        <UsersInList refreshState={refreshState} userList={list.userList} />
        <GiftManager refreshState={refreshState} list={list} />
      </ListBody>
    </>

  )
}
