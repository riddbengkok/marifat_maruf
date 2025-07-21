export interface StoryFormData {
  [x: string]: any;
  // Core Elements
  title: string;
  mainIdea: string;
  genre: string;
  setting: string;
  desiredLength: string;

  // Characters
  protagonistName: string;
  protagonistRole: string;
  protagonistPersonality: string;
  protagonistGoal: string;
  supportingCharacters: string;

  // Point of View & Style
  pov: string;
  tone: string;
  style: string;

  // Theme & Moral
  theme: string;
  moral: string;

  // Plot Structure
  incitingIncident: string;
  conflict: string;
  plotPoints: string;
  climax: string;
  resolution: string;
  twist: string;

  // Special Elements
  worldRules: string;
  magicSystem: string;
  technology: string;
  specialElements: string;

  // Additional Notes
  additionalNotes: string;
}

export const storyFormOptions = {
  genres: [
    'Fantasy',
    'Science Fiction',
    'Romance',
    'Mystery',
    'Thriller',
    'Horror',
    'Historical',
    'Adventure',
    'Drama',
    'Comedy',
    'Slice of Life',
    'Dystopian',
    'Supernatural',
    'Crime',
    'Young Adult',
    'Children',
    'Fairy Tale',
    'Mythology',
    'Other',
  ],
  povs: [
    'First Person',
    'Third Person Limited',
    'Third Person Omniscient',
    'Second Person',
    'Multiple POVs',
  ],
  tones: [
    'Serious',
    'Humorous',
    'Dark',
    'Light',
    'Hopeful',
    'Tragic',
    'Suspenseful',
    'Inspiring',
    'Satirical',
    'Romantic',
    'Epic',
    'Other',
  ],
  lengths: [
    'Flash Fiction (<1000 words)',
    'Short Story (1,000-7,500 words)',
    'Novelette (7,500-20,000 words)',
    'Novella (20,000-50,000 words)',
    'Novel (50,000+ words)',
    'Unspecified',
  ],
};
