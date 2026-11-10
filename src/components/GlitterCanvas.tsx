import { useEffect, useRef } from 'react'

interface GlitterParticle {
  x: number
  y: number
  size: number
  opacity: number
  speedY: number
  speedX: number
  rotation: number
  rotationSpeed: number
  type: 'star' | 'spec' | 'sparkle' | 'glimmer' | 'bokeh'
  twinkleSpeed: number
  twinklePhase: number
  color: string
}

// Subtle, delicate champagne gold, soft bronze and warm ivory sparkle palette
const SUBTLE_GOLD_SHADES = [
  { r: 218, g: 180, b: 120 }, // Champagne gold
  { r: 235, g: 210, b: 160 }, // Pale warm silk gold
  { r: 196, g: 164, b: 108 }, // Signature liquid gold
  { r: 245, g: 230, b: 200 }, // Delicate pearl ivory
]

function drawFourPointStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerR: number, innerR: number, angle: number) {
  let rot = (Math.PI / 2) * 3 + angle
  let x = cx
  let y = cy
  const step = Math.PI / spikes

  ctx.beginPath()
  ctx.moveTo(cx, cy - outerR)
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerR
    y = cy + Math.sin(rot) * outerR
    ctx.lineTo(x, y)
    rot += step

    x = cx + Math.cos(rot) * innerR
    y = cy + Math.sin(rot) * innerR
    ctx.lineTo(x, y)
    rot += step
  }
  ctx.lineTo(cx, cy - outerR)
  ctx.closePath()
}

export default function GlitterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // Gentle particle count for an elegant, non-intrusive backdrop shimmer
    const particleCount = Math.min(85, Math.floor((width * height) / 16000))
    const particles: GlitterParticle[] = []

    for (let i = 0; i < particleCount; i++) {
      const shade = SUBTLE_GOLD_SHADES[Math.floor(Math.random() * SUBTLE_GOLD_SHADES.length)]
      const types: GlitterParticle['type'][] = ['star', 'sparkle', 'spec', 'glimmer', 'bokeh']
      const pType = types[Math.floor(Math.random() * types.length)]
      
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        // Dainty sizes so they don't overpower foreground text
        size: pType === 'bokeh' ? Math.random() * 4 + 3 : pType === 'star' || pType === 'sparkle' ? Math.random() * 2.8 + 1.2 : Math.random() * 1.5 + 0.8,
        // Soft, faded opacity (0.15 - 0.45)
        opacity: Math.random() * 0.3 + 0.15,
        speedY: (Math.random() * 0.18 + 0.04) * -1, // Gentle slow upward drift
        speedX: (Math.random() - 0.5) * 0.12,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        type: pType,
        twinkleSpeed: Math.random() * 0.02 + 0.008,
        twinklePhase: Math.random() * Math.PI * 2,
        color: `${shade.r}, ${shade.g}, ${shade.b}`,
      })
    }

    let time = 0

    const render = () => {
      time += 0.015
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        p.y += p.speedY
        p.x += p.speedX + Math.sin(time + p.twinklePhase) * 0.1
        p.rotation += p.rotationSpeed

        if (p.y < -30) {
          p.y = height + 20
          p.x = Math.random() * width
        }
        if (p.x < -30) p.x = width + 20
        if (p.x > width + 30) p.x = -20

        // Gentle sinusoidal twinkle
        const twinkle = (Math.sin(time * 2.5 * p.twinkleSpeed * 60 + p.twinklePhase) + 1) / 2
        // Subdued max alpha capped for faded background aesthetic
        const currentAlpha = Math.min(0.55, Math.max(0.06, p.opacity * (0.35 + 0.65 * twinkle)))

        ctx.save()

        if (p.type === 'star') {
          // Delicate 4-point gold star glitter
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate(p.rotation)
          
          ctx.shadowColor = `rgba(${p.color}, 0.5)`
          ctx.shadowBlur = p.size * 2

          ctx.fillStyle = `rgba(${p.color}, ${currentAlpha * 0.85})`
          drawFourPointStar(ctx, 0, 0, 4, p.size * 1.8, p.size * 0.4, 0)
          ctx.fill()

          ctx.restore()
        } else if (p.type === 'sparkle') {
          // Soft 8-point camera lens sparkle
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate(p.rotation)

          ctx.shadowColor = `rgba(${p.color}, 0.5)`
          ctx.shadowBlur = p.size * 2.5

          ctx.fillStyle = `rgba(${p.color}, ${currentAlpha * 0.75})`
          drawFourPointStar(ctx, 0, 0, 4, p.size * 2.0, p.size * 0.35, 0)
          ctx.fill()
          drawFourPointStar(ctx, 0, 0, 4, p.size * 1.2, p.size * 0.35, Math.PI / 4)
          ctx.fill()

          ctx.restore()
        } else if (p.type === 'bokeh') {
          // Soft out-of-focus golden ambient light orbs
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 1.6)
          grad.addColorStop(0, `rgba(${p.color}, ${currentAlpha * 0.5})`)
          grad.addColorStop(0.6, `rgba(${p.color}, ${currentAlpha * 0.15})`)
          grad.addColorStop(1, `rgba(${p.color}, 0)`)

          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 1.6, 0, Math.PI * 2)
          ctx.fill()
        } else {
          // Fine micro gold dust speckles
          ctx.shadowColor = `rgba(${p.color}, 0.4)`
          ctx.shadowBlur = p.size * 1.5
          ctx.fillStyle = `rgba(${p.color}, ${currentAlpha * 0.8})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        // Layered directly in the deep background behind all primary content
        zIndex: 0,
        overflow: 'hidden',
        opacity: 0.75, // Faded overall presentation
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  )
}
