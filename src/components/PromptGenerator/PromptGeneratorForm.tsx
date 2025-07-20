'use client'

import { useState } from 'react'
import {
  ACTIONS_OPTIONS,
  ASPECT_RATIO_OPTIONS,
  ATMOSPHERE_OPTIONS,
  COLORS_OPTIONS,
  COMPOSITION_OPTIONS,
  EMOTIONS_OPTIONS,
  FormData,
  LIGHTING_OPTIONS,
  MATERIALS_OPTIONS,
  MODEL_OPTIONS,
  MOOD_OPTIONS,
  POV_OPTIONS,
  QUALITY_OPTIONS,
  SEASON_OPTIONS,
  SENSE_OPTIONS,
  SETTING_OPTIONS,
  STYLE_OPTIONS,
  TEXTURES_OPTIONS,
  TIME_OF_DAY_OPTIONS,
  VIBE_OPTIONS,
  WEATHER_OPTIONS
} from './FormData'
import FormField from './FormField'
import FormSection from './FormSection'
import NestedOptions from './NestedOptions'

interface PromptGeneratorFormProps {
  formData: FormData
  onFormDataChange: (field: string, value: string) => void
}

export default function PromptGeneratorForm({ formData, onFormDataChange }: PromptGeneratorFormProps) {
  // Group visibility states
  const [showLightingOptions, setShowLightingOptions] = useState(false)
  const [showPOVOptions, setShowPOVOptions] = useState(false)
  const [showCompositionOptions, setShowCompositionOptions] = useState(false)
  const [showAtmosphereOptions, setShowAtmosphereOptions] = useState(false)
  const [showEnvironmentOptions, setShowEnvironmentOptions] = useState(false)
  const [showSensoryOptions, setShowSensoryOptions] = useState(false)
  const [showActionOptions, setShowActionOptions] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    onFormDataChange(field, value)
    
    // Handle nested options visibility
    switch (field) {
      case 'lighting':
        setShowLightingOptions(value !== '')
        break
      case 'pov':
        setShowPOVOptions(value !== '')
        break
      case 'composition':
        setShowCompositionOptions(value !== '')
        break
      case 'atmosphere':
        setShowAtmosphereOptions(value !== '')
        break
      case 'weather':
        setShowEnvironmentOptions(value !== '')
        break
      case 'sense':
        setShowSensoryOptions(value !== '')
        break
      case 'actions':
        setShowActionOptions(value !== '')
        break
    }
  }

  return (
    <div style={{ marginBottom: '32px' }}>
      {/* Core Elements Group */}
      <FormSection title="Core Elements" icon="🎯" colorTheme="core">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '24px',
          marginBottom: '8px'
        }}>
          <FormField
            label="Subject"
            icon="🎯"
            type="text"
            value={formData.subject}
            onChange={(value) => handleInputChange('subject', value)}
            placeholder="e.g., a majestic dragon, cyberpunk city, portrait of a warrior"
            required
          />
          
          <FormField
            label="Style"
            icon="🎨"
            type="select"
            value={formData.style}
            onChange={(value) => handleInputChange('style', value)}
            options={STYLE_OPTIONS}
            placeholder="Select style..."
          />
          
          <FormField
            label="Setting/Environment"
            icon="🌍"
            type="select"
            value={formData.setting}
            onChange={(value) => handleInputChange('setting', value)}
            options={SETTING_OPTIONS}
            placeholder="Select setting..."
          />
        </div>
      </FormSection>

      {/* Visual & Technical Group */}
      <FormSection title="Visual & Technical" icon="📷" colorTheme="visual">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '24px',
          marginBottom: '8px'
        }}>
          <FormField
            label="Lighting"
            icon="💡"
            type="select"
            value={formData.lighting}
            onChange={(value) => handleInputChange('lighting', value)}
            options={LIGHTING_OPTIONS}
            placeholder="Select lighting..."
          />
          
          <FormField
            label="Point of View"
            icon="📷"
            type="select"
            value={formData.pov}
            onChange={(value) => handleInputChange('pov', value)}
            options={POV_OPTIONS}
            placeholder="Select POV..."
          />
          
          <FormField
            label="Composition"
            icon="🖼️"
            type="select"
            value={formData.composition}
            onChange={(value) => handleInputChange('composition', value)}
            options={COMPOSITION_OPTIONS}
            placeholder="Select composition..."
          />
          
          <FormField
            label="Aspect Ratio"
            icon="📐"
            type="select"
            value={formData.aspectRatio}
            onChange={(value) => handleInputChange('aspectRatio', value)}
            options={ASPECT_RATIO_OPTIONS}
          />
          
          <FormField
            label="Quality"
            icon="⭐"
            type="select"
            value={formData.quality}
            onChange={(value) => handleInputChange('quality', value)}
            options={QUALITY_OPTIONS}
          />
        </div>

        {/* Lighting Nested Options */}
        <NestedOptions
          title="Lighting Details"
          icon="💡"
          isVisible={showLightingOptions}
          onFieldChange={handleInputChange}
          colorTheme="visual"
          fields={[
            {
              label: "Light Intensity",
              fieldName: "lightIntensity",
              value: formData.lightIntensity,
              options: [
                { value: "soft", label: "Soft" },
                { value: "medium", label: "Medium" },
                { value: "bright", label: "Bright" },
                { value: "harsh", label: "Harsh" },
                { value: "subtle", label: "Subtle" }
              ]
            },
            {
              label: "Light Direction",
              fieldName: "lightDirection",
              value: formData.lightDirection,
              options: [
                { value: "front", label: "Front" },
                { value: "side", label: "Side" },
                { value: "back", label: "Back" },
                { value: "top", label: "Top" },
                { value: "bottom", label: "Bottom" },
                { value: "diagonal", label: "Diagonal" }
              ]
            },
            {
              label: "Light Color",
              fieldName: "lightColor",
              value: formData.lightColor,
              options: [
                { value: "warm", label: "Warm" },
                { value: "cool", label: "Cool" },
                { value: "neutral", label: "Neutral" },
                { value: "colored", label: "Colored" },
                { value: "mixed", label: "Mixed" }
              ]
            }
          ]}
        />

        {/* POV Nested Options */}
        <NestedOptions
          title="POV Details"
          icon="📷"
          isVisible={showPOVOptions}
          onFieldChange={handleInputChange}
          colorTheme="visual"
          fields={[
            {
              label: "Distance",
              fieldName: "povDistance",
              value: formData.povDistance,
              options: [
                { value: "extreme close", label: "Extreme Close" },
                { value: "close", label: "Close" },
                { value: "medium", label: "Medium" },
                { value: "far", label: "Far" },
                { value: "extreme far", label: "Extreme Far" }
              ]
            },
            {
              label: "Lens Type",
              fieldName: "povLensType",
              value: formData.povLensType,
              options: [
                { value: "wide angle", label: "Wide Angle" },
                { value: "normal", label: "Normal" },
                { value: "telephoto", label: "Telephoto" },
                { value: "fisheye", label: "Fisheye" },
                { value: "macro", label: "Macro" }
              ]
            }
          ]}
        />

        {/* Composition Nested Options */}
        <NestedOptions
          title="Composition Details"
          icon="🖼️"
          isVisible={showCompositionOptions}
          onFieldChange={handleInputChange}
          colorTheme="visual"
          fields={[
            {
              label: "Balance",
              fieldName: "compositionBalance",
              value: formData.compositionBalance,
              options: [
                { value: "symmetrical", label: "Symmetrical" },
                { value: "asymmetrical", label: "Asymmetrical" },
                { value: "radial", label: "Radial" },
                { value: "dynamic", label: "Dynamic" }
              ]
            },
            {
              label: "Depth",
              fieldName: "compositionDepth",
              value: formData.compositionDepth,
              options: [
                { value: "shallow", label: "Shallow" },
                { value: "medium", label: "Medium" },
                { value: "deep", label: "Deep" },
                { value: "infinite", label: "Infinite" }
              ]
            }
          ]}
        />
      </FormSection>

      {/* Atmosphere & Mood Group */}
      <FormSection title="Atmosphere & Mood" icon="🌟" colorTheme="atmosphere">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '24px',
          marginBottom: '8px'
        }}>
          <FormField
            label="Vibe/Energy"
            icon="⚡"
            type="select"
            value={formData.vibe}
            onChange={(value) => handleInputChange('vibe', value)}
            options={VIBE_OPTIONS}
            placeholder="Select vibe..."
          />
          
          <FormField
            label="Mood"
            icon="😊"
            type="select"
            value={formData.mood}
            onChange={(value) => handleInputChange('mood', value)}
            options={MOOD_OPTIONS}
            placeholder="Select mood..."
          />
          
          <FormField
            label="Atmosphere"
            icon="🌫️"
            type="select"
            value={formData.atmosphere}
            onChange={(value) => handleInputChange('atmosphere', value)}
            options={ATMOSPHERE_OPTIONS}
            placeholder="Select atmosphere..."
          />
          
          <FormField
            label="Emotions"
            icon="💭"
            type="select"
            value={formData.emotions}
            onChange={(value) => handleInputChange('emotions', value)}
            options={EMOTIONS_OPTIONS}
            placeholder="Select emotions..."
          />
        </div>

        {/* Atmosphere Nested Options */}
        <NestedOptions
          title="Atmosphere Details"
          icon="🌫️"
          isVisible={showAtmosphereOptions}
          onFieldChange={handleInputChange}
          colorTheme="atmosphere"
          fields={[
            {
              label: "Density",
              fieldName: "atmosphereDensity",
              value: formData.atmosphereDensity,
              options: [
                { value: "light", label: "Light" },
                { value: "medium", label: "Medium" },
                { value: "heavy", label: "Heavy" },
                { value: "dense", label: "Dense" }
              ]
            },
            {
              label: "Movement",
              fieldName: "atmosphereMovement",
              value: formData.atmosphereMovement,
              options: [
                { value: "still", label: "Still" },
                { value: "gentle", label: "Gentle" },
                { value: "swirling", label: "Swirling" },
                { value: "turbulent", label: "Turbulent" }
              ]
            }
          ]}
        />
      </FormSection>

      {/* Environment & Context Group */}
      <FormSection title="Environment & Context" icon="🌍" colorTheme="environment">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '24px',
          marginBottom: '8px'
        }}>
          <FormField
            label="Weather"
            icon="🌤️"
            type="select"
            value={formData.weather}
            onChange={(value) => handleInputChange('weather', value)}
            options={WEATHER_OPTIONS}
            placeholder="Select weather..."
          />
          
          <FormField
            label="Time of Day"
            icon="🕐"
            type="select"
            value={formData.timeOfDay}
            onChange={(value) => handleInputChange('timeOfDay', value)}
            options={TIME_OF_DAY_OPTIONS}
            placeholder="Select time..."
          />
          
          <FormField
            label="Season"
            icon="🌸"
            type="select"
            value={formData.season}
            onChange={(value) => handleInputChange('season', value)}
            options={SEASON_OPTIONS}
            placeholder="Select season..."
          />
        </div>

        {/* Environment Nested Options */}
        <NestedOptions
          title="Environment Details"
          icon="🌍"
          isVisible={showEnvironmentOptions}
          onFieldChange={handleInputChange}
          colorTheme="environment"
          fields={[
            {
              label: "Wind Speed",
              fieldName: "windSpeed",
              value: formData.windSpeed,
              options: [
                { value: "calm", label: "Calm" },
                { value: "light breeze", label: "Light Breeze" },
                { value: "moderate", label: "Moderate" },
                { value: "strong", label: "Strong" },
                { value: "stormy", label: "Stormy" }
              ]
            },
            {
              label: "Visibility",
              fieldName: "visibility",
              value: formData.visibility,
              options: [
                { value: "clear", label: "Clear" },
                { value: "hazy", label: "Hazy" },
                { value: "foggy", label: "Foggy" },
                { value: "limited", label: "Limited" },
                { value: "zero", label: "Zero" }
              ]
            }
          ]}
        />
      </FormSection>

      {/* Sensory & Material Group */}
      <FormSection title="Sensory & Material" icon="✋" colorTheme="sensory">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '24px',
          marginBottom: '8px'
        }}>
          <FormField
            label="Sensory Feeling"
            icon="✋"
            type="select"
            value={formData.sense}
            onChange={(value) => handleInputChange('sense', value)}
            options={SENSE_OPTIONS}
            placeholder="Select feeling..."
          />
          
          <FormField
            label="Color Palette"
            icon="🎨"
            type="select"
            value={formData.colors}
            onChange={(value) => handleInputChange('colors', value)}
            options={COLORS_OPTIONS}
            placeholder="Select colors..."
          />
          
          <FormField
            label="Textures"
            icon="🔲"
            type="select"
            value={formData.textures}
            onChange={(value) => handleInputChange('textures', value)}
            options={TEXTURES_OPTIONS}
            placeholder="Select textures..."
          />
          
          <FormField
            label="Materials"
            icon="🧱"
            type="select"
            value={formData.materials}
            onChange={(value) => handleInputChange('materials', value)}
            options={MATERIALS_OPTIONS}
            placeholder="Select materials..."
          />
        </div>

        {/* Sensory Nested Options */}
        <NestedOptions
          title="Sensory Details"
          icon="✋"
          isVisible={showSensoryOptions}
          onFieldChange={handleInputChange}
          colorTheme="sensory"
          fields={[
            {
              label: "Temperature",
              fieldName: "temperature",
              value: formData.temperature,
              options: [
                { value: "freezing", label: "Freezing" },
                { value: "cold", label: "Cold" },
                { value: "cool", label: "Cool" },
                { value: "warm", label: "Warm" },
                { value: "hot", label: "Hot" },
                { value: "scorching", label: "Scorching" }
              ]
            },
            {
              label: "Humidity",
              fieldName: "humidity",
              value: formData.humidity,
              options: [
                { value: "dry", label: "Dry" },
                { value: "arid", label: "Arid" },
                { value: "moderate", label: "Moderate" },
                { value: "humid", label: "Humid" },
                { value: "saturated", label: "Saturated" }
              ]
            }
          ]}
        />
      </FormSection>

      {/* Action & Details Group */}
      <FormSection title="Action & Details" icon="🏃" colorTheme="action">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '24px',
          marginBottom: '8px'
        }}>
          <FormField
            label="Actions/Movement"
            icon="🏃"
            type="select"
            value={formData.actions}
            onChange={(value) => handleInputChange('actions', value)}
            options={ACTIONS_OPTIONS}
            placeholder="Select actions..."
          />
          
          <FormField
            label="AI Model"
            icon="🤖"
            type="select"
            value={formData.model}
            onChange={(value) => handleInputChange('model', value)}
            options={MODEL_OPTIONS}
          />
        </div>

        {/* Action Nested Options */}
        <NestedOptions
          title="Action Details"
          icon="🏃"
          isVisible={showActionOptions}
          onFieldChange={handleInputChange}
          colorTheme="action"
          fields={[
            {
              label: "Speed",
              fieldName: "actionSpeed",
              value: formData.actionSpeed,
              options: [
                { value: "slow motion", label: "Slow Motion" },
                { value: "normal", label: "Normal" },
                { value: "fast", label: "Fast" },
                { value: "blurred", label: "Blurred" },
                { value: "frozen", label: "Frozen" }
              ]
            },
            {
              label: "Energy Level",
              fieldName: "energyLevel",
              value: formData.energyLevel,
              options: [
                { value: "relaxed", label: "Relaxed" },
                { value: "casual", label: "Casual" },
                { value: "energetic", label: "Energetic" },
                { value: "intense", label: "Intense" },
                { value: "explosive", label: "Explosive" }
              ]
            }
          ]}
        />
      </FormSection>

      {/* Additional Details */}
      <div style={{ marginBottom: '32px' }}>
        <FormField
          label="Additional Details"
          icon="📝"
          type="textarea"
          value={formData.additionalDetails}
          onChange={(value) => handleInputChange('additionalDetails', value)}
          placeholder="Add any additional details, mood, atmosphere, or specific elements you want in your image..."
          rows={4}
        />
      </div>

      {/* Specific Details */}
      <FormSection title="Specific Details & Elements" icon="🔍" isHighlighted colorTheme="details">
        <FormField
          label="Specific Details & Elements"
          icon="🔍"
          type="textarea"
          value={formData.details}
          onChange={(value) => handleInputChange('details', value)}
          placeholder="Add specific details like clothing, accessories, objects, architectural elements, nature features, or any other specific elements..."
          rows={4}
        />
      </FormSection>
    </div>
  )
} 