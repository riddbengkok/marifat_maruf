'use client';

import { handleSubscribePayment } from '@/components/Auth/handleSubscribePayment';
import { ImageFormData } from '@/components/PromptGenerator/FormData';
import GenerateButton from '@/components/PromptGenerator/GenerateButton';
import Header from '@/components/PromptGenerator/Header';
import ImagePromptGeneratorForm from '@/components/PromptGenerator/ImagePromptGeneratorForm';
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

// Dynamically import Sidebar to prevent SSR issues
const Sidebar = dynamic(() => import('@/components/Sidebar'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: '256px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(12px)',
        borderRight: '1px solid rgba(255, 255, 255, 0.2)',
        zIndex: 40,
      }}
    />
  ),
});

const GEN_COUNT_KEY = 'ai-image-prompt-gen-count';
const MAX_GEN_COUNT =
  typeof process !== 'undefined' && process.env.NEXT_PUBLIC_MAX_GEN_COUNT
    ? parseInt(process.env.NEXT_PUBLIC_MAX_GEN_COUNT, 10) || 4
    : 4;

// Define the mapping of form sections to their required fields
const sectionFields = [
  { name: 'Core Elements', fields: ['subject', 'style', 'setting'] },
  {
    name: 'Visual & Technical',
    fields: ['lighting', 'pov', 'composition', 'aspectRatio', 'quality'],
  },
  {
    name: 'Atmosphere & Mood',
    fields: ['vibe', 'mood', 'atmosphere', 'emotions'],
  },
  { name: 'Environment & Context', fields: ['weather', 'timeOfDay', 'season'] },
  {
    name: 'Sensory & Material',
    fields: ['sense', 'colors', 'textures', 'materials'],
  },
  {
    name: 'Action & Details',
    fields: ['actions', 'details', 'additionalDetails'],
  },
  { name: 'Technical', fields: ['model'] },
];

const progressSteps = sectionFields.map((s: { name: string }) => s.name);

function isSectionComplete(
  section: { fields: string[] },
  formData: Record<string, string>
): boolean {
  return section.fields.every(
    (field: string) => formData[field] && formData[field].trim() !== ''
  );
}

export default function PromptGenerator() {
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
  const { isOpen, sidebarExpanded } = useContext(SidebarContext);

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

  // Initial form data for image prompts
  const initialFormData: ImageFormData = {
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
    model: 'dalle',
  };

  // Use the storage hook for form data persistence
  const { formData, updateFormData, resetFormData } =
    useFormStorage<ImageFormData>({
      key: 'ai-image-prompt-form',
      initialData: initialFormData,
    });

  useEffect(() => {
    console.log('Component mounted, setting mounted to true');
    setMounted(true);
  }, []);

  const generatePrompt = async () => {
    if (subscriptionStatus !== 'active' && genCount <= 0) return;
    if (!formData.subject.trim()) {
      setSubjectError('Please enter a subject for your image');
      return;
    }
    setSubjectError(null);

    const parts: string[] = [];

    // Core Elements
    if (formData.subject) parts.push(formData.subject);
    if (formData.style) parts.push(`in ${formData.style} style`);
    if (formData.setting) parts.push(`set in ${formData.setting}`);

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

    if (formData.aspectRatio && formData.aspectRatio !== '1:1')
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
    if (formData.model && formData.model !== 'dalle')
      parts.push(`model: ${formData.model}`);

    const finalPrompt = parts.join(', ');
    setGeneratedPrompt(finalPrompt);
    setShowPrompt(true);
    setCopied(false);

    // Call ChatGPT API to generate story
    try {
      setIsGeneratingStory(true);
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Improve this prompt to make it more sensible and meet the rules of photography or design theory : ${finalPrompt}.`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate story');
      }

      const data = await response.json();
      setGeneratedStory(data.story);
    } catch (error) {
      console.error('Error generating story:', error);
      setGeneratedStory('Failed to generate description. Please try again.');
    } finally {
      setIsGeneratingStory(false);
    }

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
    const enhancedRequest = `Please enhance this AI image prompt to make it more detailed and professional: "${generatedPrompt}"`;
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
    setShowPrompt(false); // Ensure prompt is hidden after reset
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
    isSectionComplete(section, formData as unknown as Record<string, string>)
  );
  const currentStep = Math.min(
    completedSections.length + 1,
    progressSteps.length
  );

  return (
    <>
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
      <StructuredData
        type="image-generator"
        title="AI Image Prompt Generator - Create Stunning Image Prompts"
        description="Generate professional AI image prompts with our comprehensive tool. Create artistic, realistic, and creative image prompts for DALL-E, Midjourney, Stable Diffusion, and other AI image generators."
        url="https://marifat-maruf.vercel.app/ai-image-prompt-generator"
      />

      <div className="generator-flex-layout">
        <Sidebar />
        <main
          className={`generator-main-content transition-all duration-300 ml-0 mr-0${sidebarExpanded ? ' lg:ml-64' : ' lg:ml-20'} lg:mr-[320px] ${isOpen ? 'block lg:block hidden' : ''}`}
        >
          <div
            className="generator-main"
            style={{ maxWidth: '1200px', margin: '0 auto' }}
          >
            <Header
              title="AI Image Prompt Generator"
              subtitle="Create professional image prompts for AI generators"
              icon="🖼️"
            />

            <Instructions
              title="How to Use"
              steps={[
                'Enter your main subject or concept',
                'Select visual and technical parameters',
                'Add atmosphere and details',
                'Generate your professional image prompt',
                'Copy and use with AI image generators',
              ]}
            />

            <ImagePromptGeneratorForm
              formData={formData}
              onFormDataChange={updateFormData}
            />

            {user && (
              <>
                <div
                  className="prompt-generation-count"
                  style={{
                    marginBottom: '16px',
                    color:
                      subscriptionStatus === 'active'
                        ? '#7dd8e0'
                        : genCount === 0
                          ? '#f4a261'
                          : '#7dd8e0',
                    fontWeight: 500,
                  }}
                >
                  {subscriptionStatus === 'active'
                    ? `You have unlimited prompt generations.`
                    : genCount > 0
                      ? `You have ${genCount} prompt generations left.`
                      : `You have reached your prompt generation limit.`}
                </div>
                {/* Debug UI for prompt count */}
                <div
                  style={{ fontSize: '12px', color: '#888', marginBottom: 8 }}
                ></div>
              </>
            )}
            <GenerateButton
              onClick={generatePrompt}
              onReset={resetFormDataWithCount}
              disabled={subscriptionStatus !== 'active' && genCount <= 0}
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

                <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-4">
                    🤖 Enhance with ChatGPT :
                  </h3>
                  {isGeneratingStory ? (
                    <div className="flex justify-center my-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
                      <span className="ml-4 text-cyan-400 text-lg">
                        Generating your description...
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
              </div>
            )}

            {/* Tips Section */}
            <div className="tips-section">
              <h3 className="tips-section-title">💡 Tips for Better Results</h3>

              <div className="tips-section-grid">
                {/* ChatGPT Enhancement */}
                <div>
                  <h4 className="tips-section-card-title">
                    🤖 Enhance with ChatGPT
                  </h4>
                  <p className="tips-section-card-desc">
                    Copy your prompt and ask ChatGPT to enhance it with more
                    details, professional terminology, and creative elements.
                  </p>
                  <button
                    onClick={copyEnhancedPromptRequest}
                    className="tips-section-btn"
                  >
                    Copy Enhancement Request
                  </button>
                </div>

                {/* AI Image Generators */}
                <div>
                  <h4 className="tips-section-card-title">
                    🎨 Popular AI Image Generators
                  </h4>
                  <div className="tips-section-card-grid">
                    {/* Each link below should use a class for styling */}
                    <a
                      href="https://openai.com/dall-e-2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tips-section-link"
                    >
                      DALL-E
                    </a>
                    <a
                      href="https://www.midjourney.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tips-section-link"
                    >
                      Midjourney
                    </a>
                    <a
                      href="https://stability.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tips-section-link"
                    >
                      Stable Diffusion
                    </a>
                    <a
                      href="https://firefly.adobe.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tips-section-link"
                    >
                      Adobe Firefly
                    </a>
                    <a
                      href="https://leonardo.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tips-section-link"
                    >
                      Leonardo AI
                    </a>
                    <a
                      href="https://www.bing.com/create"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tips-section-link"
                    >
                      Bing Image Creator
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
