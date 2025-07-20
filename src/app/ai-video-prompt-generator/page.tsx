'use client';

import { FormData } from '@/components/PromptGenerator/FormData';
import GenerateButton from '@/components/PromptGenerator/GenerateButton';
import Header from '@/components/PromptGenerator/Header';
import Instructions from '@/components/PromptGenerator/Instructions';
import LoadingSpinner from '@/components/PromptGenerator/LoadingSpinner';
import PresetTemplates from '@/components/PromptGenerator/PresetTemplates';
import ProgressIndicator from '@/components/PromptGenerator/ProgressIndicator';
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
  const [currentStep, setCurrentStep] = useState(1);
  const [templateApplied, setTemplateApplied] = useState(false);
  const [appliedTemplateName, setAppliedTemplateName] = useState('');

  // Progress steps
  const progressSteps = [
    'Core Elements',
    'Video Parameters',
    'Visual & Technical',
    'Atmosphere & Mood',
    'Environment & Context',
    'Sensory & Materials',
    'Action & Details',
    'Generate Prompt',
  ];

  // Calculate current step based on form completion
  const calculateCurrentStep = (formData: FormData) => {
    if (formData.subject) {
      if (
        formData.cameraMovement ||
        formData.videoDuration ||
        formData.frameRate
      ) {
        if (formData.lighting || formData.pov || formData.composition) {
          if (formData.vibe || formData.mood || formData.atmosphere) {
            if (formData.weather || formData.timeOfDay || formData.season) {
              if (formData.sense || formData.colors || formData.textures) {
                if (
                  formData.actions ||
                  formData.details ||
                  formData.additionalDetails
                ) {
                  return 7; // Action & Details
                }
                return 6; // Sensory & Materials
              }
              return 5; // Environment & Context
            }
            return 4; // Atmosphere & Mood
          }
          return 3; // Visual & Technical
        }
        return 2; // Video Parameters
      }
      return 1; // Core Elements
    }
    return 1; // Core Elements
  };

  // Handle template application
  const handleApplyTemplate = (
    template: Partial<FormData>,
    templateName: string
  ) => {
    console.log('Applying template:', template);

    // Apply all template values
    Object.entries(template).forEach(([key, value]) => {
      console.log(`Updating field: ${key} = ${value}`);
      updateFormData(key, value);
    });

    // Force re-render of nested options by updating key fields
    setTimeout(() => {
      if (template.lighting) updateFormData('lighting', template.lighting);
      if (template.pov) updateFormData('pov', template.pov);
      if (template.composition)
        updateFormData('composition', template.composition);
      if (template.atmosphere)
        updateFormData('atmosphere', template.atmosphere);
      if (template.weather) updateFormData('weather', template.weather);
      if (template.sense) updateFormData('sense', template.sense);
      if (template.actions) updateFormData('actions', template.actions);
      if (template.cameraMovement)
        updateFormData('cameraMovement', template.cameraMovement);
      if (template.videoStyle)
        updateFormData('videoStyle', template.videoStyle);
    }, 100);

    // Show success feedback
    setTemplateApplied(true);
    setAppliedTemplateName(templateName);

    // Clear success message after 3 seconds
    setTimeout(() => {
      setTemplateApplied(false);
      setAppliedTemplateName('');
    }, 3000);

    console.log('Template application complete');
  };

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

  // Update current step when form data changes
  useEffect(() => {
    setCurrentStep(calculateCurrentStep(formData));
  }, [formData]);

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
          <div className="generator-main">
            <Header
              title="AI Video Prompt Generator"
              subtitle="Create professional video prompts for AI generators"
              icon="🎬"
            />

            <ProgressIndicator
              currentStep={currentStep}
              totalSteps={progressSteps.length}
              steps={progressSteps}
            />

            <PresetTemplates onApplyTemplate={handleApplyTemplate} />

            {/* Template Applied Success Notification */}
            {templateApplied && (
              <div className="template-notification">
                <span className="template-notification__icon">✅</span>
                <div>
                  <div className="template-notification__title">
                    Template Applied Successfully!
                  </div>
                  <div className="template-notification__desc">
                    &ldquo;{appliedTemplateName}&rdquo; template has been
                    loaded. You can now customize any fields as needed.
                  </div>
                </div>
              </div>
            )}

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

                {/* Enhanced Tips Section */}
                <div className="tips-section">
                  <div className="tips-section__top-border" />
                  <h3 className="tips-section__title">
                    <span style={{ fontSize: '24px' }}>💡</span>
                    Tips for Better Results
                  </h3>
                  <div className="tips-section__grid">
                    {/* ChatGPT Enhancement */}
                    <div className="tips-section__card">
                      <h4 className="tips-section__card-title">
                        <span style={{ fontSize: '20px' }}>🤖</span>
                        Enhance with ChatGPT
                      </h4>
                      <p className="tips-section__card-desc">
                        Copy your prompt and ask ChatGPT to enhance it with more
                        details, professional terminology, and creative
                        elements.
                      </p>
                      <button
                        onClick={copyEnhancedPromptRequest}
                        className="tips-section__card-btn"
                      >
                        <span>📋</span>
                        Copy Enhancement Request
                      </button>
                    </div>
                    {/* AI Video Generators */}
                    <div className="tips-section__card">
                      <h4 className="tips-section__card-title">
                        <span style={{ fontSize: '20px' }}>🎥</span>
                        Use with AI Video Generators
                      </h4>
                      <p className="tips-section__card-desc">
                        Paste your generated prompt into tools like Runway, Pika
                        Labs, or Sora for best results. Adjust parameters as
                        needed for each platform.
                      </p>
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
