'use client'

import { FormData } from '@/components/PromptGenerator/FormData'
import GenerateButton from '@/components/PromptGenerator/GenerateButton'
import Header from '@/components/PromptGenerator/Header'
import Instructions from '@/components/PromptGenerator/Instructions'
import LoadingSpinner from '@/components/PromptGenerator/LoadingSpinner'
import PromptDisplay from '@/components/PromptGenerator/PromptDisplay'
import PromptGeneratorForm from '@/components/PromptGenerator/PromptGeneratorForm'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// Dynamically import Sidebar to prevent SSR issues
const Sidebar = dynamic(() => import('@/components/Sidebar'), {
  ssr: false,
  loading: () => <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: '256px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(12px)',
    borderRight: '1px solid rgba(255, 255, 255, 0.2)',
    zIndex: 40
  }} />
})

export default function PromptGenerator() {
  const [mounted, setMounted] = useState(false)
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [copied, setCopied] = useState(false)

  // Form state with grouped parameters
  const [formData, setFormData] = useState<FormData>({
    // Core Elements
    subject: '',
    style: '',
    setting: '',
    
    // Visual & Technical
    lighting: '',
    pov: '',
    composition: '',
    aspectRatio: '1:1',
    quality: 'high',
    
    // Nested Lighting Options
    lightIntensity: '',
    lightDirection: '',
    lightColor: '',
    
    // Nested POV Options
    povDistance: '',
    povLensType: '',
    
    // Nested Composition Options
    compositionBalance: '',
    compositionDepth: '',
    
    // Atmosphere & Mood
    vibe: '',
    mood: '',
    atmosphere: '',
    emotions: '',
    
    // Nested Atmosphere Options
    atmosphereDensity: '',
    atmosphereMovement: '',
    
    // Environment & Context
    weather: '',
    timeOfDay: '',
    season: '',
    
    // Nested Environment Options
    windSpeed: '',
    visibility: '',
    
    // Sensory & Material
    sense: '',
    colors: '',
    textures: '',
    materials: '',
    
    // Nested Sensory Options
    temperature: '',
    humidity: '',
    
    // Action & Details
    actions: '',
    details: '',
    additionalDetails: '',
    
    // Nested Action Options
    actionSpeed: '',
    energyLevel: '',
    
    // Technical
    model: 'dalle'
  })

  useEffect(() => {
    console.log('Component mounted, setting mounted to true')
    setMounted(true)
  }, [])

  const handleFormDataChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const generatePrompt = () => {
    if (!formData.subject.trim()) {
      alert('Please enter a subject for your image')
      return
    }
    
    const parts: string[] = []
    
    // Core Elements
    if (formData.subject) parts.push(formData.subject)
    if (formData.style) parts.push(`in ${formData.style} style`)
    if (formData.setting) parts.push(`set in ${formData.setting}`)
    
    // Visual & Technical
    if (formData.lighting) {
      let lightingDesc = formData.lighting
      if (formData.lightIntensity) lightingDesc += ` ${formData.lightIntensity}`
      if (formData.lightDirection) lightingDesc += ` from ${formData.lightDirection}`
      if (formData.lightColor) lightingDesc += ` with ${formData.lightColor} tones`
      parts.push(`with ${lightingDesc} lighting`)
    }
    
    if (formData.pov) {
      let povDesc = formData.pov
      if (formData.povDistance) povDesc += ` ${formData.povDistance}`
      if (formData.povLensType) povDesc += ` using ${formData.povLensType} lens`
      parts.push(`shot from ${povDesc} perspective`)
    }
    
    if (formData.composition) {
      let compDesc = formData.composition
      if (formData.compositionBalance) compDesc += ` with ${formData.compositionBalance} balance`
      if (formData.compositionDepth) compDesc += ` and ${formData.compositionDepth} depth`
      parts.push(`with ${compDesc} composition`)
    }
    
    if (formData.aspectRatio && formData.aspectRatio !== '1:1') parts.push(`${formData.aspectRatio} aspect ratio`)
    if (formData.quality && formData.quality !== 'high') parts.push(`${formData.quality} quality`)
    
    // Atmosphere & Mood
    if (formData.vibe) parts.push(`with ${formData.vibe} vibe`)
    if (formData.mood) parts.push(`mood: ${formData.mood}`)
    if (formData.atmosphere) {
      let atmosDesc = formData.atmosphere
      if (formData.atmosphereDensity) atmosDesc += ` ${formData.atmosphereDensity}`
      if (formData.atmosphereMovement) atmosDesc += ` with ${formData.atmosphereMovement} movement`
      parts.push(`atmosphere: ${atmosDesc}`)
    }
    if (formData.emotions) parts.push(`emotions: ${formData.emotions}`)
    
    // Environment & Context
    if (formData.weather) {
      let weatherDesc = formData.weather
      if (formData.windSpeed) weatherDesc += ` with ${formData.windSpeed} wind`
      if (formData.visibility) weatherDesc += ` and ${formData.visibility} visibility`
      parts.push(`weather: ${weatherDesc}`)
    }
    if (formData.timeOfDay) parts.push(`time: ${formData.timeOfDay}`)
    if (formData.season) parts.push(`season: ${formData.season}`)
    
    // Sensory & Material
    if (formData.sense) {
      let senseDesc = formData.sense
      if (formData.temperature) senseDesc += ` ${formData.temperature} temperature`
      if (formData.humidity) senseDesc += ` with ${formData.humidity} humidity`
      parts.push(`sensory: ${senseDesc}`)
    }
    if (formData.colors) parts.push(`colors: ${formData.colors}`)
    if (formData.textures) parts.push(`textures: ${formData.textures}`)
    if (formData.materials) parts.push(`materials: ${formData.materials}`)
    
    // Action & Details
    if (formData.actions) {
      let actionDesc = formData.actions
      if (formData.actionSpeed) actionDesc += ` in ${formData.actionSpeed}`
      if (formData.energyLevel) actionDesc += ` with ${formData.energyLevel} energy`
      parts.push(`action: ${actionDesc}`)
    }
    if (formData.details) parts.push(`details: ${formData.details}`)
    if (formData.additionalDetails) parts.push(`additional: ${formData.additionalDetails}`)
    
    // Technical
    if (formData.model && formData.model !== 'dalle') parts.push(`optimized for ${formData.model}`)
    
    const prompt = parts.join(', ')
    setGeneratedPrompt(prompt)
    setCopied(false)
  }

  const copyToClipboard = async () => {
    if (generatedPrompt) {
      try {
        await navigator.clipboard.writeText(generatedPrompt)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy: ', err)
      }
    }
  }

  console.log('Rendering component, mounted:', mounted)

  // Show loading state during SSR
  if (!mounted) {
    console.log('Showing loading state')
    return <LoadingSpinner />
  }

  console.log('Showing main content')
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#000', 
      color: 'white'
    }}>
      <Sidebar />
      
      {/* Main Content */}
      <div style={{ 
        marginLeft: '256px', 
        padding: '24px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Header />
          
          <PromptGeneratorForm 
            formData={formData}
            onFormDataChange={handleFormDataChange}
          />

          <GenerateButton onClick={generatePrompt} />

          <PromptDisplay 
            prompt={generatedPrompt}
            copied={copied}
            onCopy={copyToClipboard}
          />

          <Instructions />
        </div>
      </div>
    </div>
  )
} 