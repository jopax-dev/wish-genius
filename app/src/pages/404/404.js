import { useEffect, useRef } from 'react'
import './404.css'

export const Error404 = () => {
  const canvasRef = useRef(null)
  const cols = Math.floor(window.innerWidth / 20) + 1
  const ypos = Array(cols).fill(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = (window.innerHeight - 4.1)
    }

    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#0f0'
      ctx.font = '15pt monospace'

      ypos.forEach((y, ind) => {
        const text = String.fromCharCode(Math.random() * 128)
        const x = ind * 20
        ctx.fillText(text, x, y)
        if (y > 100 + Math.random() * 10000) ypos[ind] = 0
        else ypos[ind] = y + 22
      })
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    const animationId = setInterval(drawMatrix, 50)

    return () => {
      clearInterval(animationId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [ypos])

  // return <canvas ref={canvasRef} style={{ background: '#000' }} />
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ fontSize: '17em', zIndex: '2', userSelect: 'none', color: 'rgba(0, 255, 0, 0.7)', fontFamily: 'monospace', animation: 'fade 5s ease-in-out infinite' }}>404</div>
      <canvas ref={canvasRef} style={{ background: '#000', position: 'absolute', top: 0, left: 0, zIndex: 0 }} />

    </div>
  )
}
