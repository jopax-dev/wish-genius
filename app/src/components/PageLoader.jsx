import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  background-color: #d5f0d7;
  background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2386bba9' fill-opacity='0.24'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  justify-content: center;
  align-items: center;
  height: 100vh;
  z-index: 2 ;
`

const rotate = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  width: 100px;
  height: 100px;
  border: 10px solid #ccc;
  border-top-color: #008fff;
  border-radius: 50%;
  animation: ${rotate} 0.5s ease-in-out infinite;
`

export const PageLoader = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])
  return (
    loading
      ? (
        <Wrapper>
          <Spinner />
        </Wrapper>)
      : null
  )
}
