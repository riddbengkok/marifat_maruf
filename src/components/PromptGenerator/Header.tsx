'use client'


export default function Header() {
  return (
    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
      <h1 style={{ 
        fontSize: '48px', 
        fontWeight: 'bold', 
        margin: '0 0 16px 0',
        background: 'linear-gradient(45deg, #00ffff, #0066ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        AI Image Prompt Generator
      </h1>
      <p style={{ 
        fontSize: '20px', 
        color: '#cccccc', 
        maxWidth: '600px', 
        margin: '0 auto 32px auto' 
      }}>
        Create highly detailed and specific prompts for DALL·E, Midjourney, Stable Diffusion, and other AI image generation tools
      </p>
    </div>
  )
} 