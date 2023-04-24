const baseUrl = process.env.REACT_APP_BASE_API_URL

export const addGift = async ({ newGift, token }) => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(newGift)
  }
  try {
    const response = await fetch(`${baseUrl}/regalos/`, config)

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data)
    }
    return data
  } catch (error) {
    console.log(error.message)
  }
}

export const assignGift = async ({ giftId, token }) => {
  const config = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = await fetch(`${baseUrl}/regalos/${giftId}`, config)

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data)
    }
    return data
  } catch (error) {
    console.log(error.message)
  }
}

export const buyGift = async ({ data, token }) => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  }
  try {
    const response = await fetch(`${baseUrl}/pagos/`, config)

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data)
    }
    return data
  } catch (error) {
    console.log(error.message)
  }
}

export const deleteGift = async ({ giftId, token }) => {
  const config = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = await fetch(`${baseUrl}/regalos/${giftId}`, config)

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data)
    }
    return data
  } catch (error) {
    console.log(error.message)
  }
}

export const buyAlone = async ({ giftId, token }) => {
  const config = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = await fetch(`${baseUrl}/pagos/${giftId}`, config)

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data)
    }
    return data
  } catch (error) {
    console.log(error.message)
  }
}
