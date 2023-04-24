export const setAllButonWidth = ({ container }) => {
  const ul = document.querySelector(container)
  if (!ul) return
  const buttons = ul.querySelectorAll('button')

  let maxWidth = 0
  buttons.forEach((button) => {
    const buttonWidth = button.offsetWidth
    if (buttonWidth > maxWidth) {
      maxWidth = buttonWidth
    }
  })

  buttons.forEach((button) => {
    button.style.width = maxWidth + 1 + 'px'
  })
}
