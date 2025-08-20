'use client';

import type { AudioFormData } from '@/components/PromptGenerator/AudioFormData';
import AudioPromptGeneratorForm from '@/components/PromptGenerator/AudioPromptGeneratorForm';

import { handleSubscribePayment } from '@/components/Auth/handleSubscribePayment';
import GenerateButton from '@/components/PromptGenerator/GenerateButton';
import Header from '@/components/PromptGenerator/Header';
import Instructions from '@/components/PromptGenerator/Instructions';
import LoadingSpinner from '@/components/PromptGenerator/LoadingSpinner';
import ProgressIndicator from '@/components/PromptGenerator/ProgressIndicator';
import PromptDisplay from '@/components/PromptGenerator/PromptDisplay';
import SubscribePrompt from '@/components/PromptGenerator/SubscribePrompt';
import StructuredData from '@/components/SEO/StructuredData';
import { SidebarContext } from '@/components/Sidebar';
import { useAuth } from '@/hooks/useAuth';
import { useFormStorage } from '@/hooks/useFormStorage';
import dynamic from 'next/dynamic';
import { useContext, useEffect, useState } from 'react';
import '../../components/PromptGenerator/PromptGenerator.css';

// Dynamic import for Sidebar with SSR disabled
const Sidebar = dynamic(() => import('@/components/Sidebar'), { ssr: false });

const GEN_COUNT_KEY = 'ai-audio-prompt-gen-count';
const MAX_GEN_COUNT =
  typeof process !== 'undefined' && process.env.NEXT_PUBLIC_MAX_GEN_COUNT
    ? parseInt(process.env.NEXT_PUBLIC_MAX_GEN_COUNT, 10) || 4
    : 4;

// Define the mapping of form sections to their required fields
const sectionFields: {
  name: string;
  fields: (keyof AudioFormData)[];
  requiredFields: (keyof AudioFormData)[];
}[] = [
  {
    name: 'Core Elements',
    fields: ['subject', 'style', 'genre', 'soundType', 'mood'],
    requiredFields: ['subject', 'soundType'], // Subject and soundType are required
  },
  {
    name: 'Audio Parameters',
    fields: ['tempo', 'key', 'timeSignature', 'duration', 'audioQuality'],
    requiredFields: [], // All are optional
  },
  {
    name: 'Sound & Texture',
    fields: [
      'instruments',
      'vocals',
      'effects',
      'soundDesign',
      'textures',
      'colors',
      'materials',
      'sensations',
    ],
    requiredFields: [], // All are optional
  },
  {
    name: 'Mood & Atmosphere',
    fields: ['atmosphere', 'emotions', 'energy', 'intensity'],
    requiredFields: [], // All are optional
  },
  {
    name: 'Environment & Context',
    fields: ['setting', 'timeOfDay', 'season', 'location'],
    requiredFields: [], // All are optional
  },
  {
    name: 'Technical',
    fields: ['model'],
    requiredFields: [], // Model has a default value
  },
];

const progressSteps = sectionFields.map(s => s.name);

function isSectionComplete(
  section: {
    name: string;
    fields: (keyof AudioFormData)[];
    requiredFields: (keyof AudioFormData)[];
  },
  formData: AudioFormData
): boolean {
  // Check if all required fields are filled
  const requiredFieldsComplete = section.requiredFields.every(
    (field: keyof AudioFormData) =>
      formData[field] && formData[field].trim() !== ''
  );

  // If there are no required fields, consider the section complete if at least one field is filled
  if (section.requiredFields.length === 0) {
    return section.fields.some(
      (field: keyof AudioFormData) =>
        formData[field] && formData[field].trim() !== ''
    );
  }

  return requiredFieldsComplete;
}

export default function AIAudioPromptGenerator() {
  const { isOpen, sidebarExpanded } = useContext(SidebarContext);
  const [mounted, setMounted] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [copied, setCopied] = useState(false);
  const [genCount, setGenCount] = useState<number>(0);
  const [subjectError, setSubjectError] = useState<string | null>(null);
  const [generatedStory, setGeneratedStory] = useState('');
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);
  const { user } = useAuth();
  const [subscriptionStatus, setSubscriptionStatus] = useState<
    'active' | 'inactive' | 'none' | null
  >(null);

  // Fetch prompt count from backend on login
  useEffect(() => {
    const fetchPromptCount = async () => {
      if (user?.email) {
        try {
          const res = await fetch(
            `/api/prompt-usage?email=${encodeURIComponent(user.email)}`
          );
          const data = await res.json();
          if (typeof data.count === 'number') setGenCount(data.count);
        } catch {}
      }
    };
    fetchPromptCount();
  }, [user]);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (user?.uid) {
        try {
          const res = await fetch(`/api/auth/register?firebaseUid=${user.uid}`);
          const data = await res.json();
          setSubscriptionStatus(data.status || 'none');
        } catch (e) {
          setSubscriptionStatus('none');
        }
      } else {
        setSubscriptionStatus(null);
      }
    };
    fetchSubscription();
  }, [user]);

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

  const generatePrompt = async () => {
    if (subscriptionStatus !== 'active' && genCount <= 0) return;
    if (!formData.subject.trim()) {
      setSubjectError('Please enter a subject for your audio');
      return;
    }
    setSubjectError(null);

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
    setGeneratedStory(''); // Reset the enhanced story

    // Decrement count in backend
    if (user?.email && subscriptionStatus !== 'active') {
      try {
        const res = await fetch('/api/prompt-usage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email }),
        });
        const data = await res.json();
        if (typeof data.count === 'number') setGenCount(data.count);
      } catch {}
    }
  };

  const enhanceWithChatGPT = async () => {
    if (!generatedPrompt) return;

    try {
      setIsGeneratingStory(true);
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Create a detailed audio description based on this prompt: ${generatedPrompt}. The description should capture the mood, atmosphere, and key audio elements in a vivid and engaging way.`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate audio description');
      }

      const data = await response.json();
      setGeneratedStory(data.story);
    } catch (error) {
      console.error('Error generating audio description:', error);
      setGeneratedStory(
        'Failed to generate audio description. Please try again.'
      );
    } finally {
      setIsGeneratingStory(false);
    }
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

  const resetFormDataWithCount = () => {
    resetFormData();
    setGenCount(0); // Optionally, you may want to reset in backend too
    setShowPrompt(false);
    setGeneratedStory(''); // Clear the enhanced story
  };

  // --- Subscription Payment Logic (copied from Sidebar) ---
  const subscribePrice =
    typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SUBSCRIBE_PRICE
      ? parseInt(process.env.NEXT_PUBLIC_SUBSCRIBE_PRICE, 10)
      : 10000;

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

  // Calculate completed sections and current step
  const completedSections = sectionFields.filter(section =>
    isSectionComplete(section, formData)
  );

  // Calculate progress more intelligently
  const totalFields = sectionFields.reduce(
    (acc, section) => acc + section.fields.length,
    0
  );
  const filledFields = sectionFields.reduce((acc, section) => {
    return (
      acc +
      section.fields.filter(
        field => formData[field] && formData[field].trim() !== ''
      ).length
    );
  }, 0);

  // Calculate current step based on progress through the form
  const progressPercentage =
    totalFields > 0 ? (filledFields / totalFields) * 100 : 0;
  const currentStep = Math.max(
    1,
    Math.min(
      Math.ceil((progressPercentage / 100) * progressSteps.length),
      progressSteps.length
    )
  );

  return (
    <>
      <StructuredData
        type="audio-generator"
        title="AI Audio Prompt Generator - Create Professional Audio Prompts"
        description="Generate high-quality AI audio prompts with our advanced tool. Create musical, ambient, and sound design prompts for Suno, Udio, and other AI audio generators."
        url="https://marifat-maruf.vercel.app/ai-audio-prompt-generator"
      />

      {/* Modal for subject error */}
      {subjectError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setSubjectError(null)}
              aria-label="Close"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="flex items-center mb-2">
              <svg
                className="w-6 h-6 text-red-500 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z"
                />
              </svg>
              <span className="text-lg font-semibold text-red-600">Error</span>
            </div>
            <div className="text-gray-800">{subjectError}</div>
          </div>
        </div>
      )}

      <div className="generator-flex-layout">
        <Sidebar />
        <main
          className={`generator-main-content transition-all duration-300 ml-0 mr-0${sidebarExpanded ? ' lg:ml-64' : ' lg:ml-20'} lg:mr-[320px] ${isOpen ? 'block lg:block hidden' : ''}`}
        >
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

          {user && (
            <div
              className="prompt-generation-count"
              style={{
                color:
                  subscriptionStatus === 'active'
                    ? '#7dd8e0'
                    : genCount === 0
                      ? '#f4a261'
                      : '#7dd8e0',
              }}
            >
              {subscriptionStatus === 'active'
                ? `You have unlimited prompt generations.`
                : genCount > 0
                  ? `You have ${genCount} prompt generations left.`
                  : `You have reached your prompt generation limit.`}
            </div>
          )}
          <GenerateButton
            onGenerate={generatePrompt}
            onEnhance={enhanceWithChatGPT}
            onReset={resetFormDataWithCount}
            disabled={subscriptionStatus !== 'active' && genCount <= 0}
            hasGeneratedPrompt={showPrompt}
            isEnhancing={isGeneratingStory}
          />

          <SubscribePrompt
            user={user}
            subscriptionStatus={subscriptionStatus}
            genCount={genCount}
            onSubscribe={() => user && handleSubscribePayment(user)}
          />

          {showPrompt && (
            <div className="generator-prompt-section">
              <PromptDisplay
                prompt={generatedPrompt}
                onCopy={copyToClipboard}
                copied={copied}
              />

              {generatedStory && (
                <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-4">
                    🤖 Enhanced with ChatGPT :
                  </h3>
                  {isGeneratingStory ? (
                    <div className="flex justify-center my-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
                      <span className="ml-4 text-cyan-400 text-lg">
                        Generating your audio description...
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="prose prose-invert max-w-none">
                        {generatedStory.split('\n').map((paragraph, i) => (
                          <p key={i} className="mb-4">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(generatedStory);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md transition-colors"
                      >
                        {copied ? 'Copied!' : 'Copy Description'}
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Tips Section */}
              <div className="audio-tips-section">
                <h3 className="audio-tips-title">💡 Tips for Better Results</h3>
                <div className="audio-tips-grid">
                  {/* ChatGPT Enhancement */}
                  <div>
                    <h4 className="audio-tips-card-title">
                      🤖 Enhance with ChatGPT
                    </h4>
                    <p className="audio-tips-card-desc">
                      Copy your prompt and ask ChatGPT to enhance it with more
                      details, musical terminology, and creative elements.
                    </p>
                    <button
                      onClick={copyEnhancedPromptRequest}
                      className="audio-tips-btn"
                    >
                      Copy Enhancement Request
                    </button>
                  </div>
                  {/* AI Audio Generators */}
                  <div>
                    <h4 className="audio-tips-card-title">
                      {formData.soundType === 'sound effect' &&
                        '🔊 AI Sound Effect Generators'}
                      {formData.soundType === 'music' &&
                        '🎵 AI Music Generators'}
                      {formData.soundType === 'ambience' &&
                        '🌲 AI Ambience Generators'}
                      {!formData.soundType && '🎵 Popular AI Audio Generators'}
                    </h4>
                    <div className="audio-resources-grid">
                      {/* Sound Effect Generators */}
                      {formData.soundType === 'sound effect' && (
                        <>
                          <a
                            href="https://elevenlabs.io"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="audio-resource-link"
                          >
                            ElevenLabs
                          </a>
                          <a
                            href="https://soundraw.io"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="audio-resource-link"
                          >
                            Soundraw
                          </a>
                          <a
                            href="https://freesound.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="audio-resource-link"
                          >
                            Freesound
                          </a>
                          <a
                            href="https://zapsplat.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="audio-resource-link"
                          >
                            Zapsplat
                          </a>
                          <a
                            href="https://mixkit.co"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="audio-resource-link"
                          >
                            Mixkit
                          </a>
                          <a
                            href="https://pixabay.com/sound-effects"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="audio-resource-link"
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
                            className="audio-resource-link"
                          >
                            Suno AI
                          </a>
                          <a
                            href="https://udio.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="audio-resource-link"
                          >
                            Udio
                          </a>
                          <a
                            href="https://mubert.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="audio-resource-link"
                          >
                            Mubert
                          </a>
                          <a
                            href="https://aiva.ai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="audio-resource-link"
                          >
                            AIVA
                          </a>
                          <a
                            href="https://boomy.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="audio-resource-link"
                          >
                            Boomy
                          </a>
                          <a
                            href="https://soundraw.io"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="audio-resource-link"
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
                            className="audio-resource-link"
                          >
                            Ambient Mixer
                          </a>
                          <a
                            href="https://my-noise.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="audio-resource-link"
                          >
                            MyNoise
                          </a>
                          <a
                            href="https://noisli.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="audio-resource-link"
                          >
                            Noisli
                          </a>
                          <a
                            href="https://freesound.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="audio-resource-link"
                          >
                            Freesound
                          </a>
                          <a
                            href="https://soundraw.io"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="audio-resource-link"
                          >
                            Soundraw
                          </a>
                          <a
                            href="https://pixabay.com/sound-effects"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="audio-resource-link"
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
                            className="audio-resource-link"
                          >
                            Suno AI
                          </a>
                          <a
                            href="https://udio.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="audio-resource-link"
                          >
                            Udio
                          </a>
                          <a
                            href="https://mubert.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="audio-resource-link"
                          >
                            Mubert
                          </a>
                          <a
                            href="https://soundraw.io"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="audio-resource-link"
                          >
                            Soundraw
                          </a>
                          <a
                            href="https://aiva.ai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="audio-resource-link"
                          >
                            AIVA
                          </a>
                          <a
                            href="https://boomy.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="audio-resource-link"
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
        </main>
        {/* Right vertical progress sidebar */}
        <div className="generator-progress-sidebar hidden lg:block">
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={progressSteps.length}
            steps={progressSteps}
          />
        </div>
      </div>
    </>
  );
}
