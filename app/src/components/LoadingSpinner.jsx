import styled, { keyframes } from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15px;
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
  width: 15px;
  height: 15px;
  border: 5px solid #ccc;
  border-top-color: #008fff;
  border-radius: 50%;
  animation: ${rotate} 0.75s ease-in-out infinite;
`

export const LoadingSpinner = () => {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  )
}
