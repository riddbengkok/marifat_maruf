'use client';

import { handleSubscribePayment } from '@/components/Auth/handleSubscribePayment';
import GenerateButton from '@/components/PromptGenerator/GenerateButton';
import Header from '@/components/PromptGenerator/Header';
import Instructions from '@/components/PromptGenerator/Instructions';
import ProgressIndicator from '@/components/PromptGenerator/ProgressIndicator';
import PromptDisplay from '@/components/PromptGenerator/PromptDisplay';
import { StoryFormData } from '@/components/PromptGenerator/StoryFormData';
import StoryPromptGeneratorForm from '@/components/PromptGenerator/StoryPromptGeneratorForm';
import SubscribePrompt from '@/components/PromptGenerator/SubscribePrompt';
import { SidebarContext } from '@/components/Sidebar';
import { useAuth } from '@/hooks/useAuth';
import dynamic from 'next/dynamic';
import { useContext, useEffect, useRef, useState } from 'react';
import '../../components/PromptGenerator/PromptGenerator.css';

// Dynamic import for Sidebar with SSR disabled
const Sidebar = dynamic(() => import('@/components/Sidebar'), { ssr: false });

const FORM_STORAGE_KEY = 'ai-story-prompt-form';
const GEN_COUNT_KEY = 'ai-story-prompt-gen-count';
const MAX_GEN_COUNT =
  typeof process !== 'undefined' && process.env.NEXT_PUBLIC_MAX_GEN_COUNT
    ? parseInt(process.env.NEXT_PUBLIC_MAX_GEN_COUNT, 10) || 4
    : 4;

// Define the mapping of form sections to their required fields
const sectionFields = [
  { name: 'Core Elements', fields: ['genre', 'setting', 'mainCharacter'] },
  { name: 'Conflict & Theme', fields: ['conflict', 'theme', 'goal'] },
  { name: 'Plot Structure', fields: ['beginning', 'middle', 'end', 'twist'] },
  { name: 'Style & Tone', fields: ['tone', 'style', 'pov'] },
  { name: 'Additional Details', fields: ['inspiration', 'customInstructions'] },
];

const progressSteps: string[] = sectionFields.map(
  (s: { name: string }) => s.name
);

function isSectionComplete(
  section: { fields: string[] },
  formData: Record<string, string>
): boolean {
  return section.fields.every(
    (field: string) => formData[field] && formData[field].trim() !== ''
  );
}

export default function AIStoryPromptGenerator() {
  const [mounted, setMounted] = useState(false);
  const initialFormData: StoryFormData = {
    title: '',
    mainIdea: '',
    genre: '',
    setting: '',
    desiredLength: '',
    protagonistName: '',
    protagonistRole: '',
    protagonistPersonality: '',
    protagonistGoal: '',
    supportingCharacters: '',
    pov: '',
    tone: '',
    style: '',
    theme: '',
    moral: '',
    incitingIncident: '',
    conflict: '',
    plotPoints: '',
    climax: '',
    resolution: '',
    twist: '',
    worldRules: '',
    magicSystem: '',
    technology: '',
    specialElements: '',
    additionalNotes: '',
    mainCharacter: '',
  };

  const [formData, setFormData] = useState<StoryFormData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(FORM_STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return initialFormData;
        }
      }
    }
    return initialFormData;
  });
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [generatedStory, setGeneratedStory] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const promptRef = useRef<HTMLDivElement>(null);
  const [genCount, setGenCount] = useState<number>(0);
  const [subjectError, setSubjectError] = useState<string | null>(null);
  const { user } = useAuth();
  const [subscriptionStatus, setSubscriptionStatus] = useState<
    'active' | 'inactive' | 'none' | null
  >(null);
  const { isOpen, sidebarExpanded } = useContext(SidebarContext);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData]);

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

  const onFormDataChange = (field: keyof StoryFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generatePrompt = async () => {
    if (subscriptionStatus !== 'active' && genCount <= 0) return;
    // Check for required fields (genre, setting, mainCharacter or protagonistName)
    if (!(formData.genre ?? '').trim()) {
      setSubjectError('Please enter a genre for your story');
      return;
    }
    if (!(formData.setting ?? '').trim()) {
      setSubjectError('Please enter a setting for your story');
      return;
    }
    if (
      !(formData.mainCharacter ?? '').trim() &&
      !(formData.protagonistName ?? '').trim()
    ) {
      setSubjectError(
        'Please enter a main character or protagonist name for your story'
      );
      return;
    }

    setSubjectError(null);
    setIsGenerating(true);
    setShowStory(false);
    setGeneratedStory('');

    try {
      // Build the prompt
      const parts: string[] = [];
      if (formData.title) parts.push(`Title: ${formData.title}`);
      if (formData.mainIdea) parts.push(`Main Idea: ${formData.mainIdea}`);
      if (formData.genre) parts.push(`Genre: ${formData.genre}`);
      if (formData.setting) parts.push(`Setting: ${formData.setting}`);
      if (formData.desiredLength)
        parts.push(`Desired Length: ${formData.desiredLength}`);

      if (
        formData.protagonistName ||
        formData.protagonistRole ||
        formData.protagonistPersonality ||
        formData.protagonistGoal
      ) {
        parts.push(
          `Protagonist: ${formData.protagonistName ? formData.protagonistName : ''}${formData.protagonistRole ? ', ' + formData.protagonistRole : ''}${formData.protagonistPersonality ? ', ' + formData.protagonistPersonality : ''}${formData.protagonistGoal ? ', Goal: ' + formData.protagonistGoal : ''}`.trim()
        );
      }

      if (formData.supportingCharacters)
        parts.push(`Supporting Characters: ${formData.supportingCharacters}`);
      if (formData.pov) parts.push(`Point of View: ${formData.pov}`);
      if (formData.tone) parts.push(`Tone: ${formData.tone}`);
      if (formData.style) parts.push(`Style: ${formData.style}`);
      if (formData.theme) parts.push(`Theme: ${formData.theme}`);
      if (formData.moral) parts.push(`Moral: ${formData.moral}`);
      if (formData.incitingIncident)
        parts.push(`Inciting Incident: ${formData.incitingIncident}`);
      if (formData.conflict) parts.push(`Conflict: ${formData.conflict}`);
      if (formData.plotPoints)
        parts.push(`Key Plot Points: ${formData.plotPoints}`);
      if (formData.climax) parts.push(`Climax: ${formData.climax}`);
      if (formData.resolution) parts.push(`Resolution: ${formData.resolution}`);
      if (formData.twist) parts.push(`Twist: ${formData.twist}`);
      if (formData.worldRules)
        parts.push(`World Rules: ${formData.worldRules}`);
      if (formData.magicSystem)
        parts.push(`Magic System: ${formData.magicSystem}`);
      if (formData.technology) parts.push(`Technology: ${formData.technology}`);
      if (formData.specialElements)
        parts.push(`Special Elements: ${formData.specialElements}`);
      if (formData.additionalNotes)
        parts.push(`Additional Notes: ${formData.additionalNotes}`);

      const prompt = `Develop ideas from this prompt then Generate detailed Prompt: \n\n${parts.join('\n')}`;

      // Save the prompt to display
      setGeneratedPrompt(prompt);
      setShowPrompt(true);
      setCopied(false);

      // Call the API to generate the story
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate story');
      }

      const data = await response.json();
      setGeneratedStory(data.story);
      setShowStory(true); // Make sure to show the story section
      setShowStory(true);

      // Decrement count in backend
      if (user?.email && subscriptionStatus !== 'active') {
        try {
          const res = await fetch('/api/prompt-usage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email }),
          });
          const countData = await res.json();
          if (typeof countData.count === 'number') setGenCount(countData.count);
        } catch (error) {
          console.error('Error updating prompt count:', error);
        }
      }
    } catch (error) {
      console.error('Error generating story:', error);
      setSubjectError('Failed to generate story. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const resetFormData = () => {
    setFormData(initialFormData);
    setShowPrompt(false);
    setGeneratedPrompt('');
    setCopied(false);
    setGenCount(0);
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

  const copyAndOpenChatGPT = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      window.open('https://chat.openai.com', '_blank');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
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
        Loading...
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
      <div className="generator-flex-layout">
        <Sidebar />
        <main
          className={`generator-main-content transition-all duration-300 ml-0 mr-0${sidebarExpanded ? ' lg:ml-64' : ' lg:ml-20'} lg:mr-[320px] ${isOpen ? 'block lg:block hidden' : ''}`}
        >
          <div
            className="generator-main"
            style={{ maxWidth: '900px', margin: '0 auto' }}
          >
            <Header
              title="AI Story Prompt Generator"
              subtitle="Create detailed story prompts for ChatGPT, Gemini, and other AI tools"
              icon="📖"
            />
            <Instructions
              title="How to Use"
              steps={[
                'Enter your story idea and key parameters',
                'Describe characters, setting, conflict, and desired structure',
                'Add any special elements or twists',
                'Generate your professional story prompt',
                'Copy and use with AI story generators like ChatGPT or Gemini',
              ]}
            />
            <StoryPromptGeneratorForm
              formData={formData}
              onFormDataChange={onFormDataChange}
            />
            {user && (
              <div className="prompt-generation-count">
                {subscriptionStatus === 'active'
                  ? 'You have unlimited prompt generations.'
                  : genCount > 0
                    ? `You have ${genCount} prompt generations left.`
                    : 'You have reached your prompt generation limit.'}
              </div>
            )}
            <GenerateButton
              onGenerate={generatePrompt}
              onReset={resetFormData}
              disabled={
                (subscriptionStatus !== 'active' && genCount <= 0) ||
                isGenerating
              }
            />

            <SubscribePrompt
              user={user}
              subscriptionStatus={subscriptionStatus}
              genCount={genCount}
              onSubscribe={() => user && handleSubscribePayment(user)}
            />
            {isGenerating && (
              <div className="flex justify-center my-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
                <span className="ml-4 text-cyan-400 text-lg">
                  Generating your story...
                </span>
              </div>
            )}

            {showPrompt && (
              <div className="generator-prompt-section">
                <PromptDisplay
                  prompt={generatedPrompt}
                  onCopy={copyToClipboard}
                  copied={copied}
                />

                <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Story By Chatgpt Result :
                  </h3>
                  <div className="prose prose-invert max-w-none">
                    {isGenerating && (
                      <div className="flex justify-center my-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
                        <span className="ml-4 text-cyan-400 text-lg">
                          Generating your story...
                        </span>
                      </div>
                    )}
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
                    {copied ? 'Copied!' : 'Copy Story'}
                  </button>
                </div>
              </div>
            )}
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
