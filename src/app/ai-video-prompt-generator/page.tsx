'use client';

import { FormData } from '@/components/PromptGenerator/FormData';
import GenerateButton from '@/components/PromptGenerator/GenerateButton';
import Header from '@/components/PromptGenerator/Header';
import Instructions from '@/components/PromptGenerator/Instructions';
import LoadingSpinner from '@/components/PromptGenerator/LoadingSpinner';
import PromptDisplay from '@/components/PromptGenerator/PromptDisplay';
import PromptGeneratorForm from '@/components/PromptGenerator/PromptGeneratorForm';
import StructuredData from '@/components/SEO/StructuredData';
import { useFormStorage } from '@/hooks/useFormStorage';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamic import for Sidebar with SSR disabled
const Sidebar = dynamic(() => import('@/components/Sidebar'), { ssr: false });

export default function AIVideoPromptGenerator() {
  const [mounted, setMounted] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [copied, setCopied] = useState(false);

  // Initial form data for video prompts
  const initialFormData: FormData = {
    // Core Elements
    subject: '',
    style: '',
    setting: '',

    // Visual & Technical
    lighting: '',
    pov: '',
    composition: '',
    aspectRatio: '16:9', // Default to video aspect ratio
    quality: 'high',

    // Video-Specific Parameters
    cameraMovement: '',
    videoDuration: '',
    frameRate: '',
    videoStyle: '',
    transition: '',

    // Nested Camera Movement Options
    movementSpeed: '',
    movementDirection: '',

    // Nested Video Style Options
    cinematicStyle: '',
    animationStyle: '',

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
    model: 'runway', // Default to video model
  };

  // Use the storage hook for form data persistence
  const { formData, updateFormData, resetFormData } = useFormStorage<FormData>({
    key: 'ai-video-prompt-form',
    initialData: initialFormData,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const generatePrompt = () => {
    if (!formData.subject.trim()) {
      alert('Please enter a subject for your video');
      return;
    }

    const parts: string[] = [];

    // Core Elements
    if (formData.subject) parts.push(formData.subject);
    if (formData.style) parts.push(`in ${formData.style} style`);
    if (formData.setting) parts.push(`set in ${formData.setting}`);

    // Video-Specific Parameters
    if (formData.cameraMovement) {
      let movementDesc = formData.cameraMovement;
      if (formData.movementSpeed) movementDesc += ` ${formData.movementSpeed}`;
      if (formData.movementDirection)
        movementDesc += ` ${formData.movementDirection}`;
      parts.push(`camera: ${movementDesc}`);
    }

    if (formData.videoDuration)
      parts.push(`duration: ${formData.videoDuration}`);
    if (formData.frameRate) parts.push(`frame rate: ${formData.frameRate}`);
    if (formData.videoStyle) parts.push(`video style: ${formData.videoStyle}`);
    if (formData.transition) parts.push(`transition: ${formData.transition}`);

    // Video Style Nested Options
    if (formData.cinematicStyle)
      parts.push(`cinematic style: ${formData.cinematicStyle}`);
    if (formData.animationStyle)
      parts.push(`animation style: ${formData.animationStyle}`);

    // Visual & Technical
    if (formData.lighting) {
      let lightingDesc = formData.lighting;
      if (formData.lightIntensity)
        lightingDesc += ` ${formData.lightIntensity}`;
      if (formData.lightDirection)
        lightingDesc += ` from ${formData.lightDirection}`;
      if (formData.lightColor)
        lightingDesc += ` with ${formData.lightColor} tones`;
      parts.push(`with ${lightingDesc} lighting`);
    }

    if (formData.pov) {
      let povDesc = formData.pov;
      if (formData.povDistance) povDesc += ` ${formData.povDistance}`;
      if (formData.povLensType)
        povDesc += ` using ${formData.povLensType} lens`;
      parts.push(`shot from ${povDesc} perspective`);
    }

    if (formData.composition) {
      let compDesc = formData.composition;
      if (formData.compositionBalance)
        compDesc += ` with ${formData.compositionBalance} balance`;
      if (formData.compositionDepth)
        compDesc += ` and ${formData.compositionDepth} depth`;
      parts.push(`with ${compDesc} composition`);
    }

    if (formData.aspectRatio && formData.aspectRatio !== '16:9')
      parts.push(`${formData.aspectRatio} aspect ratio`);
    if (formData.quality && formData.quality !== 'high')
      parts.push(`${formData.quality} quality`);

    // Atmosphere & Mood
    if (formData.vibe) parts.push(`with ${formData.vibe} vibe`);
    if (formData.mood) parts.push(`mood: ${formData.mood}`);
    if (formData.atmosphere) {
      let atmosDesc = formData.atmosphere;
      if (formData.atmosphereDensity)
        atmosDesc += ` ${formData.atmosphereDensity}`;
      if (formData.atmosphereMovement)
        atmosDesc += ` with ${formData.atmosphereMovement} movement`;
      parts.push(`atmosphere: ${atmosDesc}`);
    }
    if (formData.emotions) parts.push(`emotions: ${formData.emotions}`);

    // Environment & Context
    if (formData.weather) {
      let weatherDesc = formData.weather;
      if (formData.windSpeed) weatherDesc += ` with ${formData.windSpeed} wind`;
      if (formData.visibility)
        weatherDesc += ` and ${formData.visibility} visibility`;
      parts.push(`weather: ${weatherDesc}`);
    }
    if (formData.timeOfDay) parts.push(`time: ${formData.timeOfDay}`);
    if (formData.season) parts.push(`season: ${formData.season}`);

    // Sensory & Material
    if (formData.sense) {
      let senseDesc = formData.sense;
      if (formData.temperature)
        senseDesc += ` ${formData.temperature} temperature`;
      if (formData.humidity) senseDesc += ` with ${formData.humidity} humidity`;
      parts.push(`sensory: ${senseDesc}`);
    }
    if (formData.colors) parts.push(`colors: ${formData.colors}`);
    if (formData.textures) parts.push(`textures: ${formData.textures}`);
    if (formData.materials) parts.push(`materials: ${formData.materials}`);

    // Action & Details
    if (formData.actions) {
      let actionDesc = formData.actions;
      if (formData.actionSpeed) actionDesc += ` ${formData.actionSpeed}`;
      if (formData.energyLevel) actionDesc += ` with ${formData.energyLevel}`;
      parts.push(`action: ${actionDesc}`);
    }
    if (formData.details) parts.push(`details: ${formData.details}`);
    if (formData.additionalDetails)
      parts.push(`additional: ${formData.additionalDetails}`);

    // Technical
    if (formData.model && formData.model !== 'runway')
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
    const enhancedRequest = `Please enhance this AI video prompt to make it more detailed and professional: "${generatedPrompt}"`;
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
        type="video-generator"
        title="AI Video Prompt Generator - Create Professional Video Prompts"
        description="Generate high-quality AI video prompts with our advanced tool. Create cinematic, commercial, and artistic video prompts for Runway, Pika Labs, Sora, and other AI video generators."
        url="https://hyperspace-next.vercel.app/ai-video-prompt-generator"
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
              title="AI Video Prompt Generator"
              subtitle="Create professional video prompts for AI generators"
              icon="🎬"
            />

            <Instructions
              title="How to Use"
              steps={[
                'Enter your main subject or concept',
                'Select video-specific parameters like camera movement and duration',
                'Choose visual elements like lighting and composition',
                'Add atmosphere and mood details',
                'Generate your professional video prompt',
                'Copy and use with AI video generators like Runway, Pika Labs, or Sora',
              ]}
            />

            <PromptGeneratorForm
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
                        details, professional terminology, and creative
                        elements.
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

                    {/* AI Video Generators */}
                    <div>
                      <h4
                        style={{
                          fontSize: '16px',
                          fontWeight: 'semibold',
                          marginBottom: '12px',
                          color: '#fff',
                        }}
                      >
                        🎬 Popular AI Video Generators
                      </h4>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '8px',
                        }}
                      >
                        <a
                          href="https://runwayml.com"
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
                          Runway ML
                        </a>
                        <a
                          href="https://pika.art"
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
                          Pika Labs
                        </a>
                        <a
                          href="https://www.adobe.com/products/firefly.html"
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
                          Adobe Firefly
                        </a>
                        <a
                          href="https://www.blackmagicdesign.com/products/davinciresolve"
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
                          DaVinci Resolve
                        </a>
                        <a
                          href="https://aistudio.google.com/app/prompts/veo"
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
                          Google Veo 3
                        </a>
                        <a
                          href="https://runwayml.com"
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
                          Runway ML
                        </a>
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
