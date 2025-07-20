export interface FormData {
  // Core Elements
  subject: string;
  style: string;
  setting: string;

  // Visual & Technical
  lighting: string;
  pov: string;
  composition: string;
  aspectRatio: string;
  quality: string;

  // Video-Specific Parameters
  cameraMovement: string;
  videoDuration: string;
  frameRate: string;
  videoStyle: string;
  transition: string;

  // Nested Camera Movement Options
  movementSpeed: string;
  movementDirection: string;

  // Nested Video Style Options
  cinematicStyle: string;
  animationStyle: string;

  // Nested Lighting Options
  lightIntensity: string;
  lightDirection: string;
  lightColor: string;

  // Nested POV Options
  povDistance: string;
  povLensType: string;

  // Nested Composition Options
  compositionBalance: string;
  compositionDepth: string;

  // Atmosphere & Mood
  vibe: string;
  mood: string;
  atmosphere: string;
  emotions: string;

  // Nested Atmosphere Options
  atmosphereDensity: string;
  atmosphereMovement: string;

  // Environment & Context
  weather: string;
  timeOfDay: string;
  season: string;

  // Nested Environment Options
  windSpeed: string;
  visibility: string;

  // Sensory & Material
  sense: string;
  colors: string;
  textures: string;
  materials: string;

  // Nested Sensory Options
  temperature: string;
  humidity: string;

  // Action & Details
  actions: string;
  details: string;
  additionalDetails: string;

  // Nested Action Options
  actionSpeed: string;
  energyLevel: string;

  // Technical
  model: string;
}

export interface ImageFormData {
  // Core Elements
  subject: string;
  style: string;
  setting: string;

  // Visual & Technical
  lighting: string;
  pov: string;
  composition: string;
  aspectRatio: string;
  quality: string;

  // Nested Lighting Options
  lightIntensity: string;
  lightDirection: string;
  lightColor: string;

  // Nested POV Options
  povDistance: string;
  povLensType: string;

  // Nested Composition Options
  compositionBalance: string;
  compositionDepth: string;

  // Atmosphere & Mood
  vibe: string;
  mood: string;
  atmosphere: string;
  emotions: string;

  // Nested Atmosphere Options
  atmosphereDensity: string;
  atmosphereMovement: string;

  // Environment & Context
  weather: string;
  timeOfDay: string;
  season: string;

  // Nested Environment Options
  windSpeed: string;
  visibility: string;

  // Sensory & Material
  sense: string;
  colors: string;
  textures: string;
  materials: string;

  // Nested Sensory Options
  temperature: string;
  humidity: string;

  // Action & Details
  actions: string;
  details: string;
  additionalDetails: string;

  // Nested Action Options
  actionSpeed: string;
  energyLevel: string;

  // Technical
  model: string;
}

export const formOptions = {
  // Core Elements
  styles: [
    'cinematic',
    'documentary',
    'commercial',
    'music video',
    'short film',
    'animation',
    'stop motion',
    '3D animation',
    '2D animation',
    'live action',
    'vintage',
    'modern',
    'futuristic',
    'retro',
    'artistic',
    'realistic',
  ],

  settings: [
    'urban cityscape',
    'rural countryside',
    'beach/ocean',
    'mountain landscape',
    'forest/jungle',
    'desert',
    'space/planets',
    'underwater',
    'indoor studio',
    'office building',
    'residential home',
    'school/university',
    'hospital',
    'restaurant/cafe',
    'shopping mall',
    'airport',
    'train station',
    'park',
    'amusement park',
    'concert venue',
    'theater',
    'museum',
    'library',
    'factory/warehouse',
    'construction site',
    'farm',
    'garden',
    'rooftop',
    'basement',
    'attic',
    'garage',
    'kitchen',
    'bedroom',
    'living room',
    'bathroom',
    'dining room',
    'home office',
    'gym',
    'pool',
  ],

  // Visual & Technical
  lighting: [
    'natural daylight',
    'golden hour',
    'blue hour',
    'sunset',
    'sunrise',
    'moonlight',
    'starlight',
    'artificial lighting',
    'studio lighting',
    'neon lighting',
    'candlelight',
    'firelight',
    'street lighting',
    'fluorescent',
    'LED',
    'incandescent',
    'spotlight',
    'backlight',
    'side lighting',
    'top lighting',
    'bottom lighting',
    'ambient',
  ],

  pov: [
    'eye level',
    'low angle',
    'high angle',
    "bird's eye view",
    "worm's eye view",
    'over the shoulder',
    'point of view',
    'wide shot',
    'medium shot',
    'close up',
    'extreme close up',
    'long shot',
    'establishing shot',
    'tracking shot',
    'dolly shot',
    'crane shot',
    'handheld',
    'steady cam',
  ],

  composition: [
    'rule of thirds',
    'symmetrical',
    'asymmetrical',
    'leading lines',
    'framing',
    'depth of field',
    'shallow focus',
    'deep focus',
    'negative space',
    'centered',
    'diagonal',
    'triangular',
    'circular',
  ],

  aspectRatios: [
    '16:9',
    '9:16',
    '4:3',
    '3:2',
    '1:1',
    '21:9',
    '2.35:1',
    '1.85:1',
  ],

  quality: ['high', 'ultra high', '4K', '8K', 'HD', 'standard'],

  // Video-Specific Parameters
  cameraMovements: [
    'static',
    'pan left',
    'pan right',
    'tilt up',
    'tilt down',
    'zoom in',
    'zoom out',
    'dolly in',
    'dolly out',
    'track left',
    'track right',
    'crane up',
    'crane down',
    'handheld shake',
    'smooth tracking',
    'circular motion',
    'spiral',
    'orbit',
    'push in',
    'pull out',
    'rise',
    'fall',
    'swing',
    'whip pan',
  ],

  videoDurations: [
    '5 seconds',
    '10 seconds',
    '15 seconds',
    '30 seconds',
    '1 minute',
    '2 minutes',
    '3 minutes',
    '5 minutes',
    '10 minutes',
    '15 minutes',
  ],

  frameRates: [
    '24 fps',
    '25 fps',
    '30 fps',
    '50 fps',
    '60 fps',
    '120 fps',
    '240 fps',
  ],

  videoStyles: [
    'cinematic',
    'documentary',
    'commercial',
    'music video',
    'vlog',
    'tutorial',
    'interview',
    'news',
    'sports',
    'nature',
    'travel',
    'food',
    'fashion',
    'beauty',
    'gaming',
    'educational',
    'corporate',
  ],

  transitions: [
    'cut',
    'fade in',
    'fade out',
    'cross fade',
    'dissolve',
    'wipe left',
    'wipe right',
    'wipe up',
    'wipe down',
    'zoom transition',
    'slide left',
    'slide right',
    'slide up',
    'slide down',
    'morph',
    'strobe',
    'flash',
    'blur transition',
    'color transition',
  ],

  // Nested Camera Movement Options
  movementSpeeds: [
    'slow',
    'medium',
    'fast',
    'very slow',
    'very fast',
    'variable',
  ],

  movementDirections: [
    'forward',
    'backward',
    'left',
    'right',
    'up',
    'down',
    'diagonal',
    'circular',
    'spiral',
    'random',
    'smooth',
    'jerky',
  ],

  // Nested Video Style Options
  cinematicStyles: [
    'Hollywood',
    'indie',
    'arthouse',
    'noir',
    'western',
    'sci-fi',
    'horror',
    'romance',
    'action',
    'drama',
    'comedy',
    'thriller',
  ],

  animationStyles: [
    '3D CGI',
    '2D animation',
    'stop motion',
    'claymation',
    'puppetry',
    'cel animation',
    'digital animation',
    'motion graphics',
    'whiteboard',
    'infographic',
    'cartoon',
    'anime',
    'realistic',
    'stylized',
  ],

  // Nested Lighting Options
  lightIntensities: [
    'soft',
    'harsh',
    'bright',
    'dim',
    'dramatic',
    'subtle',
    'intense',
    'gentle',
    'moody',
    'cheerful',
    'mysterious',
    'warm',
  ],

  lightDirections: [
    'front',
    'back',
    'side',
    'top',
    'bottom',
    '45-degree',
    'from above',
    'from below',
    'from behind',
    'from the side',
  ],

  lightColors: [
    'warm',
    'cool',
    'natural',
    'white',
    'yellow',
    'orange',
    'red',
    'blue',
    'green',
    'purple',
    'pink',
    'cyan',
    'magenta',
  ],

  // Nested POV Options
  povDistances: [
    'extreme close',
    'close',
    'medium',
    'long',
    'extreme long',
    'intimate',
    'personal',
    'social',
    'public',
    'epic',
  ],

  povLensTypes: [
    'wide angle',
    'normal',
    'telephoto',
    'macro',
    'fisheye',
    'tilt-shift',
    'anamorphic',
    'prime',
    'zoom',
    'portrait',
  ],

  // Nested Composition Options
  compositionBalances: [
    'symmetrical',
    'asymmetrical',
    'radial',
    'diagonal',
    'horizontal',
    'vertical',
    'triangular',
    'circular',
    'linear',
    'organic',
  ],

  compositionDepths: [
    'shallow',
    'medium',
    'deep',
    'infinite',
    'selective',
    'full',
  ],

  // Atmosphere & Mood
  vibes: [
    'energetic',
    'calm',
    'mysterious',
    'romantic',
    'dramatic',
    'peaceful',
    'intense',
    'playful',
    'serious',
    'whimsical',
    'dark',
    'bright',
    'warm',
    'cool',
    'vintage',
    'modern',
  ],

  moods: [
    'happy',
    'sad',
    'excited',
    'melancholy',
    'anxious',
    'relaxed',
    'nostalgic',
    'hopeful',
    'mysterious',
    'romantic',
    'dramatic',
    'peaceful',
    'intense',
    'playful',
    'serious',
    'whimsical',
  ],

  atmospheres: [
    'foggy',
    'clear',
    'misty',
    'dusty',
    'smoky',
    'hazy',
    'crisp',
    'windy',
    'still',
    'stormy',
  ],

  emotions: [
    'joy',
    'sadness',
    'anger',
    'fear',
    'surprise',
    'disgust',
    'love',
    'hate',
    'excitement',
    'boredom',
    'anxiety',
    'calm',
    'nostalgia',
    'hope',
    'despair',
    'wonder',
    'curiosity',
    'awe',
  ],

  // Nested Atmosphere Options
  atmosphereDensities: ['thin', 'medium', 'thick', 'light', 'heavy', 'wispy'],

  atmosphereMovements: [
    'still',
    'gentle',
    'swirling',
    'turbulent',
    'flowing',
    'dancing',
  ],

  // Environment & Context
  weather: [
    'sunny',
    'cloudy',
    'rainy',
    'snowy',
    'stormy',
    'foggy',
    'windy',
    'calm',
    'hot',
    'cold',
    'humid',
    'dry',
  ],

  timeOfDay: [
    'dawn',
    'morning',
    'noon',
    'afternoon',
    'dusk',
    'evening',
    'night',
    'midnight',
    'early morning',
    'late afternoon',
  ],

  seasons: ['spring', 'summer', 'autumn', 'winter', 'monsoon', 'dry season'],

  // Nested Environment Options
  windSpeeds: ['calm', 'light breeze', 'moderate', 'strong', 'gale', 'storm'],

  visibilities: ['clear', 'hazy', 'foggy', 'misty', 'smoky', 'dusty'],

  // Sensory & Material
  senses: [
    'visual',
    'tactile',
    'auditory',
    'olfactory',
    'gustatory',
    'texture',
    'weight',
    'movement',
    'light',
  ],

  colors: [
    'monochrome',
    'colorful',
    'pastel',
    'vibrant',
    'muted',
    'warm tones',
    'cool tones',
    'earth tones',
    'neon',
    'metallic',
  ],

  textures: [
    'smooth',
    'rough',
    'soft',
    'hard',
    'shiny',
    'matte',
    'glossy',
    'textured',
    'patterned',
    'solid',
    'transparent',
  ],

  materials: [
    'metal',
    'wood',
    'glass',
    'plastic',
    'fabric',
    'stone',
    'ceramic',
    'leather',
    'paper',
    'concrete',
    'marble',
    'granite',
  ],

  // Nested Sensory Options
  temperatures: ['warm', 'cool', 'hot', 'cold', 'room temperature', 'freezing'],

  humidities: ['dry', 'moderate', 'humid', 'very humid', 'arid', 'tropical'],

  // Action & Details
  actions: [
    'walking',
    'running',
    'jumping',
    'dancing',
    'sitting',
    'standing',
    'talking',
    'laughing',
    'crying',
    'working',
    'playing',
    'cooking',
    'driving',
    'flying',
    'swimming',
    'climbing',
    'falling',
    'rising',
  ],

  additionalDetails: [
    'special effects',
    'particles',
    'smoke',
    'fire',
    'water',
    'lighting effects',
    'shadows',
    'reflections',
    'mirrors',
    'lenses',
  ],

  // Nested Action Options
  actionSpeeds: [
    'slow motion',
    'normal speed',
    'fast motion',
    'time lapse',
    'bullet time',
    'freeze frame',
    'variable speed',
  ],

  energyLevels: [
    'low energy',
    'moderate',
    'high energy',
    'explosive',
    'calm',
    'relaxed',
    'intense',
    'gentle',
    'powerful',
    'delicate',
  ],

  // Technical
  models: [
    'runway',
    'pika labs',
    'stable video diffusion',
    'gen-2',
    'gen-3',
    'midjourney video',
    'dall-e video',
    'sora',
    'text-to-video',
  ],
};
