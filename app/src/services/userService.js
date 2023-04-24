const baseUrl = process.env.REACT_APP_BASE_API_URL

export const upsertUser = async ({ token }) => {
  const config = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = await fetch(`${baseUrl}/users/`, config)
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data)
    }
    return data
  } catch (error) {
    console.error(error.message)
  }
}

export const getUser = async ({ token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = await fetch(`${baseUrl}/users/`, config)
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data)
    }
    return data
  } catch (error) {
    console.error(error.message)
  }
}
