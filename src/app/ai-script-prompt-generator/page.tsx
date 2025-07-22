'use client';

import GenerateButton from '@/components/PromptGenerator/GenerateButton';
import Header from '@/components/PromptGenerator/Header';
import Instructions from '@/components/PromptGenerator/Instructions';
import ProgressIndicator from '@/components/PromptGenerator/ProgressIndicator';
import PromptDisplay from '@/components/PromptGenerator/PromptDisplay';
import { StoryFormData } from '@/components/PromptGenerator/StoryFormData';
import StoryPromptGeneratorForm from '@/components/PromptGenerator/StoryPromptGeneratorForm';
import { useAuth } from '@/hooks/useAuth';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import '../../components/PromptGenerator/PromptGenerator.css';

const Sidebar = dynamic(() => import('@/components/Sidebar'), { ssr: false });

const FORM_STORAGE_KEY = 'ai-script-prompt-form';

const sectionFields = [
  { name: 'Core Elements', fields: ['genre', 'setting', 'mainCharacter'] },
  { name: 'Conflict & Theme', fields: ['conflict', 'theme', 'goal'] },
  { name: 'Plot Structure', fields: ['beginning', 'middle', 'end', 'twist'] },
  { name: 'Style & Tone', fields: ['tone', 'style', 'pov'] },
  { name: 'Additional Details', fields: ['inspiration', 'customInstructions'] },
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

export default function AIScriptPromptGenerator() {
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
  const [showPrompt, setShowPrompt] = useState(false);
  const [copied, setCopied] = useState(false);
  const promptRef = useRef<HTMLDivElement>(null);
  const [genCount, setGenCount] = useState<number>(0);
  const [subjectError, setSubjectError] = useState<string | null>(null);
  const { user } = useAuth();
  const [subscriptionStatus, setSubscriptionStatus] = useState<
    'active' | 'inactive' | 'none' | null
  >(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData]);

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
    if (!formData.genre.trim()) {
      setSubjectError('Please enter a genre for your script');
      return;
    }
    if (!formData.setting.trim()) {
      setSubjectError('Please enter a setting for your script');
      return;
    }
    if (!formData.mainCharacter.trim() && !formData.protagonistName.trim()) {
      setSubjectError(
        'Please enter a main character or protagonist name for your script'
      );
      return;
    }
    setSubjectError(null);
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
    if (formData.worldRules) parts.push(`World Rules: ${formData.worldRules}`);
    if (formData.magicSystem)
      parts.push(`Magic System: ${formData.magicSystem}`);
    if (formData.technology) parts.push(`Technology: ${formData.technology}`);
    if (formData.specialElements)
      parts.push(`Special Elements: ${formData.specialElements}`);
    if (formData.additionalNotes)
      parts.push(`Additional Notes: ${formData.additionalNotes}`);
    const prompt = `create a detailed script or screenplay based on the specifications below:\n\n${parts.join('\n')}`;
    setGeneratedPrompt(prompt);
    setShowPrompt(true);
    setCopied(false);
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
        <main className="generator-main-content">
          <div
            className="generator-main"
            style={{ maxWidth: '900px', margin: '0 auto' }}
          >
            <Header
              title="AI Script Prompt Generator"
              subtitle="Create detailed script or screenplay prompts for ChatGPT, Gemini, and other AI tools"
              icon="🎬"
            />
            <Instructions
              title="How to Use"
              steps={[
                'Enter your script idea and key parameters',
                'Describe characters, setting, conflict, and desired structure',
                'Add any special elements or twists',
                'Generate your professional script prompt',
                'Copy and use with AI script generators like ChatGPT or Gemini',
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
              onClick={generatePrompt}
              onReset={resetFormData}
              disabled={subscriptionStatus !== 'active' && genCount <= 0}
            />
            {showPrompt && (
              <div className="generator-prompt-section">
                <PromptDisplay
                  prompt={generatedPrompt}
                  onCopy={copyToClipboard}
                  copied={copied}
                />
                {/* Suggestion for ChatGPT/Gemini */}
                <div className="story-suggestion-box">
                  <div className="story-suggestion-box-desc">
                    Paste this prompt into <b>ChatGPT</b> or <b>Gemini</b> and
                    ask:
                    <br />
                    <span className="story-suggestion-box-italic">
                      Write a script based on this prompt.
                    </span>
                  </div>
                  <button
                    onClick={copyAndOpenChatGPT}
                    className="story-suggestion-btn"
                  >
                    Copy &amp; Open ChatGPT
                  </button>
                </div>
              </div>
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
