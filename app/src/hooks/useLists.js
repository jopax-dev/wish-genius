import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { getAllLists, getList } from '../services/listService'

export const useLists = () => {
  const [allLists, setAllLists] = useState([])
  const [list, setList] = useState([])
  const [idList, setIdList] = useState(null)
  const { getAccessTokenSilently } = useAuth0()
  const [newData, getNewData] = useState(false)

  useEffect(() => {
    const getLists = async () => {
      const token = await getAccessTokenSilently()
      const lists = await getAllLists({ token })
      setAllLists(lists)
    }

    getLists()
  }, [getAccessTokenSilently])

  useEffect(() => {
    const getNewLists = async () => {
      const token = await getAccessTokenSilently()
      const lists = await getList({ idList, token })
      setList(lists)
    }
    if (idList) getNewLists()
  }, [getAccessTokenSilently, idList, newData])

  return { allLists, setIdList, list, getNewData }
}
