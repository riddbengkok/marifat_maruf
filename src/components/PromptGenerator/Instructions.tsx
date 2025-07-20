'use client';

interface InstructionsProps {
  title?: string;
  steps?: string[];
}

export default function Instructions({
  title = '📖 How to Use:',
  steps,
}: InstructionsProps) {
  const defaultSteps = [
    'Fill in the 🎯 Subject field (required) - this is the main focus of your image',
    'Select a 🎨 Style to define the artistic approach',
    'Add 🌍 Setting/Environment to place your subject in context',
    'Choose ⚡ Vibe/Energy to set the overall feeling',
    'Select 😊 Mood for emotional tone',
    'Pick 🌫️ Atmosphere for environmental conditions',
    'Choose 📷 Point of View for camera perspective',
    'Select ✋ Sensory Feeling for tactile qualities',
    'Add 🌤️ Weather, 🕐 Time of Day, and 🌸 Season for context',
    'Choose 🎨 Color Palette, 🔲 Textures, and 🧱 Materials',
    'Select 💭 Emotions and 🏃 Actions/Movement',
    'Pick 📐 Aspect Ratio and 🖼️ Composition',
    'Add 📝 Additional Details and 🔍 Specific Elements',
    'Choose your target 🤖 AI Model for optimized formatting',
    'Click 🚀 Generate Detailed Prompt and copy the result to your AI tool',
  ];

  const displaySteps = steps || defaultSteps;

  return (
    <div
      style={{
        backgroundColor: '#1a1a1a',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid #333',
      }}
      className="mb-6"
    >
      <h3 style={{ margin: '0 0 16px 0', color: '#00ffff' }}>{title}</h3>
      <ul style={{ margin: '0', paddingLeft: '20px', lineHeight: '1.6' }}>
        {displaySteps.map((step, index) => (
          <li key={index} style={{ marginBottom: '8px' }}>
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
}
