'use client';

import GenerateButton from '@/components/PromptGenerator/GenerateButton';
import Header from '@/components/PromptGenerator/Header';
import Instructions from '@/components/PromptGenerator/Instructions';
import PromptDisplay from '@/components/PromptGenerator/PromptDisplay';
import { StoryFormData } from '@/components/PromptGenerator/StoryFormData';
import StoryPromptGeneratorForm from '@/components/PromptGenerator/StoryPromptGeneratorForm';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

// Dynamic import for Sidebar with SSR disabled
const Sidebar = dynamic(() => import('@/components/Sidebar'), { ssr: false });

const FORM_STORAGE_KEY = 'ai-story-prompt-form';

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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData]);

  const onFormDataChange = (field: keyof StoryFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generatePrompt = () => {
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
    const prompt = `create an interesting full story based on the specifications below:\n\n${parts.join('\n')}`;
    setGeneratedPrompt(prompt);
    setShowPrompt(true);
    setCopied(false);
  };

  const resetFormData = () => {
    setFormData(initialFormData);
    setShowPrompt(false);
    setGeneratedPrompt('');
    setCopied(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(FORM_STORAGE_KEY);
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

  return (
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
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
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
          <GenerateButton onClick={generatePrompt} onReset={resetFormData} />
          {showPrompt && (
            <div style={{ marginTop: '32px' }}>
              <PromptDisplay
                prompt={generatedPrompt}
                onCopy={copyToClipboard}
                copied={copied}
              />
              {/* Suggestion for ChatGPT/Gemini */}
              <div
                style={{
                  marginTop: '24px',
                  padding: '20px',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '15px',
                    color: '#7dd8e0',
                    marginBottom: '12px',
                  }}
                >
                  Paste this prompt into <b>ChatGPT</b> or <b>Gemini</b> and
                  ask:
                  <br />
                  <span style={{ color: '#fff', fontStyle: 'italic' }}>
                    Write a story based on this prompt.
                  </span>
                </div>
                <button
                  onClick={copyAndOpenChatGPT}
                  style={{
                    background: 'linear-gradient(135deg, #7dd8e0, #6b9ac4)',
                    color: '#000',
                    fontWeight: 600,
                    padding: '12px 28px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    boxShadow: '0 2px 12px rgba(125,216,224,0.15)',
                    marginTop: '8px',
                  }}
                >
                  Copy &amp; Open ChatGPT
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
