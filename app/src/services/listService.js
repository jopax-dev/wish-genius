const baseUrl = process.env.REACT_APP_BASE_API_URL

export const getAllLists = async ({ token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = (await fetch(`${baseUrl}/lists/`, config))
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data)
    }
    return data
  } catch (error) {
    console.log(error.message)
  }
}

export const createList = async ({ token, listName }) => {
  const newList = {
    title: listName,
    userList: [],
    regalos: []
  }

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(newList)
  }
  try {
    const response = await fetch(`${baseUrl}/lists/`, config)
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data)
    }
    return data
  } catch (error) {
    console.log(error.message)
  }
}

export const getList = async ({ token, idList }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = (await fetch(`${baseUrl}/lists/${idList}`, config))
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data)
    }
    return data
  } catch (error) {
    console.log(error.message)
  }
}

export const getHash = async ({ listId, token }) => {
  const config = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = await fetch(`${baseUrl}/suscribe/${listId}`, config)
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data)
    }
    return data
  } catch (error) {
    console.log(error.message)
  }
}

export const suscribeToList = async ({ token, hash, invitationalHash }) => {
  const config = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = (await fetch(`${baseUrl}/suscribe/${hash}/${invitationalHash}`, config))
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data)
    }
    return data
  } catch (error) {
    console.log(error.message)
  }
}

export const deleteList = async ({ token, listId }) => {
  const config = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = (await fetch(`${baseUrl}/lists/${listId}`, config))

  if (!response.ok) {
    const error = new Error(response.message)
    error.status = response.status
    throw error
  }
  return {}
}
