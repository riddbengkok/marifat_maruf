export interface FormData {
  // Core Elements
  subject: string
  style: string
  setting: string
  
  // Visual & Technical
  lighting: string
  pov: string
  composition: string
  aspectRatio: string
  quality: string
  
  // Nested Lighting Options
  lightIntensity: string
  lightDirection: string
  lightColor: string
  
  // Nested POV Options
  povDistance: string
  povLensType: string
  
  // Nested Composition Options
  compositionBalance: string
  compositionDepth: string
  
  // Atmosphere & Mood
  vibe: string
  mood: string
  atmosphere: string
  emotions: string
  
  // Nested Atmosphere Options
  atmosphereDensity: string
  atmosphereMovement: string
  
  // Environment & Context
  weather: string
  timeOfDay: string
  season: string
  
  // Nested Environment Options
  windSpeed: string
  visibility: string
  
  // Sensory & Material
  sense: string
  colors: string
  textures: string
  materials: string
  
  // Nested Sensory Options
  temperature: string
  humidity: string
  
  // Action & Details
  actions: string
  details: string
  additionalDetails: string
  
  // Nested Action Options
  actionSpeed: string
  energyLevel: string
  
  // Technical
  model: string
}

export const STYLE_OPTIONS = [
  { value: 'photorealistic', label: 'Photorealistic' },
  { value: 'cartoon', label: 'Cartoon' },
  { value: 'anime', label: 'Anime' },
  { value: 'oil painting', label: 'Oil Painting' },
  { value: 'watercolor', label: 'Watercolor' },
  { value: 'digital art', label: 'Digital Art' },
  { value: 'sketch', label: 'Sketch' },
  { value: '3D render', label: '3D Render' },
  { value: 'vintage', label: 'Vintage' },
  { value: 'cyberpunk', label: 'Cyberpunk' },
  { value: 'steampunk', label: 'Steampunk' },
  { value: 'minimalist', label: 'Minimalist' },
  { value: 'abstract', label: 'Abstract' },
  { value: 'impressionist', label: 'Impressionist' },
  { value: 'surrealist', label: 'Surrealist' },
  { value: 'hyperrealistic', label: 'Hyperrealistic' }
]

export const SETTING_OPTIONS = [
  { value: 'misty forest', label: 'Misty Forest' },
  { value: 'futuristic city', label: 'Futuristic City' },
  { value: 'underwater', label: 'Underwater' },
  { value: 'desert', label: 'Desert' },
  { value: 'mountain peak', label: 'Mountain Peak' },
  { value: 'tropical beach', label: 'Tropical Beach' },
  { value: 'ancient ruins', label: 'Ancient Ruins' },
  { value: 'space station', label: 'Space Station' },
  { value: 'medieval castle', label: 'Medieval Castle' },
  { value: 'urban street', label: 'Urban Street' },
  { value: 'cottage garden', label: 'Cottage Garden' },
  { value: 'industrial warehouse', label: 'Industrial Warehouse' },
  { value: 'luxury mansion', label: 'Luxury Mansion' },
  { value: 'abandoned building', label: 'Abandoned Building' },
  { value: 'crystal cave', label: 'Crystal Cave' },
  { value: 'floating islands', label: 'Floating Islands' },
  { value: 'steampunk laboratory', label: 'Steampunk Laboratory' },
  { value: 'cyberpunk alley', label: 'Cyberpunk Alley' },
  { value: 'enchanted forest', label: 'Enchanted Forest' },
  { value: 'volcanic landscape', label: 'Volcanic Landscape' },
  { value: 'arctic tundra', label: 'Arctic Tundra' },
  { value: 'submarine depths', label: 'Submarine Depths' },
  { value: 'cloud city', label: 'Cloud City' }
]

export const LIGHTING_OPTIONS = [
  { value: 'golden hour', label: 'Golden Hour' },
  { value: 'blue hour', label: 'Blue Hour' },
  { value: 'dramatic lighting', label: 'Dramatic Lighting' },
  { value: 'soft lighting', label: 'Soft Lighting' },
  { value: 'neon lighting', label: 'Neon Lighting' },
  { value: 'moonlight', label: 'Moonlight' },
  { value: 'sunset', label: 'Sunset' },
  { value: 'sunrise', label: 'Sunrise' },
  { value: 'foggy', label: 'Foggy' },
  { value: 'stormy', label: 'Stormy' },
  { value: 'studio lighting', label: 'Studio Lighting' },
  { value: 'backlit', label: 'Backlit' },
  { value: 'side lighting', label: 'Side Lighting' },
  { value: 'rim lighting', label: 'Rim Lighting' },
  { value: 'ambient lighting', label: 'Ambient Lighting' }
]

export const POV_OPTIONS = [
  { value: 'first person', label: 'First Person' },
  { value: 'eye level', label: 'Eye Level' },
  { value: 'low angle', label: 'Low Angle' },
  { value: 'high angle', label: 'High Angle' },
  { value: 'bird&apos;s eye', label: 'Bird&apos;s Eye' },
  { value: 'worm&apos;s eye', label: 'Worm&apos;s Eye' },
  { value: 'over the shoulder', label: 'Over the Shoulder' },
  { value: 'close-up', label: 'Close-up' },
  { value: 'wide shot', label: 'Wide Shot' },
  { value: 'extreme close-up', label: 'Extreme Close-up' },
  { value: 'dutch angle', label: 'Dutch Angle' },
  { value: 'aerial', label: 'Aerial' }
]

export const COMPOSITION_OPTIONS = [
  { value: 'close-up shot', label: 'Close-up Shot' },
  { value: 'wide shot', label: 'Wide Shot' },
  { value: 'bird&apos;s eye view', label: 'Bird&apos;s Eye View' },
  { value: 'low angle', label: 'Low Angle' },
  { value: 'high angle', label: 'High Angle' },
  { value: 'rule of thirds', label: 'Rule of Thirds' },
  { value: 'symmetrical', label: 'Symmetrical' },
  { value: 'leading lines', label: 'Leading Lines' },
  { value: 'framed', label: 'Framed' },
  { value: 'centered', label: 'Centered' },
  { value: 'off-center', label: 'Off-center' },
  { value: 'diagonal', label: 'Diagonal' },
  { value: 'circular', label: 'Circular' },
  { value: 'triangular', label: 'Triangular' }
]

export const ASPECT_RATIO_OPTIONS = [
  { value: '1:1', label: 'Square (1:1)' },
  { value: '4:3', label: 'Landscape (4:3)' },
  { value: '16:9', label: 'Widescreen (16:9)' },
  { value: '3:4', label: 'Portrait (3:4)' },
  { value: '9:16', label: 'Mobile Portrait (9:16)' },
  { value: '2:1', label: 'Ultra Wide (2:1)' }
]

export const QUALITY_OPTIONS = [
  { value: 'high', label: 'High Quality' },
  { value: 'standard', label: 'Standard' }
]

export const VIBE_OPTIONS = [
  { value: 'mysterious', label: 'Mysterious' },
  { value: 'peaceful', label: 'Peaceful' },
  { value: 'energetic', label: 'Energetic' },
  { value: 'melancholic', label: 'Melancholic' },
  { value: 'elegant', label: 'Elegant' },
  { value: 'raw', label: 'Raw' },
  { value: 'ethereal', label: 'Ethereal' },
  { value: 'dramatic', label: 'Dramatic' },
  { value: 'whimsical', label: 'Whimsical' },
  { value: 'dark', label: 'Dark' },
  { value: 'bright', label: 'Bright' },
  { value: 'nostalgic', label: 'Nostalgic' },
  { value: 'futuristic', label: 'Futuristic' }
]

export const MOOD_OPTIONS = [
  { value: 'serene', label: 'Serene' },
  { value: 'tense', label: 'Tense' },
  { value: 'joyful', label: 'Joyful' },
  { value: 'somber', label: 'Somber' },
  { value: 'romantic', label: 'Romantic' },
  { value: 'adventurous', label: 'Adventurous' },
  { value: 'contemplative', label: 'Contemplative' },
  { value: 'excited', label: 'Excited' },
  { value: 'calm', label: 'Calm' },
  { value: 'mysterious', label: 'Mysterious' },
  { value: 'melancholy', label: 'Melancholy' },
  { value: 'hopeful', label: 'Hopeful' },
  { value: 'ominous', label: 'Ominous' }
]

export const ATMOSPHERE_OPTIONS = [
  { value: 'misty', label: 'Misty' },
  { value: 'hazy', label: 'Hazy' },
  { value: 'crisp', label: 'Crisp' },
  { value: 'humid', label: 'Humid' },
  { value: 'dry', label: 'Dry' },
  { value: 'smoky', label: 'Smoky' },
  { value: 'foggy', label: 'Foggy' },
  { value: 'clear', label: 'Clear' },
  { value: 'dusty', label: 'Dusty' },
  { value: 'steamy', label: 'Steamy' },
  { value: 'windy', label: 'Windy' },
  { value: 'still', label: 'Still' }
]

export const EMOTIONS_OPTIONS = [
  { value: 'joy', label: 'Joy' },
  { value: 'sadness', label: 'Sadness' },
  { value: 'anger', label: 'Anger' },
  { value: 'fear', label: 'Fear' },
  { value: 'surprise', label: 'Surprise' },
  { value: 'love', label: 'Love' },
  { value: 'peace', label: 'Peace' },
  { value: 'excitement', label: 'Excitement' },
  { value: 'melancholy', label: 'Melancholy' },
  { value: 'wonder', label: 'Wonder' },
  { value: 'nostalgia', label: 'Nostalgia' },
  { value: 'hope', label: 'Hope' },
  { value: 'despair', label: 'Despair' },
  { value: 'tranquility', label: 'Tranquility' },
  { value: 'passion', label: 'Passion' }
]

export const WEATHER_OPTIONS = [
  { value: 'sunny', label: 'Sunny' },
  { value: 'cloudy', label: 'Cloudy' },
  { value: 'rainy', label: 'Rainy' },
  { value: 'snowy', label: 'Snowy' },
  { value: 'foggy', label: 'Foggy' },
  { value: 'stormy', label: 'Stormy' },
  { value: 'windy', label: 'Windy' },
  { value: 'misty', label: 'Misty' },
  { value: 'overcast', label: 'Overcast' },
  { value: 'clear sky', label: 'Clear Sky' },
  { value: 'partly cloudy', label: 'Partly Cloudy' },
  { value: 'drizzle', label: 'Drizzle' },
  { value: 'heavy rain', label: 'Heavy Rain' }
]

export const TIME_OF_DAY_OPTIONS = [
  { value: 'dawn', label: 'Dawn' },
  { value: 'sunrise', label: 'Sunrise' },
  { value: 'morning', label: 'Morning' },
  { value: 'noon', label: 'Noon' },
  { value: 'afternoon', label: 'Afternoon' },
  { value: 'golden hour', label: 'Golden Hour' },
  { value: 'sunset', label: 'Sunset' },
  { value: 'dusk', label: 'Dusk' },
  { value: 'evening', label: 'Evening' },
  { value: 'night', label: 'Night' },
  { value: 'midnight', label: 'Midnight' },
  { value: 'late night', label: 'Late Night' }
]

export const SEASON_OPTIONS = [
  { value: 'spring', label: 'Spring' },
  { value: 'summer', label: 'Summer' },
  { value: 'autumn', label: 'Autumn' },
  { value: 'winter', label: 'Winter' },
  { value: 'monsoon', label: 'Monsoon' },
  { value: 'dry season', label: 'Dry Season' },
  { value: 'wet season', label: 'Wet Season' }
]

export const SENSE_OPTIONS = [
  { value: 'warm', label: 'Warm' },
  { value: 'cold', label: 'Cold' },
  { value: 'soft', label: 'Soft' },
  { value: 'rough', label: 'Rough' },
  { value: 'smooth', label: 'Smooth' },
  { value: 'sharp', label: 'Sharp' },
  { value: 'wet', label: 'Wet' },
  { value: 'dry', label: 'Dry' },
  { value: 'heavy', label: 'Heavy' },
  { value: 'light', label: 'Light' },
  { value: 'dense', label: 'Dense' },
  { value: 'airy', label: 'Airy' },
  { value: 'cozy', label: 'Cozy' },
  { value: 'spacious', label: 'Spacious' }
]

export const COLORS_OPTIONS = [
  { value: 'warm tones', label: 'Warm Tones' },
  { value: 'cool tones', label: 'Cool Tones' },
  { value: 'monochrome', label: 'Monochrome' },
  { value: 'pastel', label: 'Pastel' },
  { value: 'vibrant', label: 'Vibrant' },
  { value: 'muted', label: 'Muted' },
  { value: 'earth tones', label: 'Earth Tones' },
  { value: 'neon', label: 'Neon' },
  { value: 'golden', label: 'Golden' },
  { value: 'silver', label: 'Silver' },
  { value: 'copper', label: 'Copper' },
  { value: 'jewel tones', label: 'Jewel Tones' },
  { value: 'autumn colors', label: 'Autumn Colors' },
  { value: 'spring colors', label: 'Spring Colors' }
]

export const TEXTURES_OPTIONS = [
  { value: 'smooth', label: 'Smooth' },
  { value: 'rough', label: 'Rough' },
  { value: 'grainy', label: 'Grainy' },
  { value: 'glossy', label: 'Glossy' },
  { value: 'matte', label: 'Matte' },
  { value: 'weathered', label: 'Weathered' },
  { value: 'polished', label: 'Polished' },
  { value: 'textured', label: 'Textured' },
  { value: 'porous', label: 'Porous' },
  { value: 'metallic', label: 'Metallic' },
  { value: 'wooden', label: 'Wooden' },
  { value: 'stone', label: 'Stone' },
  { value: 'fabric', label: 'Fabric' },
  { value: 'leather', label: 'Leather' }
]

export const MATERIALS_OPTIONS = [
  { value: 'metal', label: 'Metal' },
  { value: 'wood', label: 'Wood' },
  { value: 'stone', label: 'Stone' },
  { value: 'glass', label: 'Glass' },
  { value: 'plastic', label: 'Plastic' },
  { value: 'fabric', label: 'Fabric' },
  { value: 'leather', label: 'Leather' },
  { value: 'ceramic', label: 'Ceramic' },
  { value: 'concrete', label: 'Concrete' },
  { value: 'marble', label: 'Marble' },
  { value: 'brass', label: 'Brass' },
  { value: 'copper', label: 'Copper' },
  { value: 'steel', label: 'Steel' },
  { value: 'gold', label: 'Gold' },
  { value: 'silver', label: 'Silver' }
]

export const ACTIONS_OPTIONS = [
  { value: 'running', label: 'Running' },
  { value: 'walking', label: 'Walking' },
  { value: 'flying', label: 'Flying' },
  { value: 'floating', label: 'Floating' },
  { value: 'dancing', label: 'Dancing' },
  { value: 'jumping', label: 'Jumping' },
  { value: 'falling', label: 'Falling' },
  { value: 'swimming', label: 'Swimming' },
  { value: 'climbing', label: 'Climbing' },
  { value: 'sitting', label: 'Sitting' },
  { value: 'standing', label: 'Standing' },
  { value: 'lying down', label: 'Lying Down' },
  { value: 'fighting', label: 'Fighting' },
  { value: 'embracing', label: 'Embracing' },
  { value: 'pointing', label: 'Pointing' }
]

export const MODEL_OPTIONS = [
  { value: 'dalle', label: 'DALL·E' },
  { value: 'midjourney', label: 'Midjourney' },
  { value: 'stable', label: 'Stable Diffusion' }
] 