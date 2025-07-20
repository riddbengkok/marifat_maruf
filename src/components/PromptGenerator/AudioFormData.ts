export interface AudioFormData {
  // Core Elements
  subject: string;
  soundType: string; // New field: sound effect, music, ambience
  genre: string;
  mood: string;
  style: string;

  // Audio-Specific Parameters
  tempo: string;
  key: string;
  timeSignature: string;
  duration: string;
  audioQuality: string;

  // Nested Tempo Options
  tempoSpeed: string;
  tempoFeel: string;

  // Nested Key Options
  keyModality: string;
  keyComplexity: string;

  // Nested Style Options
  productionStyle: string;
  arrangementStyle: string;

  // Instrumentation & Sound
  instruments: string;
  vocals: string;
  effects: string;
  soundDesign: string;

  // Nested Instrumentation Options
  primaryInstruments: string;
  secondaryInstruments: string;
  percussionType: string;

  // Nested Effects Options
  reverbType: string;
  delayType: string;
  distortionType: string;

  // Nested Sound Design Options
  ambienceType: string;
  textureType: string;

  // Atmosphere & Emotion
  atmosphere: string;
  emotions: string;
  energy: string;
  intensity: string;

  // Nested Atmosphere Options
  atmosphereDensity: string;
  atmosphereMovement: string;

  // Nested Energy Options
  energyLevel: string;
  energyFlow: string;

  // Context & Setting
  setting: string;
  timeOfDay: string;
  season: string;
  location: string;

  // Nested Context Options
  environmentType: string;
  spatialDepth: string;

  // Sensory & Texture
  textures: string;
  colors: string;
  materials: string;
  sensations: string;

  // Nested Sensory Options
  temperature: string;
  humidity: string;

  // Dynamics & Movement
  dynamics: string;
  movement: string;
  rhythm: string;
  flow: string;

  // Nested Dynamics Options
  dynamicRange: string;
  dynamicContrast: string;

  // Nested Movement Options
  movementSpeed: string;
  movementDirection: string;

  // Additional Details
  additionalDetails: string;
  references: string;
  technicalNotes: string;

  // Technical
  model: string;
}

export const audioFormOptions = {
  // Core Elements
  soundTypes: ['sound effect', 'music', 'ambience'],

  // Sound Effect specific options
  soundEffectTypes: [
    'explosion',
    'gunshot',
    'footsteps',
    'door slam',
    'glass breaking',
    'car engine',
    'sirens',
    'phone ring',
    'notification',
    'button click',
    'sword swing',
    'magic spell',
    'thunder',
    'wind',
    'water splash',
    'fire crackling',
    'metal clang',
    'wood creak',
    'paper rustle',
    'clock tick',
  ],

  // Ambience specific options
  ambienceTypes: [
    'forest',
    'jungle',
    'ocean',
    'beach',
    'mountain',
    'desert',
    'city',
    'suburb',
    'office',
    'restaurant',
    'hospital',
    'school',
    'library',
    'church',
    'cafe',
    'park',
    'garden',
    'farm',
    'factory',
    'warehouse',
    'airport',
    'train station',
    'busy street',
    'quiet street',
    'rainy day',
    'snowy day',
    'windy day',
    'stormy night',
    'peaceful night',
    'busy morning',
  ],

  // Animal sounds for ambience
  animalSounds: [
    'birds chirping',
    'crickets',
    'frogs',
    'wolves howling',
    'dogs barking',
    'cats meowing',
    'horses neighing',
    'cows mooing',
    'sheep bleating',
    'chickens clucking',
    'ducks quacking',
    'geese honking',
    'owls hooting',
    'eagles screeching',
    'dolphins clicking',
    'whales singing',
    'insects buzzing',
    'bees humming',
    'cicadas',
    'monkeys chattering',
  ],

  // Weather sounds for ambience
  weatherSounds: [
    'rain falling',
    'thunder',
    'lightning',
    'wind blowing',
    'snow falling',
    'hail',
    'storm',
    'drizzle',
    'heavy rain',
    'gentle rain',
    'rain on roof',
    'rain on leaves',
    'rain on pavement',
    'wind through trees',
    'wind through grass',
    'wind chimes',
    'snow crunching',
    'ice cracking',
    'fog',
    'mist',
  ],

  genres: [
    'pop',
    'rock',
    'jazz',
    'classical',
    'electronic',
    'hip-hop',
    'country',
    'folk',
    'blues',
    'reggae',
    'funk',
    'soul',
    'r&b',
    'punk',
    'metal',
    'ambient',
    'chillout',
    'dance',
    'house',
    'techno',
    'trance',
    'dubstep',
    'lo-fi',
    'synthwave',
    'retro',
    'vintage',
    'modern',
    'experimental',
    'world music',
    'soundtrack',
    'orchestral',
    'acoustic',
  ],

  moods: [
    'happy',
    'sad',
    'melancholic',
    'energetic',
    'calm',
    'peaceful',
    'mysterious',
    'dark',
    'uplifting',
    'romantic',
    'nostalgic',
    'dreamy',
    'epic',
    'intense',
    'relaxing',
    'motivational',
    'emotional',
    'dramatic',
    'playful',
    'serious',
    'contemplative',
    'excited',
    'anxious',
    'confident',
    'vulnerable',
    'powerful',
    'gentle',
    'aggressive',
    'smooth',
    'rough',
    'warm',
    'cold',
  ],

  styles: [
    'acoustic',
    'electronic',
    'orchestral',
    'minimalist',
    'complex',
    'simple',
    'layered',
    'sparse',
    'dense',
    'atmospheric',
    'rhythmic',
    'melodic',
    'harmonic',
    'textural',
    'percussive',
    'ambient',
    'cinematic',
    'commercial',
    'artistic',
    'experimental',
    'traditional',
    'modern',
    'vintage',
    'futuristic',
    'retro',
    'classical',
    'contemporary',
    'folk',
    'urban',
    'rural',
    'industrial',
    'natural',
  ],

  // Audio-Specific Parameters
  tempos: [
    'very slow (40-60 BPM)',
    'slow (60-80 BPM)',
    'moderate (80-100 BPM)',
    'medium (100-120 BPM)',
    'upbeat (120-140 BPM)',
    'fast (140-160 BPM)',
    'very fast (160-180 BPM)',
    'extreme (180+ BPM)',
  ],

  keys: [
    'C major',
    'G major',
    'D major',
    'A major',
    'E major',
    'B major',
    'F# major',
    'C# major',
    'F major',
    'Bb major',
    'Eb major',
    'Ab major',
    'Db major',
    'Gb major',
    'Cb major',
    'A minor',
    'E minor',
    'B minor',
    'F# minor',
    'C# minor',
    'G# minor',
    'D# minor',
    'A# minor',
    'D minor',
    'G minor',
    'C minor',
    'F minor',
    'Bb minor',
    'Eb minor',
    'Ab minor',
    'Db minor',
    'Gb minor',
  ],

  timeSignatures: [
    '4/4',
    '3/4',
    '6/8',
    '2/4',
    '5/4',
    '7/8',
    '12/8',
    '9/8',
    '3/8',
    '6/4',
    '5/8',
    '7/4',
  ],

  durations: [
    '30 seconds',
    '1 minute',
    '2 minutes',
    '3 minutes',
    '4 minutes',
    '5 minutes',
    '10 minutes',
    '15 minutes',
    '30 minutes',
    '1 hour',
  ],

  audioQualities: ['low', 'medium', 'high', 'professional', 'studio quality'],

  // Nested Tempo Options
  tempoSpeeds: [
    'steady',
    'variable',
    'accelerating',
    'decelerating',
    'syncopated',
    'swung',
    'straight',
  ],

  tempoFeels: [
    'groovy',
    'driving',
    'laid back',
    'urgent',
    'relaxed',
    'energetic',
    'smooth',
    'choppy',
  ],

  // Nested Key Options
  keyModalities: [
    'major',
    'minor',
    'dorian',
    'mixolydian',
    'lydian',
    'phrygian',
    'locrian',
    'pentatonic',
    'blues scale',
    'chromatic',
  ],

  keyComplexities: [
    'simple',
    'moderate',
    'complex',
    'dissonant',
    'consonant',
    'atonal',
    'polytonal',
  ],

  // Nested Style Options
  productionStyles: [
    'clean',
    'raw',
    'overproduced',
    'minimal',
    'layered',
    'sparse',
    'dense',
    'atmospheric',
    'punchy',
    'smooth',
  ],

  arrangementStyles: [
    'verse-chorus',
    'AABA',
    'through-composed',
    'rondo',
    'theme and variations',
    'call and response',
    'ostinato',
    'free form',
  ],

  // Instrumentation & Sound
  instruments: [
    'piano',
    'guitar',
    'bass',
    'drums',
    'strings',
    'brass',
    'woodwinds',
    'synth',
    'voice',
    'percussion',
    'organ',
    'harp',
    'accordion',
    'harmonica',
    'saxophone',
    'trumpet',
    'trombone',
    'flute',
    'clarinet',
    'oboe',
    'bassoon',
    'violin',
    'viola',
    'cello',
    'double bass',
    'electric guitar',
    'acoustic guitar',
    'bass guitar',
    'keyboard',
    'sampler',
    'drum machine',
    'sequencer',
  ],

  vocals: [
    'none',
    'male vocals',
    'female vocals',
    'choir',
    'harmony',
    'lead vocals',
    'backing vocals',
    'spoken word',
    'scat singing',
    'vocal samples',
  ],

  effects: [
    'reverb',
    'delay',
    'echo',
    'chorus',
    'flanger',
    'phaser',
    'distortion',
    'overdrive',
    'fuzz',
    'compression',
    'limiter',
    'gate',
    'filter',
    'wah',
    'tremolo',
    'vibrato',
    'pitch shift',
    'harmonizer',
    'autotune',
    'sidechain',
  ],

  soundDesign: [
    'ambient',
    'textural',
    'atmospheric',
    'field recordings',
    'synthesized',
    'organic',
    'mechanical',
    'natural',
    'artificial',
    'processed',
    'raw',
    'filtered',
    'modulated',
    'granular',
    'spectral',
  ],

  // Nested Instrumentation Options
  primaryInstruments: [
    'piano',
    'guitar',
    'synth',
    'voice',
    'strings',
    'drums',
    'bass',
    'brass',
    'woodwinds',
  ],

  secondaryInstruments: [
    'piano',
    'guitar',
    'synth',
    'voice',
    'strings',
    'drums',
    'bass',
    'brass',
    'woodwinds',
    'percussion',
    'organ',
    'harp',
  ],

  percussionTypes: [
    'acoustic drums',
    'electronic drums',
    'hand percussion',
    'cymbals',
    'tambourine',
    'shaker',
    'conga',
    'bongo',
    'djembe',
    'tabla',
    'drum machine',
    'sequencer',
  ],

  // Nested Effects Options
  reverbTypes: [
    'room',
    'hall',
    'plate',
    'spring',
    'chamber',
    'cathedral',
    'ambient',
    'reverse',
    'gated',
    'shimmer',
  ],

  delayTypes: [
    'tape',
    'digital',
    'analog',
    'ping pong',
    'slapback',
    'long',
    'short',
    'modulated',
    'filtered',
    'reverse',
  ],

  distortionTypes: [
    'overdrive',
    'fuzz',
    'distortion',
    'bitcrusher',
    'wavefolder',
    'saturation',
    'clipping',
    'harmonic',
  ],

  // Nested Sound Design Options
  textureTypes: [
    'smooth',
    'rough',
    'grainy',
    'glassy',
    'metallic',
    'wooden',
    'organic',
    'synthetic',
    'warm',
    'cold',
  ],

  // Atmosphere & Emotion
  atmospheres: [
    'mysterious',
    'peaceful',
    'tense',
    'joyful',
    'melancholic',
    'energetic',
    'calm',
    'dramatic',
    'intimate',
    'epic',
    'dreamy',
    'nightmarish',
    'nostalgic',
    'futuristic',
    'vintage',
    'natural',
    'artificial',
    'spiritual',
    'secular',
    'romantic',
  ],

  emotions: [
    'happiness',
    'sadness',
    'anger',
    'fear',
    'surprise',
    'disgust',
    'love',
    'hate',
    'joy',
    'sorrow',
    'excitement',
    'calmness',
    'anxiety',
    'confidence',
    'vulnerability',
    'strength',
    'weakness',
    'hope',
    'despair',
    'nostalgia',
  ],

  energies: [
    'high energy',
    'low energy',
    'medium energy',
    'building',
    'fading',
    'constant',
    'variable',
    'pulsing',
    'flowing',
    'staccato',
  ],

  intensities: [
    'soft',
    'loud',
    'quiet',
    'intense',
    'gentle',
    'powerful',
    'subtle',
    'overwhelming',
    'moderate',
    'extreme',
  ],

  // Nested Atmosphere Options
  atmosphereDensities: [
    'sparse',
    'dense',
    'light',
    'heavy',
    'open',
    'cluttered',
    'minimal',
    'complex',
    'simple',
    'layered',
  ],

  atmosphereMovements: [
    'static',
    'flowing',
    'pulsing',
    'swirling',
    'drifting',
    'rushing',
    'gentle',
    'aggressive',
    'smooth',
    'choppy',
  ],

  // Nested Energy Options
  energyLevels: ['very low', 'low', 'medium', 'high', 'very high', 'extreme'],

  energyFlows: [
    'steady',
    'building',
    'fading',
    'pulsing',
    'wave-like',
    'random',
    'rhythmic',
    'free',
  ],

  // Context & Setting
  settings: [
    'concert hall',
    'studio',
    'outdoor venue',
    'intimate space',
    'large arena',
    'church',
    'theater',
    'club',
    'cafe',
    'park',
    'beach',
    'mountain',
    'forest',
    'city',
    'suburb',
    'countryside',
    'desert',
    'ocean',
    'space',
    'underwater',
  ],

  timeOfDays: [
    'dawn',
    'morning',
    'noon',
    'afternoon',
    'dusk',
    'evening',
    'night',
    'midnight',
    'early morning',
    'late night',
  ],

  seasons: [
    'spring',
    'summer',
    'autumn',
    'winter',
    'rainy season',
    'dry season',
    'monsoon',
    'snowy',
    'blooming',
    'falling leaves',
  ],

  locations: [
    'New York',
    'London',
    'Tokyo',
    'Paris',
    'Los Angeles',
    'Berlin',
    'Mumbai',
    'Rio de Janeiro',
    'Cairo',
    'Sydney',
    'Toronto',
    'Amsterdam',
    'Barcelona',
    'Vienna',
    'Prague',
    'Budapest',
    'Istanbul',
    'Moscow',
    'Beijing',
    'Seoul',
  ],

  // Nested Context Options
  environmentTypes: [
    'acoustic',
    'electronic',
    'hybrid',
    'natural',
    'artificial',
    'urban',
    'rural',
    'industrial',
    'domestic',
    'commercial',
  ],

  spatialDepths: [
    'close',
    'medium distance',
    'far',
    'very far',
    'intimate',
    'personal',
    'social',
    'public',
    'vast',
    'infinite',
  ],

  // Sensory & Texture
  textures: [
    'smooth',
    'rough',
    'grainy',
    'glassy',
    'metallic',
    'wooden',
    'fabric',
    'stone',
    'water',
    'air',
    'fire',
    'earth',
  ],

  colors: [
    'warm',
    'cool',
    'bright',
    'dark',
    'vibrant',
    'muted',
    'pastel',
    'saturated',
    'monochrome',
    'multicolored',
  ],

  materials: [
    'wood',
    'metal',
    'glass',
    'stone',
    'fabric',
    'plastic',
    'ceramic',
    'leather',
    'paper',
    'water',
  ],

  sensations: [
    'warm',
    'cold',
    'soft',
    'hard',
    'smooth',
    'rough',
    'sharp',
    'blunt',
    'light',
    'heavy',
    'wet',
    'dry',
  ],

  // Nested Sensory Options
  temperatures: [
    'very cold',
    'cold',
    'cool',
    'neutral',
    'warm',
    'hot',
    'very hot',
  ],

  humidityLevels: ['very dry', 'dry', 'moderate', 'humid', 'very humid', 'wet'],

  // Dynamics & Movement
  dynamics: [
    'very quiet',
    'quiet',
    'medium',
    'loud',
    'very loud',
    'crescendo',
    'diminuendo',
    'sudden',
    'gradual',
    'constant',
  ],

  movements: [
    'static',
    'flowing',
    'pulsing',
    'swirling',
    'drifting',
    'rushing',
    'gentle',
    'aggressive',
    'smooth',
    'choppy',
    'rhythmic',
    'free',
  ],

  rhythms: [
    'simple',
    'complex',
    'syncopated',
    'straight',
    'swung',
    'polyrhythmic',
    'irregular',
    'groove',
    'pulse',
    'free rhythm',
  ],

  flows: [
    'smooth',
    'choppy',
    'continuous',
    'interrupted',
    'wave-like',
    'linear',
    'circular',
    'spiral',
    'random',
    'structured',
  ],

  // Nested Dynamics Options
  dynamicRanges: [
    'narrow',
    'medium',
    'wide',
    'extreme',
    'compressed',
    'expanded',
  ],

  dynamicContrasts: ['low', 'medium', 'high', 'extreme', 'subtle', 'dramatic'],

  // Nested Movement Options
  movementSpeeds: [
    'very slow',
    'slow',
    'moderate',
    'fast',
    'very fast',
    'variable',
  ],

  movementDirections: [
    'forward',
    'backward',
    'upward',
    'downward',
    'sideways',
    'circular',
    'spiral',
    'random',
    'linear',
    'curved',
  ],

  // Technical
  models: [
    'suno',
    'udio',
    'mubert',
    'soundraw',
    'aiva',
    'boomy',
    'amper',
    'ecrett',
    'soundful',
    'beatoven',
  ],
};
