'use client';

import { useState } from 'react';
import { ImageFormData, formOptions } from './FormData';
import FormField from './FormField';
import FormSection from './FormSection';
import NestedOptions from './NestedOptions';

interface ImagePromptGeneratorFormProps {
  formData: ImageFormData;
  onFormDataChange: (field: string, value: string) => void;
}

export default function ImagePromptGeneratorForm({
  formData,
  onFormDataChange,
}: ImagePromptGeneratorFormProps) {
  // Group visibility states
  const [showLightingOptions, setShowLightingOptions] = useState(false);
  const [showPOVOptions, setShowPOVOptions] = useState(false);
  const [showCompositionOptions, setShowCompositionOptions] = useState(false);
  const [showAtmosphereOptions, setShowAtmosphereOptions] = useState(false);
  const [showEnvironmentOptions, setShowEnvironmentOptions] = useState(false);
  const [showSensoryOptions, setShowSensoryOptions] = useState(false);
  const [showActionOptions, setShowActionOptions] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    onFormDataChange(field, value);

    // Handle nested options visibility
    switch (field) {
      case 'lighting':
        setShowLightingOptions(value !== '');
        break;
      case 'pov':
        setShowPOVOptions(value !== '');
        break;
      case 'composition':
        setShowCompositionOptions(value !== '');
        break;
      case 'atmosphere':
        setShowAtmosphereOptions(value !== '');
        break;
      case 'weather':
        setShowEnvironmentOptions(value !== '');
        break;
      case 'sense':
        setShowSensoryOptions(value !== '');
        break;
      case 'actions':
        setShowActionOptions(value !== '');
        break;
    }
  };

  return (
    <div style={{ marginBottom: '32px' }}>
      {/* Core Elements Group */}
      <FormSection title="Core Elements" icon="🎯">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '8px',
          }}
        >
          <FormField
            label="Subject"
            icon="🎯"
            type="text"
            value={formData.subject}
            onChange={value => handleInputChange('subject', value)}
            placeholder="e.g., a majestic dragon, cyberpunk city, portrait of a warrior"
            required
          />

          <FormField
            label="Style"
            icon="🎨"
            type="select"
            value={formData.style}
            onChange={value => handleInputChange('style', value)}
            options={formOptions.styles.map(style => ({
              value: style,
              label: style,
            }))}
            placeholder="Select style..."
          />

          <FormField
            label="Setting/Environment"
            icon="🌍"
            type="select"
            value={formData.setting}
            onChange={value => handleInputChange('setting', value)}
            options={formOptions.settings.map(setting => ({
              value: setting,
              label: setting,
            }))}
            placeholder="Select setting..."
          />
        </div>
      </FormSection>

      {/* Visual & Technical Group */}
      <FormSection title="Visual & Technical" icon="📷">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '8px',
          }}
        >
          <FormField
            label="Lighting"
            icon="💡"
            type="select"
            value={formData.lighting}
            onChange={value => handleInputChange('lighting', value)}
            options={formOptions.lighting.map(light => ({
              value: light,
              label: light,
            }))}
            placeholder="Select lighting..."
          />

          <FormField
            label="Point of View"
            icon="📷"
            type="select"
            value={formData.pov}
            onChange={value => handleInputChange('pov', value)}
            options={formOptions.pov.map(pov => ({ value: pov, label: pov }))}
            placeholder="Select POV..."
          />

          <FormField
            label="Composition"
            icon="🖼️"
            type="select"
            value={formData.composition}
            onChange={value => handleInputChange('composition', value)}
            options={formOptions.composition.map(comp => ({
              value: comp,
              label: comp,
            }))}
            placeholder="Select composition..."
          />

          <FormField
            label="Aspect Ratio"
            icon="📐"
            type="select"
            value={formData.aspectRatio}
            onChange={value => handleInputChange('aspectRatio', value)}
            options={formOptions.aspectRatios.map(ratio => ({
              value: ratio,
              label: ratio,
            }))}
          />

          <FormField
            label="Quality"
            icon="⭐"
            type="select"
            value={formData.quality}
            onChange={value => handleInputChange('quality', value)}
            options={formOptions.quality.map(qual => ({
              value: qual,
              label: qual,
            }))}
          />
        </div>

        {/* Lighting Nested Options */}
        <NestedOptions
          title="Lighting Details"
          icon="💡"
          isVisible={showLightingOptions}
          onFieldChange={handleInputChange}
          fields={[
            {
              label: 'Light Intensity',
              fieldName: 'lightIntensity',
              value: formData.lightIntensity,
              options: formOptions.lightIntensities.map(intensity => ({
                value: intensity,
                label: intensity,
              })),
            },
            {
              label: 'Light Direction',
              fieldName: 'lightDirection',
              value: formData.lightDirection,
              options: formOptions.lightDirections.map(direction => ({
                value: direction,
                label: direction,
              })),
            },
            {
              label: 'Light Color',
              fieldName: 'lightColor',
              value: formData.lightColor,
              options: formOptions.lightColors.map(color => ({
                value: color,
                label: color,
              })),
            },
          ]}
        />

        {/* POV Nested Options */}
        <NestedOptions
          title="Point of View Details"
          icon="📷"
          isVisible={showPOVOptions}
          onFieldChange={handleInputChange}
          fields={[
            {
              label: 'POV Distance',
              fieldName: 'povDistance',
              value: formData.povDistance,
              options: formOptions.povDistances.map(distance => ({
                value: distance,
                label: distance,
              })),
            },
            {
              label: 'Lens Type',
              fieldName: 'povLensType',
              value: formData.povLensType,
              options: formOptions.povLensTypes.map(lens => ({
                value: lens,
                label: lens,
              })),
            },
          ]}
        />

        {/* Composition Nested Options */}
        <NestedOptions
          title="Composition Details"
          icon="🖼️"
          isVisible={showCompositionOptions}
          onFieldChange={handleInputChange}
          fields={[
            {
              label: 'Composition Balance',
              fieldName: 'compositionBalance',
              value: formData.compositionBalance,
              options: formOptions.compositionBalances.map(balance => ({
                value: balance,
                label: balance,
              })),
            },
            {
              label: 'Composition Depth',
              fieldName: 'compositionDepth',
              value: formData.compositionDepth,
              options: formOptions.compositionDepths.map(depth => ({
                value: depth,
                label: depth,
              })),
            },
          ]}
        />
      </FormSection>

      {/* Atmosphere & Mood Group */}
      <FormSection title="Atmosphere & Mood" icon="🌫️">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '8px',
          }}
        >
          <FormField
            label="Vibe/Energy"
            icon="⚡"
            type="select"
            value={formData.vibe}
            onChange={value => handleInputChange('vibe', value)}
            options={formOptions.vibes.map(vibe => ({
              value: vibe,
              label: vibe,
            }))}
            placeholder="Select vibe..."
          />

          <FormField
            label="Mood"
            icon="😊"
            type="select"
            value={formData.mood}
            onChange={value => handleInputChange('mood', value)}
            options={formOptions.moods.map(mood => ({
              value: mood,
              label: mood,
            }))}
            placeholder="Select mood..."
          />

          <FormField
            label="Atmosphere"
            icon="🌫️"
            type="select"
            value={formData.atmosphere}
            onChange={value => handleInputChange('atmosphere', value)}
            options={formOptions.atmospheres.map(atmos => ({
              value: atmos,
              label: atmos,
            }))}
            placeholder="Select atmosphere..."
          />

          <FormField
            label="Emotions"
            icon="💭"
            type="select"
            value={formData.emotions}
            onChange={value => handleInputChange('emotions', value)}
            options={formOptions.emotions.map(emotion => ({
              value: emotion,
              label: emotion,
            }))}
            placeholder="Select emotions..."
          />
        </div>

        {/* Atmosphere Nested Options */}
        <NestedOptions
          title="Atmosphere Details"
          icon="🌫️"
          isVisible={showAtmosphereOptions}
          onFieldChange={handleInputChange}
          fields={[
            {
              label: 'Atmosphere Density',
              fieldName: 'atmosphereDensity',
              value: formData.atmosphereDensity,
              options: formOptions.atmosphereDensities.map(density => ({
                value: density,
                label: density,
              })),
            },
            {
              label: 'Atmosphere Movement',
              fieldName: 'atmosphereMovement',
              value: formData.atmosphereMovement,
              options: formOptions.atmosphereMovements.map(movement => ({
                value: movement,
                label: movement,
              })),
            },
          ]}
        />
      </FormSection>

      {/* Environment & Context Group */}
      <FormSection title="Environment & Context" icon="🌍">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '8px',
          }}
        >
          <FormField
            label="Weather"
            icon="🌤️"
            type="select"
            value={formData.weather}
            onChange={value => handleInputChange('weather', value)}
            options={formOptions.weather.map(weather => ({
              value: weather,
              label: weather,
            }))}
            placeholder="Select weather..."
          />

          <FormField
            label="Time of Day"
            icon="🕐"
            type="select"
            value={formData.timeOfDay}
            onChange={value => handleInputChange('timeOfDay', value)}
            options={formOptions.timeOfDay.map(time => ({
              value: time,
              label: time,
            }))}
            placeholder="Select time..."
          />

          <FormField
            label="Season"
            icon="🌸"
            type="select"
            value={formData.season}
            onChange={value => handleInputChange('season', value)}
            options={formOptions.seasons.map(season => ({
              value: season,
              label: season,
            }))}
            placeholder="Select season..."
          />
        </div>

        {/* Environment Nested Options */}
        <NestedOptions
          title="Environment Details"
          icon="🌍"
          isVisible={showEnvironmentOptions}
          onFieldChange={handleInputChange}
          fields={[
            {
              label: 'Wind Speed',
              fieldName: 'windSpeed',
              value: formData.windSpeed,
              options: formOptions.windSpeeds.map(wind => ({
                value: wind,
                label: wind,
              })),
            },
            {
              label: 'Visibility',
              fieldName: 'visibility',
              value: formData.visibility,
              options: formOptions.visibilities.map(visibility => ({
                value: visibility,
                label: visibility,
              })),
            },
          ]}
        />
      </FormSection>

      {/* Sensory & Material Group */}
      <FormSection title="Sensory & Material" icon="✋">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '8px',
          }}
        >
          <FormField
            label="Sensory Feeling"
            icon="✋"
            type="select"
            value={formData.sense}
            onChange={value => handleInputChange('sense', value)}
            options={formOptions.senses.map(sense => ({
              value: sense,
              label: sense,
            }))}
            placeholder="Select sensory feeling..."
          />

          <FormField
            label="Color Palette"
            icon="🎨"
            type="select"
            value={formData.colors}
            onChange={value => handleInputChange('colors', value)}
            options={formOptions.colors.map(color => ({
              value: color,
              label: color,
            }))}
            placeholder="Select colors..."
          />

          <FormField
            label="Textures"
            icon="🔲"
            type="select"
            value={formData.textures}
            onChange={value => handleInputChange('textures', value)}
            options={formOptions.textures.map(texture => ({
              value: texture,
              label: texture,
            }))}
            placeholder="Select textures..."
          />

          <FormField
            label="Materials"
            icon="🧱"
            type="select"
            value={formData.materials}
            onChange={value => handleInputChange('materials', value)}
            options={formOptions.materials.map(material => ({
              value: material,
              label: material,
            }))}
            placeholder="Select materials..."
          />
        </div>

        {/* Sensory Nested Options */}
        <NestedOptions
          title="Sensory Details"
          icon="✋"
          isVisible={showSensoryOptions}
          onFieldChange={handleInputChange}
          fields={[
            {
              label: 'Temperature',
              fieldName: 'temperature',
              value: formData.temperature,
              options: formOptions.temperatures.map(temp => ({
                value: temp,
                label: temp,
              })),
            },
            {
              label: 'Humidity',
              fieldName: 'humidity',
              value: formData.humidity,
              options: formOptions.humidities.map(humidity => ({
                value: humidity,
                label: humidity,
              })),
            },
          ]}
        />
      </FormSection>

      {/* Action & Details Group */}
      <FormSection title="Action & Details" icon="💭">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '8px',
          }}
        >
          <FormField
            label="Actions/Movement"
            icon="🏃"
            type="select"
            value={formData.actions}
            onChange={value => handleInputChange('actions', value)}
            options={formOptions.actions.map(action => ({
              value: action,
              label: action,
            }))}
            placeholder="Select actions..."
          />

          <FormField
            label="Details"
            icon="🔍"
            type="text"
            value={formData.details}
            onChange={value => handleInputChange('details', value)}
            placeholder="e.g., facial expressions, hand gestures, specific elements"
          />

          <FormField
            label="Additional Details"
            icon="✨"
            type="text"
            value={formData.additionalDetails}
            onChange={value => handleInputChange('additionalDetails', value)}
            placeholder="e.g., special effects, particles, lighting effects"
          />
        </div>

        {/* Action Nested Options */}
        <NestedOptions
          title="Action Details"
          icon="🏃"
          isVisible={showActionOptions}
          onFieldChange={handleInputChange}
          fields={[
            {
              label: 'Action Speed',
              fieldName: 'actionSpeed',
              value: formData.actionSpeed,
              options: formOptions.actionSpeeds.map(speed => ({
                value: speed,
                label: speed,
              })),
            },
            {
              label: 'Energy Level',
              fieldName: 'energyLevel',
              value: formData.energyLevel,
              options: formOptions.energyLevels.map(energy => ({
                value: energy,
                label: energy,
              })),
            },
          ]}
        />
      </FormSection>

      {/* Technical Group */}
      <FormSection title="Technical" icon="🤖">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          <FormField
            label="AI Model"
            icon="🤖"
            type="select"
            value={formData.model}
            onChange={value => handleInputChange('model', value)}
            options={[
              { value: 'dalle', label: 'DALL-E' },
              { value: 'midjourney', label: 'Midjourney' },
              { value: 'stable-diffusion', label: 'Stable Diffusion' },
              { value: 'firefly', label: 'Adobe Firefly' },
              { value: 'leonardo', label: 'Leonardo AI' },
            ]}
            placeholder="Select AI model..."
          />
        </div>
      </FormSection>
    </div>
  );
}
