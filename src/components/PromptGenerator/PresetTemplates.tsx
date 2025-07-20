'use client';

import { FormData } from './FormData';

interface PresetTemplatesProps {
  onApplyTemplate: (template: Partial<FormData>, templateName: string) => void;
}

export default function PresetTemplates({
  onApplyTemplate,
}: PresetTemplatesProps) {
  const templates = [
    {
      name: 'Cinematic Trailer',
      icon: '🎬',
      description: 'Epic cinematic video with dramatic lighting and movement',
      template: {
        subject: 'epic cinematic scene',
        style: 'cinematic',
        setting: 'urban cityscape',
        cameraMovement: 'dolly in',
        videoStyle: 'cinematic',
        lighting: 'artificial lighting',
        pov: 'medium shot',
        composition: 'rule of thirds',
        vibe: 'dramatic',
        mood: 'intense',
        atmosphere: 'foggy',
        weather: 'cloudy',
        timeOfDay: 'night',
        season: 'autumn',
        windSpeed: 'moderate',
        visibility: 'hazy',
        sense: 'visual',
        colors: 'warm tones',
        textures: 'smooth',
        materials: 'metal',
        temperature: 'cool',
        humidity: 'moderate',
        aspectRatio: '16:9',
        quality: 'high',
        frameRate: '24 fps',
        videoDuration: '30 seconds',
        movementSpeed: 'slow',
        movementDirection: 'forward',
        lightIntensity: 'dramatic',
        lightDirection: 'from the side',
        lightColor: 'warm',
        povDistance: 'medium',
        povLensType: 'normal',
        compositionBalance: 'asymmetrical',
        compositionDepth: 'deep',
        atmosphereDensity: 'medium',
        atmosphereMovement: 'gentle',
        emotions: 'excitement',
        actions: 'walking',
        actionSpeed: 'normal speed',
        energyLevel: 'high energy',
        transition: 'fade in',
        details: 'dramatic lighting and shadows',
        additionalDetails: 'cinematic color grading',
        model: 'runway',
      } as Partial<FormData>,
      color: '#7dd8e0',
    },
    {
      name: 'Product Commercial',
      icon: '📱',
      description: 'Professional product showcase with clean aesthetics',
      template: {
        subject: 'premium product showcase',
        style: 'commercial',
        setting: 'indoor studio',
        cameraMovement: 'zoom in',
        videoStyle: 'commercial',
        lighting: 'studio lighting',
        pov: 'close up',
        composition: 'centered',
        vibe: 'modern',
        mood: 'serious',
        atmosphere: 'clear',
        weather: 'calm',
        timeOfDay: 'afternoon',
        season: 'summer',
        windSpeed: 'calm',
        visibility: 'clear',
        sense: 'tactile',
        colors: 'vibrant',
        textures: 'smooth',
        materials: 'glass',
        temperature: 'room temperature',
        humidity: 'dry',
        aspectRatio: '16:9',
        quality: 'high',
        frameRate: '30 fps',
        videoDuration: '15 seconds',
        movementSpeed: 'slow',
        movementDirection: 'forward',
        lightIntensity: 'bright',
        lightDirection: 'front',
        lightColor: 'white',
        povDistance: 'close',
        povLensType: 'normal',
        compositionBalance: 'symmetrical',
        compositionDepth: 'shallow',
        atmosphereDensity: 'thin',
        atmosphereMovement: 'still',
        emotions: 'excitement',
        actions: 'standing',
        actionSpeed: 'normal speed',
        energyLevel: 'moderate',
        transition: 'cut',
        details: 'clean product presentation',
        additionalDetails: 'professional lighting setup',
        model: 'runway',
      } as Partial<FormData>,
      color: '#6b9ac4',
    },
    {
      name: 'Nature Documentary',
      icon: '🌿',
      description: 'Peaceful nature scenes with organic movement',
      template: {
        subject: 'breathtaking nature landscape',
        style: 'documentary',
        setting: 'mountain landscape',
        cameraMovement: 'pan left',
        videoStyle: 'documentary',
        lighting: 'natural daylight',
        pov: 'wide shot',
        composition: 'leading lines',
        vibe: 'peaceful',
        mood: 'calm',
        atmosphere: 'clear',
        weather: 'sunny',
        timeOfDay: 'golden hour',
        season: 'spring',
        windSpeed: 'light breeze',
        visibility: 'clear',
        sense: 'visual',
        colors: 'earth tones',
        textures: 'smooth',
        materials: 'stone',
        temperature: 'warm',
        humidity: 'moderate',
        aspectRatio: '16:9',
        quality: 'high',
        frameRate: '24 fps',
        videoDuration: '60 seconds',
        movementSpeed: 'slow',
        movementDirection: 'smooth',
        lightIntensity: 'soft',
        lightDirection: 'from above',
        lightColor: 'warm',
        povDistance: 'long',
        povLensType: 'wide angle',
        compositionBalance: 'organic',
        compositionDepth: 'deep',
        atmosphereDensity: 'thin',
        atmosphereMovement: 'gentle',
        emotions: 'wonder',
        actions: 'walking',
        actionSpeed: 'slow motion',
        energyLevel: 'calm',
        transition: 'cross fade',
        details: 'natural wildlife and vegetation',
        additionalDetails: 'atmospheric nature sounds',
        model: 'runway',
      } as Partial<FormData>,
      color: '#7fb069',
    },
    {
      name: 'Action Sequence',
      icon: '⚡',
      description: 'High-energy action with dynamic camera work',
      template: {
        subject: 'intense action sequence',
        style: 'action',
        setting: 'urban cityscape',
        cameraMovement: 'handheld shake',
        videoStyle: 'action',
        lighting: 'artificial lighting',
        pov: 'point of view',
        composition: 'diagonal',
        vibe: 'energetic',
        mood: 'intense',
        atmosphere: 'stormy',
        weather: 'stormy',
        timeOfDay: 'evening',
        season: 'autumn',
        windSpeed: 'strong',
        visibility: 'hazy',
        sense: 'movement',
        colors: 'vibrant',
        textures: 'rough',
        materials: 'metal',
        temperature: 'cool',
        humidity: 'humid',
        aspectRatio: '16:9',
        quality: 'high',
        frameRate: '60 fps',
        videoDuration: '20 seconds',
        movementSpeed: 'fast',
        movementDirection: 'jerky',
        lightIntensity: 'intense',
        lightDirection: 'from the side',
        lightColor: 'cool',
        povDistance: 'close',
        povLensType: 'wide angle',
        compositionBalance: 'diagonal',
        compositionDepth: 'shallow',
        atmosphereDensity: 'thick',
        atmosphereMovement: 'turbulent',
        emotions: 'excitement',
        actions: 'running',
        actionSpeed: 'fast motion',
        energyLevel: 'explosive',
        transition: 'whip pan',
        details: 'dynamic movement and action',
        additionalDetails: 'special effects and explosions',
        model: 'runway',
      } as Partial<FormData>,
      color: '#e8a5c4',
    },
    {
      name: 'Artistic Abstract',
      icon: '🎨',
      description: 'Creative abstract visuals with artistic flair',
      template: {
        subject: 'abstract artistic composition',
        style: 'artistic',
        setting: 'abstract space',
        cameraMovement: 'circular motion',
        videoStyle: 'artistic',
        lighting: 'artificial lighting',
        pov: 'wide shot',
        composition: 'circular',
        vibe: 'creative',
        mood: 'whimsical',
        atmosphere: 'misty',
        weather: 'foggy',
        timeOfDay: 'dawn',
        season: 'spring',
        windSpeed: 'gentle',
        visibility: 'misty',
        sense: 'light',
        colors: 'vibrant',
        textures: 'textured',
        materials: 'glass',
        temperature: 'warm',
        humidity: 'humid',
        aspectRatio: '16:9',
        quality: 'high',
        frameRate: '30 fps',
        videoDuration: '45 seconds',
        movementSpeed: 'variable',
        movementDirection: 'circular',
        lightIntensity: 'moody',
        lightDirection: '45-degree',
        lightColor: 'purple',
        povDistance: 'medium',
        povLensType: 'fisheye',
        compositionBalance: 'radial',
        compositionDepth: 'infinite',
        atmosphereDensity: 'wispy',
        atmosphereMovement: 'flowing',
        emotions: 'wonder',
        actions: 'dancing',
        actionSpeed: 'variable speed',
        energyLevel: 'delicate',
        transition: 'morph',
        details: 'abstract shapes and forms',
        additionalDetails: 'creative visual effects',
        model: 'runway',
      } as Partial<FormData>,
      color: '#f4a261',
    },
  ];

  return (
    <div className="preset-templates">
      {/* Decorative top border */}
      <div className="preset-templates__top-border" />

      <h3 className="preset-templates__title">
        <span style={{ fontSize: '24px' }}>🚀</span>
        Quick Start Templates
      </h3>

      <p className="preset-templates__desc">
        Choose a template to quickly set up common video styles, then customize
        as needed.
      </p>

      <div className="preset-templates__grid">
        {templates.map((template, index) => (
          <div
            key={index}
            className="preset-templates__card"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.04)',
              boxShadow: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
              e.currentTarget.style.borderColor = `${template.color}40`;
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 8px 25px ${template.color}20`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onClick={() => onApplyTemplate(template.template, template.name)}
          >
            {/* Template color accent */}
            <div
              className="preset-templates__card-accent"
              style={{ background: template.color }}
            />

            <div className="preset-templates__card-header">
              <span className="preset-templates__card-icon">
                {template.icon}
              </span>
              <h4 className="preset-templates__card-title">{template.name}</h4>
            </div>

            <p className="preset-templates__card-desc">
              {template.description}
            </p>

            <button
              className="preset-templates__card-btn"
              style={{
                background: `linear-gradient(135deg, ${template.color}20, ${template.color}10)`,
                border: `1px solid ${template.color}40`,
                color: template.color,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `${template.color}30`;
                e.currentTarget.style.borderColor = `${template.color}60`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = `linear-gradient(135deg, ${template.color}20, ${template.color}10)`;
                e.currentTarget.style.borderColor = `${template.color}40`;
              }}
            >
              Apply Template
            </button>
          </div>
        ))}
      </div>

      {/* Bottom decoration */}
      <div className="preset-templates__bottom-bar" />
    </div>
  );
}
