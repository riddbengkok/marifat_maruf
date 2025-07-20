'use client';

import { AudioFormData } from '@/components/PromptGenerator/AudioFormData';
import AudioPromptGeneratorForm from '@/components/PromptGenerator/AudioPromptGeneratorForm';
import GenerateButton from '@/components/PromptGenerator/GenerateButton';
import Header from '@/components/PromptGenerator/Header';
import Instructions from '@/components/PromptGenerator/Instructions';
import LoadingSpinner from '@/components/PromptGenerator/LoadingSpinner';
import PromptDisplay from '@/components/PromptGenerator/PromptDisplay';
import StructuredData from '@/components/SEO/StructuredData';
import { useFormStorage } from '@/hooks/useFormStorage';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamic import for Sidebar with SSR disabled
const Sidebar = dynamic(() => import('@/components/Sidebar'), { ssr: false });

export default function AIAudioPromptGenerator() {
  const [mounted, setMounted] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [copied, setCopied] = useState(false);

  // Initial form data for audio prompts
  const initialFormData: AudioFormData = {
    // Core Elements
    subject: '',
    soundType: '',
    genre: '',
    mood: '',
    style: '',

    // Audio-Specific Parameters
    tempo: '',
    key: '',
    timeSignature: '',
    duration: '',
    audioQuality: 'high',

    // Nested Tempo Options
    tempoSpeed: '',
    tempoFeel: '',

    // Nested Key Options
    keyModality: '',
    keyComplexity: '',

    // Nested Style Options
    productionStyle: '',
    arrangementStyle: '',

    // Instrumentation & Sound
    instruments: '',
    vocals: '',
    effects: '',
    soundDesign: '',

    // Nested Instrumentation Options
    primaryInstruments: '',
    secondaryInstruments: '',
    percussionType: '',

    // Nested Effects Options
    reverbType: '',
    delayType: '',
    distortionType: '',

    // Nested Sound Design Options
    ambienceType: '',
    textureType: '',

    // Atmosphere & Emotion
    atmosphere: '',
    emotions: '',
    energy: '',
    intensity: '',

    // Nested Atmosphere Options
    atmosphereDensity: '',
    atmosphereMovement: '',

    // Nested Energy Options
    energyLevel: '',
    energyFlow: '',

    // Context & Setting
    setting: '',
    timeOfDay: '',
    season: '',
    location: '',

    // Nested Context Options
    environmentType: '',
    spatialDepth: '',

    // Sensory & Texture
    textures: '',
    colors: '',
    materials: '',
    sensations: '',

    // Nested Sensory Options
    temperature: '',
    humidity: '',

    // Dynamics & Movement
    dynamics: '',
    movement: '',
    rhythm: '',
    flow: '',

    // Nested Dynamics Options
    dynamicRange: '',
    dynamicContrast: '',

    // Nested Movement Options
    movementSpeed: '',
    movementDirection: '',

    // Additional Details
    additionalDetails: '',
    references: '',
    technicalNotes: '',

    // Technical
    model: 'suno', // Default to audio model
  };

  // Use the storage hook for form data persistence
  const { formData, updateFormData, resetFormData } =
    useFormStorage<AudioFormData>({
      key: 'ai-audio-prompt-form',
      initialData: initialFormData,
    });

  useEffect(() => {
    setMounted(true);
  }, []);

  const generatePrompt = () => {
    if (!formData.subject.trim()) {
      alert('Please enter a subject for your audio');
      return;
    }

    const parts: string[] = [];

    // Core Elements
    if (formData.subject) parts.push(formData.subject);
    if (formData.soundType) parts.push(`as ${formData.soundType}`);

    // Sound Type specific logic
    if (formData.soundType === 'sound effect') {
      // Sound Effect specific fields
      if (formData.genre) parts.push(`type: ${formData.genre}`);
      if (formData.effects) {
        let effectsDesc = formData.effects;
        if (formData.reverbType)
          effectsDesc += ` with ${formData.reverbType} reverb`;
        if (formData.delayType)
          effectsDesc += ` and ${formData.delayType} delay`;
        if (formData.distortionType)
          effectsDesc += ` and ${formData.distortionType} distortion`;
        parts.push(`effects: ${effectsDesc}`);
      }
      if (formData.soundDesign) {
        let soundDesc = formData.soundDesign;
        if (formData.textureType)
          soundDesc += ` and ${formData.textureType} texture`;
        parts.push(`sound design: ${soundDesc}`);
      }
      if (formData.atmosphere) {
        let atmosDesc = formData.atmosphere;
        if (formData.atmosphereDensity)
          atmosDesc += ` ${formData.atmosphereDensity}`;
        if (formData.atmosphereMovement)
          atmosDesc += ` with ${formData.atmosphereMovement} movement`;
        parts.push(`atmosphere: ${atmosDesc}`);
      }
      if (formData.emotions) parts.push(`emotions: ${formData.emotions}`);
      if (formData.energy) {
        let energyDesc = formData.energy;
        if (formData.energyLevel) energyDesc += ` ${formData.energyLevel}`;
        if (formData.energyFlow)
          energyDesc += ` with ${formData.energyFlow} flow`;
        parts.push(`energy: ${energyDesc}`);
      }
      if (formData.intensity) parts.push(`intensity: ${formData.intensity}`);
      if (formData.setting) {
        let settingDesc = formData.setting;
        if (formData.environmentType)
          settingDesc += ` ${formData.environmentType}`;
        if (formData.spatialDepth)
          settingDesc += ` with ${formData.spatialDepth} spatial depth`;
        parts.push(`setting: ${settingDesc}`);
      }
      if (formData.timeOfDay) parts.push(`time: ${formData.timeOfDay}`);
      if (formData.season) parts.push(`season: ${formData.season}`);
      if (formData.location) parts.push(`location: ${formData.location}`);
      if (formData.textures) parts.push(`textures: ${formData.textures}`);
      if (formData.colors) parts.push(`colors: ${formData.colors}`);
      if (formData.materials) parts.push(`materials: ${formData.materials}`);
      if (formData.sensations) {
        let senseDesc = formData.sensations;
        if (formData.temperature)
          senseDesc += ` ${formData.temperature} temperature`;
        if (formData.humidity)
          senseDesc += ` with ${formData.humidity} humidity`;
        parts.push(`sensations: ${senseDesc}`);
      }
      if (formData.dynamics) {
        let dynamicDesc = formData.dynamics;
        if (formData.dynamicRange)
          dynamicDesc += ` with ${formData.dynamicRange} range`;
        if (formData.dynamicContrast)
          dynamicDesc += ` and ${formData.dynamicContrast} contrast`;
        parts.push(`dynamics: ${dynamicDesc}`);
      }
      if (formData.movement) {
        let movementDesc = formData.movement;
        if (formData.movementSpeed)
          movementDesc += ` ${formData.movementSpeed}`;
        if (formData.movementDirection)
          movementDesc += ` ${formData.movementDirection}`;
        parts.push(`movement: ${movementDesc}`);
      }
      if (formData.flow) parts.push(`flow: ${formData.flow}`);
    } else if (formData.soundType === 'music') {
      // Music specific fields
      if (formData.genre) parts.push(`in ${formData.genre} genre`);
      if (formData.mood) parts.push(`with ${formData.mood} mood`);
      if (formData.style) parts.push(`in ${formData.style} style`);
      if (formData.tempo) {
        let tempoDesc = formData.tempo;
        if (formData.tempoSpeed) tempoDesc += ` ${formData.tempoSpeed}`;
        if (formData.tempoFeel) tempoDesc += ` with ${formData.tempoFeel} feel`;
        parts.push(`tempo: ${tempoDesc}`);
      }
      if (formData.key) {
        let keyDesc = formData.key;
        if (formData.keyModality) keyDesc += ` ${formData.keyModality}`;
        if (formData.keyComplexity)
          keyDesc += ` with ${formData.keyComplexity} complexity`;
        parts.push(`key: ${keyDesc}`);
      }
      if (formData.timeSignature)
        parts.push(`time signature: ${formData.timeSignature}`);
      if (formData.duration) parts.push(`duration: ${formData.duration}`);
      if (formData.audioQuality && formData.audioQuality !== 'high')
        parts.push(`${formData.audioQuality} quality`);
      if (formData.productionStyle)
        parts.push(`production style: ${formData.productionStyle}`);
      if (formData.arrangementStyle)
        parts.push(`arrangement style: ${formData.arrangementStyle}`);
      if (formData.instruments) {
        let instrumentDesc = formData.instruments;
        if (formData.primaryInstruments)
          instrumentDesc += ` with ${formData.primaryInstruments} as primary`;
        if (formData.secondaryInstruments)
          instrumentDesc += ` and ${formData.secondaryInstruments} as secondary`;
        if (formData.percussionType)
          instrumentDesc += ` with ${formData.percussionType} percussion`;
        parts.push(`instruments: ${instrumentDesc}`);
      }
      if (formData.vocals) parts.push(`vocals: ${formData.vocals}`);
      if (formData.effects) {
        let effectsDesc = formData.effects;
        if (formData.reverbType)
          effectsDesc += ` with ${formData.reverbType} reverb`;
        if (formData.delayType)
          effectsDesc += ` and ${formData.delayType} delay`;
        if (formData.distortionType)
          effectsDesc += ` and ${formData.distortionType} distortion`;
        parts.push(`effects: ${effectsDesc}`);
      }
      if (formData.soundDesign) {
        let soundDesc = formData.soundDesign;
        if (formData.textureType)
          soundDesc += ` and ${formData.textureType} texture`;
        parts.push(`sound design: ${soundDesc}`);
      }
      if (formData.atmosphere) {
        let atmosDesc = formData.atmosphere;
        if (formData.atmosphereDensity)
          atmosDesc += ` ${formData.atmosphereDensity}`;
        if (formData.atmosphereMovement)
          atmosDesc += ` with ${formData.atmosphereMovement} movement`;
        parts.push(`atmosphere: ${atmosDesc}`);
      }
      if (formData.emotions) parts.push(`emotions: ${formData.emotions}`);
      if (formData.energy) {
        let energyDesc = formData.energy;
        if (formData.energyLevel) energyDesc += ` ${formData.energyLevel}`;
        if (formData.energyFlow)
          energyDesc += ` with ${formData.energyFlow} flow`;
        parts.push(`energy: ${energyDesc}`);
      }
      if (formData.intensity) parts.push(`intensity: ${formData.intensity}`);
      if (formData.setting) {
        let settingDesc = formData.setting;
        if (formData.environmentType)
          settingDesc += ` ${formData.environmentType}`;
        if (formData.spatialDepth)
          settingDesc += ` with ${formData.spatialDepth} spatial depth`;
        parts.push(`setting: ${settingDesc}`);
      }
      if (formData.timeOfDay) parts.push(`time: ${formData.timeOfDay}`);
      if (formData.season) parts.push(`season: ${formData.season}`);
      if (formData.location) parts.push(`location: ${formData.location}`);
      if (formData.textures) parts.push(`textures: ${formData.textures}`);
      if (formData.colors) parts.push(`colors: ${formData.colors}`);
      if (formData.materials) parts.push(`materials: ${formData.materials}`);
      if (formData.sensations) {
        let senseDesc = formData.sensations;
        if (formData.temperature)
          senseDesc += ` ${formData.temperature} temperature`;
        if (formData.humidity)
          senseDesc += ` with ${formData.humidity} humidity`;
        parts.push(`sensations: ${senseDesc}`);
      }
      if (formData.dynamics) {
        let dynamicDesc = formData.dynamics;
        if (formData.dynamicRange)
          dynamicDesc += ` with ${formData.dynamicRange} range`;
        if (formData.dynamicContrast)
          dynamicDesc += ` and ${formData.dynamicContrast} contrast`;
        parts.push(`dynamics: ${dynamicDesc}`);
      }
      if (formData.movement) {
        let movementDesc = formData.movement;
        if (formData.movementSpeed)
          movementDesc += ` ${formData.movementSpeed}`;
        if (formData.movementDirection)
          movementDesc += ` ${formData.movementDirection}`;
        parts.push(`movement: ${movementDesc}`);
      }
      if (formData.rhythm) parts.push(`rhythm: ${formData.rhythm}`);
      if (formData.flow) parts.push(`flow: ${formData.flow}`);
    } else if (formData.soundType === 'ambience') {
      // Ambience specific fields
      if (formData.genre) parts.push(`ambience: ${formData.genre}`);
      if (formData.mood) parts.push(`with ${formData.mood}`);
      if (formData.style) parts.push(`and ${formData.style}`);
      if (formData.effects) {
        let effectsDesc = formData.effects;
        if (formData.reverbType)
          effectsDesc += ` with ${formData.reverbType} reverb`;
        if (formData.delayType)
          effectsDesc += ` and ${formData.delayType} delay`;
        if (formData.distortionType)
          effectsDesc += ` and ${formData.distortionType} distortion`;
        parts.push(`effects: ${effectsDesc}`);
      }
      if (formData.soundDesign) {
        let soundDesc = formData.soundDesign;
        if (formData.textureType)
          soundDesc += ` and ${formData.textureType} texture`;
        parts.push(`sound design: ${soundDesc}`);
      }
      if (formData.atmosphere) {
        let atmosDesc = formData.atmosphere;
        if (formData.atmosphereDensity)
          atmosDesc += ` ${formData.atmosphereDensity}`;
        if (formData.atmosphereMovement)
          atmosDesc += ` with ${formData.atmosphereMovement} movement`;
        parts.push(`atmosphere: ${atmosDesc}`);
      }
      if (formData.emotions) parts.push(`emotions: ${formData.emotions}`);
      if (formData.energy) {
        let energyDesc = formData.energy;
        if (formData.energyLevel) energyDesc += ` ${formData.energyLevel}`;
        if (formData.energyFlow)
          energyDesc += ` with ${formData.energyFlow} flow`;
        parts.push(`energy: ${energyDesc}`);
      }
      if (formData.intensity) parts.push(`intensity: ${formData.intensity}`);
      if (formData.setting) {
        let settingDesc = formData.setting;
        if (formData.environmentType)
          settingDesc += ` ${formData.environmentType}`;
        if (formData.spatialDepth)
          settingDesc += ` with ${formData.spatialDepth} spatial depth`;
        parts.push(`setting: ${settingDesc}`);
      }
      if (formData.timeOfDay) parts.push(`time: ${formData.timeOfDay}`);
      if (formData.season) parts.push(`season: ${formData.season}`);
      if (formData.location) parts.push(`location: ${formData.location}`);
      if (formData.textures) parts.push(`textures: ${formData.textures}`);
      if (formData.colors) parts.push(`colors: ${formData.colors}`);
      if (formData.materials) parts.push(`materials: ${formData.materials}`);
      if (formData.sensations) {
        let senseDesc = formData.sensations;
        if (formData.temperature)
          senseDesc += ` ${formData.temperature} temperature`;
        if (formData.humidity)
          senseDesc += ` with ${formData.humidity} humidity`;
        parts.push(`sensations: ${senseDesc}`);
      }
      if (formData.dynamics) {
        let dynamicDesc = formData.dynamics;
        if (formData.dynamicRange)
          dynamicDesc += ` with ${formData.dynamicRange} range`;
        if (formData.dynamicContrast)
          dynamicDesc += ` and ${formData.dynamicContrast} contrast`;
        parts.push(`dynamics: ${dynamicDesc}`);
      }
      if (formData.movement) {
        let movementDesc = formData.movement;
        if (formData.movementSpeed)
          movementDesc += ` ${formData.movementSpeed}`;
        if (formData.movementDirection)
          movementDesc += ` ${formData.movementDirection}`;
        parts.push(`movement: ${movementDesc}`);
      }
      if (formData.flow) parts.push(`flow: ${formData.flow}`);
    }

    // Additional Details (common for all types)
    if (formData.additionalDetails)
      parts.push(`additional: ${formData.additionalDetails}`);
    if (formData.references) parts.push(`references: ${formData.references}`);
    if (formData.technicalNotes)
      parts.push(`technical: ${formData.technicalNotes}`);

    // Technical
    if (formData.model && formData.model !== 'suno')
      parts.push(`model: ${formData.model}`);

    const finalPrompt = parts.join(', ');
    setGeneratedPrompt(finalPrompt);
    setShowPrompt(true);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const copyEnhancedPromptRequest = async () => {
    const enhancedRequest = `Please enhance this AI audio prompt to make it more detailed and professional: "${generatedPrompt}"`;
    try {
      await navigator.clipboard.writeText(enhancedRequest);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  if (!mounted) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#000',
          color: '#fff',
        }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <StructuredData
        type="audio-generator"
        title="AI Audio Prompt Generator - Create Professional Audio Prompts"
        description="Generate high-quality AI audio prompts with our advanced tool. Create musical, ambient, and sound design prompts for Suno, Udio, and other AI audio generators."
        url="https://hyperspace-next.vercel.app/ai-audio-prompt-generator"
      />

      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />

        <main
          style={{
            flex: 1,
            marginLeft: '256px',
            padding: '32px',
            backgroundColor: '#000',
            color: '#fff',
            minHeight: '100vh',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Header
              title="AI Audio Prompt Generator"
              subtitle="Create professional audio prompts for AI generators"
              icon="🎵"
            />

            <Instructions
              title="How to Use"
              steps={[
                'Enter your main subject or concept',
                'Select audio-specific parameters like tempo, key, and genre',
                'Choose instrumentation and sound design elements',
                'Add atmosphere and emotional details',
                'Generate your professional audio prompt',
                'Copy and use with AI audio generators like Suno, Udio, or Mubert',
              ]}
            />

            <AudioPromptGeneratorForm
              formData={formData}
              onFormDataChange={updateFormData}
            />

            <GenerateButton onClick={generatePrompt} onReset={resetFormData} />

            {showPrompt && (
              <div style={{ marginTop: '32px' }}>
                <PromptDisplay
                  prompt={generatedPrompt}
                  onCopy={copyToClipboard}
                  copied={copied}
                />

                {/* Tips Section */}
                <div
                  style={{
                    marginTop: '24px',
                    padding: '24px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      marginBottom: '16px',
                      color: '#00d4ff',
                    }}
                  >
                    💡 Tips for Better Results
                  </h3>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '24px',
                    }}
                  >
                    {/* ChatGPT Enhancement */}
                    <div>
                      <h4
                        style={{
                          fontSize: '16px',
                          fontWeight: 'semibold',
                          marginBottom: '12px',
                          color: '#fff',
                        }}
                      >
                        🤖 Enhance with ChatGPT
                      </h4>
                      <p
                        style={{
                          fontSize: '14px',
                          color: '#ccc',
                          marginBottom: '16px',
                          lineHeight: '1.5',
                        }}
                      >
                        Copy your prompt and ask ChatGPT to enhance it with more
                        details, musical terminology, and creative elements.
                      </p>
                      <button
                        onClick={copyEnhancedPromptRequest}
                        style={{
                          backgroundColor: 'rgba(0, 212, 255, 0.1)',
                          border: '1px solid rgba(0, 212, 255, 0.3)',
                          color: '#00d4ff',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          fontSize: '14px',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                        onMouseOver={e => {
                          e.currentTarget.style.backgroundColor =
                            'rgba(0, 212, 255, 0.2)';
                        }}
                        onMouseOut={e => {
                          e.currentTarget.style.backgroundColor =
                            'rgba(0, 212, 255, 0.1)';
                        }}
                      >
                        Copy Enhancement Request
                      </button>
                    </div>

                    {/* AI Audio Generators */}
                    <div>
                      <h4
                        style={{
                          fontSize: '16px',
                          fontWeight: 'semibold',
                          marginBottom: '12px',
                          color: '#fff',
                        }}
                      >
                        {formData.soundType === 'sound effect' &&
                          '🔊 AI Sound Effect Generators'}
                        {formData.soundType === 'music' &&
                          '🎵 AI Music Generators'}
                        {formData.soundType === 'ambience' &&
                          '🌲 AI Ambience Generators'}
                        {!formData.soundType &&
                          '🎵 Popular AI Audio Generators'}
                      </h4>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '8px',
                        }}
                      >
                        {/* Sound Effect Generators */}
                        {formData.soundType === 'sound effect' && (
                          <>
                            <a
                              href="https://elevenlabs.io"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#00d4ff',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                textDecoration: 'none',
                                textAlign: 'center',
                                transition: 'all 0.2s',
                              }}
                              onMouseOver={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.1)';
                              }}
                              onMouseOut={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.05)';
                              }}
                            >
                              ElevenLabs
                            </a>
                            <a
                              href="https://soundraw.io"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#00d4ff',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                textDecoration: 'none',
                                textAlign: 'center',
                                transition: 'all 0.2s',
                              }}
                              onMouseOver={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.1)';
                              }}
                              onMouseOut={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.05)';
                              }}
                            >
                              Soundraw
                            </a>
                            <a
                              href="https://freesound.org"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#00d4ff',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                textDecoration: 'none',
                                textAlign: 'center',
                                transition: 'all 0.2s',
                              }}
                              onMouseOver={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.1)';
                              }}
                              onMouseOut={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.05)';
                              }}
                            >
                              Freesound
                            </a>
                            <a
                              href="https://zapsplat.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#00d4ff',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                textDecoration: 'none',
                                textAlign: 'center',
                                transition: 'all 0.2s',
                              }}
                              onMouseOver={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.1)';
                              }}
                              onMouseOut={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.05)';
                              }}
                            >
                              Zapsplat
                            </a>
                            <a
                              href="https://mixkit.co"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#00d4ff',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                textDecoration: 'none',
                                textAlign: 'center',
                                transition: 'all 0.2s',
                              }}
                              onMouseOver={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.1)';
                              }}
                              onMouseOut={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.05)';
                              }}
                            >
                              Mixkit
                            </a>
                            <a
                              href="https://pixabay.com/sound-effects"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#00d4ff',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                textDecoration: 'none',
                                textAlign: 'center',
                                transition: 'all 0.2s',
                              }}
                              onMouseOver={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.1)';
                              }}
                              onMouseOut={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.05)';
                              }}
                            >
                              Pixabay
                            </a>
                          </>
                        )}

                        {/* Music Generators */}
                        {formData.soundType === 'music' && (
                          <>
                            <a
                              href="https://suno.ai"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#00d4ff',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                textDecoration: 'none',
                                textAlign: 'center',
                                transition: 'all 0.2s',
                              }}
                              onMouseOver={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.1)';
                              }}
                              onMouseOut={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.05)';
                              }}
                            >
                              Suno AI
                            </a>
                            <a
                              href="https://udio.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#00d4ff',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                textDecoration: 'none',
                                textAlign: 'center',
                                transition: 'all 0.2s',
                              }}
                              onMouseOver={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.1)';
                              }}
                              onMouseOut={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.05)';
                              }}
                            >
                              Udio
                            </a>
                            <a
                              href="https://mubert.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#00d4ff',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                textDecoration: 'none',
                                textAlign: 'center',
                                transition: 'all 0.2s',
                              }}
                              onMouseOver={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.1)';
                              }}
                              onMouseOut={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.05)';
                              }}
                            >
                              Mubert
                            </a>
                            <a
                              href="https://aiva.ai"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#00d4ff',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                textDecoration: 'none',
                                textAlign: 'center',
                                transition: 'all 0.2s',
                              }}
                              onMouseOver={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.1)';
                              }}
                              onMouseOut={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.05)';
                              }}
                            >
                              AIVA
                            </a>
                            <a
                              href="https://boomy.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#00d4ff',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                textDecoration: 'none',
                                textAlign: 'center',
                                transition: 'all 0.2s',
                              }}
                              onMouseOver={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.1)';
                              }}
                              onMouseOut={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.05)';
                              }}
                            >
                              Boomy
                            </a>
                            <a
                              href="https://soundraw.io"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#00d4ff',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                textDecoration: 'none',
                                textAlign: 'center',
                                transition: 'all 0.2s',
                              }}
                              onMouseOver={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.1)';
                              }}
                              onMouseOut={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.05)';
                              }}
                            >
                              Soundraw
                            </a>
                          </>
                        )}

                        {/* Ambience Generators */}
                        {formData.soundType === 'ambience' && (
                          <>
                            <a
                              href="https://ambient-mixer.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#00d4ff',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                textDecoration: 'none',
                                textAlign: 'center',
                                transition: 'all 0.2s',
                              }}
                              onMouseOver={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.1)';
                              }}
                              onMouseOut={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.05)';
                              }}
                            >
                              Ambient Mixer
                            </a>
                            <a
                              href="https://mynoise.net"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#00d4ff',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                textDecoration: 'none',
                                textAlign: 'center',
                                transition: 'all 0.2s',
                              }}
                              onMouseOver={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.1)';
                              }}
                              onMouseOut={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.05)';
                              }}
                            >
                              MyNoise
                            </a>
                            <a
                              href="https://noisli.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#00d4ff',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                textDecoration: 'none',
                                textAlign: 'center',
                                transition: 'all 0.2s',
                              }}
                              onMouseOver={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.1)';
                              }}
                              onMouseOut={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.05)';
                              }}
                            >
                              Noisli
                            </a>
                            <a
                              href="https://freesound.org"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#00d4ff',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                textDecoration: 'none',
                                textAlign: 'center',
                                transition: 'all 0.2s',
                              }}
                              onMouseOver={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.1)';
                              }}
                              onMouseOut={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.05)';
                              }}
                            >
                              Freesound
                            </a>
                            <a
                              href="https://soundraw.io"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#00d4ff',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                textDecoration: 'none',
                                textAlign: 'center',
                                transition: 'all 0.2s',
                              }}
                              onMouseOver={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.1)';
                              }}
                              onMouseOut={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.05)';
                              }}
                            >
                              Soundraw
                            </a>
                            <a
                              href="https://pixabay.com/sound-effects"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#00d4ff',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                textDecoration: 'none',
                                textAlign: 'center',
                                transition: 'all 0.2s',
                              }}
                              onMouseOver={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.1)';
                              }}
                              onMouseOut={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.05)';
                              }}
                            >
                              Pixabay
                            </a>
                          </>
                        )}

                        {/* Default/General Audio Generators */}
                        {!formData.soundType && (
                          <>
                            <a
                              href="https://suno.ai"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#00d4ff',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                textDecoration: 'none',
                                textAlign: 'center',
                                transition: 'all 0.2s',
                              }}
                              onMouseOver={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.1)';
                              }}
                              onMouseOut={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.05)';
                              }}
                            >
                              Suno AI
                            </a>
                            <a
                              href="https://udio.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#00d4ff',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                textDecoration: 'none',
                                textAlign: 'center',
                                transition: 'all 0.2s',
                              }}
                              onMouseOver={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.1)';
                              }}
                              onMouseOut={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.05)';
                              }}
                            >
                              Udio
                            </a>
                            <a
                              href="https://mubert.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#00d4ff',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                textDecoration: 'none',
                                textAlign: 'center',
                                transition: 'all 0.2s',
                              }}
                              onMouseOver={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.1)';
                              }}
                              onMouseOut={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.05)';
                              }}
                            >
                              Mubert
                            </a>
                            <a
                              href="https://soundraw.io"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#00d4ff',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                textDecoration: 'none',
                                textAlign: 'center',
                                transition: 'all 0.2s',
                              }}
                              onMouseOver={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.1)';
                              }}
                              onMouseOut={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.05)';
                              }}
                            >
                              Soundraw
                            </a>
                            <a
                              href="https://aiva.ai"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#00d4ff',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                textDecoration: 'none',
                                textAlign: 'center',
                                transition: 'all 0.2s',
                              }}
                              onMouseOver={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.1)';
                              }}
                              onMouseOut={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.05)';
                              }}
                            >
                              AIVA
                            </a>
                            <a
                              href="https://boomy.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#00d4ff',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                textDecoration: 'none',
                                textAlign: 'center',
                                transition: 'all 0.2s',
                              }}
                              onMouseOver={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.1)';
                              }}
                              onMouseOut={e => {
                                e.currentTarget.style.backgroundColor =
                                  'rgba(255, 255, 255, 0.05)';
                              }}
                            >
                              Boomy
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
