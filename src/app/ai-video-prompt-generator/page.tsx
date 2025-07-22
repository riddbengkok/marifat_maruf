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
import { useAuth } from '@/hooks/useAuth';
import { useFormStorage } from '@/hooks/useFormStorage';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import '../../components/PromptGenerator/PromptGenerator.css';

// Dynamic import for Sidebar with SSR disabled
const Sidebar = dynamic(() => import('@/components/Sidebar'), { ssr: false });

const GEN_COUNT_KEY = 'ai-video-prompt-gen-count';
const MAX_GEN_COUNT =
  typeof process !== 'undefined' && process.env.NEXT_PUBLIC_MAX_GEN_COUNT
    ? parseInt(process.env.NEXT_PUBLIC_MAX_GEN_COUNT, 10) || 4
    : 4;

// --- Type Declarations ---
declare global {
  interface Window {
    snap?: {
      pay: (
        token: string,
        options?: {
          onSuccess?: (result: unknown) => void;
          onPending?: (result: unknown) => void;
          onError?: (result: unknown) => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}

// --- Utility: Load Midtrans Snap.js ---
function loadMidtransScript() {
  if (typeof window !== 'undefined' && !window.snap) {
    const script = document.createElement('script');
    script.src =
      process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === 'true'
        ? 'https://app.midtrans.com/snap/snap.js'
        : 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.setAttribute(
      'data-client-key',
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || ''
    );
    script.async = true;
    document.body.appendChild(script);
  }
}

// --- Section Fields Mapping ---
const sectionFields: { name: string; fields: (keyof FormData)[] }[] = [
  { name: 'Core Elements', fields: ['subject', 'style', 'setting'] },
  {
    name: 'Video Parameters',
    fields: [
      'cameraMovement',
      'videoDuration',
      'frameRate',
      'videoStyle',
      'transition',
    ],
  },
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

const progressSteps = sectionFields.map(s => s.name);

function isSectionComplete(
  section: { name: string; fields: (keyof FormData)[] },
  formData: FormData
): boolean {
  return section.fields.every(
    (field: keyof FormData) => formData[field] && formData[field].trim() !== ''
  );
}

// --- Main Component ---
export default function AIVideoPromptGenerator() {
  // --- State ---
  const [mounted, setMounted] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [copied, setCopied] = useState(false);
  const [templateApplied, setTemplateApplied] = useState(false);
  const [appliedTemplateName, setAppliedTemplateName] = useState('');
  const [genCount, setGenCount] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(GEN_COUNT_KEY);
      if (saved) {
        const n = parseInt(saved, 10);
        if (!isNaN(n)) return n;
      }
    }
    return 0;
  });
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { user } = useAuth();
  const [subjectError, setSubjectError] = useState<string | null>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<
    'active' | 'inactive' | 'none' | null
  >(null);

  // --- Effects ---
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMounted(true);
      loadMidtransScript();
      // Check subscription status
      const sub = localStorage.getItem('isSubscribed');
      setIsSubscribed(sub === 'true');
    }
  }, []);

  // Reset gen count and subscription status on logout or account change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(GEN_COUNT_KEY);
      localStorage.removeItem('isSubscribed');
      setGenCount(0);
      setIsSubscribed(false);
    }
  }, [user]);

  // --- Form Data Management ---
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

  const { formData, updateFormData, resetFormData } = useFormStorage<FormData>({
    key: 'ai-video-prompt-form',
    initialData: initialFormData,
  });

  // --- Handlers ---
  const generatePrompt = () => {
    if (subscriptionStatus !== 'active' && genCount >= MAX_GEN_COUNT) return;
    if (!formData.subject.trim()) {
      setSubjectError('Please enter a subject for your video');
      return;
    }
    setSubjectError(null);
    // ... your existing prompt generation logic ...
    setGenCount(prev => {
      const next = prev + 1;
      if (typeof window !== 'undefined') {
        localStorage.setItem(GEN_COUNT_KEY, String(next));
      }
      return next;
    });
  };

  const resetFormDataWithCount = () => {
    resetFormData();
    if (typeof window !== 'undefined') {
      localStorage.removeItem(GEN_COUNT_KEY);
    }
    setGenCount(0);
  };

  const handleApplyTemplate = (
    template: Partial<FormData>,
    templateName: string
  ) => {
    updateFormData({ ...initialFormData, ...template });
    setTemplateApplied(true);
    setAppliedTemplateName(templateName);
    setTimeout(() => {
      setTemplateApplied(false);
      setAppliedTemplateName('');
    }, 3000);
  };

  // --- Midtrans Payment Handler ---
  const handleSubscribe = async () => {
    // Call your backend to get a Midtrans Snap token
    const res = await fetch('/api/create-midtrans-transaction', {
      method: 'POST',
    });
    const { token } = await res.json();
    // Open Midtrans Snap popup
    if (
      typeof window !== 'undefined' &&
      window.snap &&
      typeof window.snap.pay === 'function'
    ) {
      window.snap.pay(token, {
        onSuccess: function (_result: unknown) {
          localStorage.setItem('isSubscribed', 'true');
          setIsSubscribed(true);
          alert('Payment successful! You are now subscribed.');
        },
        onPending: function (_result: unknown) {},
        onError: function (_result: unknown) {},
        onClose: function () {},
      });
    } else {
      alert('Midtrans payment script not loaded.');
    }
  };

  // --- Early return for SSR ---
  if (!mounted) {
    return (
      <div className="loading-container">
        <LoadingSpinner />
      </div>
    );
  }

  // --- Progress Calculation ---
  const completedSections = sectionFields.filter(section =>
    isSectionComplete(section, formData)
  );
  const currentStep = Math.min(
    completedSections.length + 1,
    progressSteps.length
  );

  // --- Render ---
  return (
    <>
      <StructuredData
        type="video-generator"
        title="AI Video Prompt Generator - Create Professional Video Prompts"
        description="Generate high-quality AI video prompts with our advanced tool. Create cinematic, commercial, and artistic video prompts for Runway, Pika Labs, Sora, and other AI video generators."
        url="https://hyperspace-next.vercel.app/ai-video-prompt-generator"
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
        <main className="generator-main-content">
          <div className="generator-main">
            <Header
              title="AI Video Prompt Generator"
              subtitle="Create professional video prompts for AI generators"
              icon="🎬"
            />
            <PresetTemplates onApplyTemplate={handleApplyTemplate} />
            <Instructions />

            <PromptGeneratorForm
              formData={formData}
              onFormDataChange={(field, value) => {
                if (typeof field === 'object') {
                  updateFormData(field);
                } else {
                  updateFormData(field, value);
                }
              }}
            />
            {user && (
              <div className="prompt-generation-count">
                {subscriptionStatus === 'active'
                  ? 'You have unlimited prompt generations.'
                  : genCount < MAX_GEN_COUNT
                    ? `You have ${MAX_GEN_COUNT - genCount} prompt generations left.`
                    : 'You have reached the free generation limit. Subscribe to unlock unlimited prompt generations.'}
              </div>
            )}
            {!isSubscribed && genCount >= MAX_GEN_COUNT ? (
              <div className="subscribe-box">
                <div className="subscribe-box-message">
                  You have reached the free generation limit. Subscribe to
                  unlock unlimited prompt generations.
                </div>
                <button onClick={handleSubscribe} className="subscribe-btn">
                  <span className="subscribe-btn-emoji">🚀</span>
                  Subscribe to Generate Prompt
                </button>
              </div>
            ) : (
              <GenerateButton
                onClick={generatePrompt}
                onReset={resetFormDataWithCount}
                disabled={
                  subscriptionStatus !== 'active' && genCount >= MAX_GEN_COUNT
                }
              />
            )}
            {showPrompt && (
              <PromptDisplay
                prompt={generatedPrompt}
                onCopy={() => {
                  navigator.clipboard.writeText(generatedPrompt);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                copied={copied}
              />
            )}
          </div>
        </main>
        {/* Right vertical progress sidebar */}
        <div className="generator-progress-sidebar">
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
