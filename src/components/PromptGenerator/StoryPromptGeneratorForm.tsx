import React from 'react';
import { StoryFormData, storyFormOptions } from './StoryFormData';

const SUGGESTIONS = {
  genre: storyFormOptions.genres,
  setting: [
    'Medieval kingdom',
    'Futuristic city',
    'Small town',
    'Alien planet',
    'Haunted house',
    'Deserted island',
    'Space station',
    'Ancient ruins',
    'Post-apocalyptic world',
    'Magical forest',
  ],
  protagonistRole: [
    'Farm boy',
    'Detective',
    'Space explorer',
    'Rebel leader',
    'Chosen one',
    'Inventor',
    'Witch',
    'Time traveler',
    'Secret agent',
    'Villain turned hero',
  ],
  protagonistPersonality: [
    'Brave',
    'Witty',
    'Introverted',
    'Cunning',
    'Optimistic',
    'Cynical',
    'Loyal',
    'Impulsive',
    'Curious',
    'Stoic',
  ],
  protagonistGoal: [
    'Save the kingdom',
    'Solve the crime',
    'Find home',
    'Win the tournament',
    'Escape danger',
    'Uncover the truth',
    'Protect a secret',
    'Avenge a loved one',
    'Achieve fame',
    'Break a curse',
  ],
  pov: storyFormOptions.povs,
  tone: storyFormOptions.tones,
  style: [
    'Lyrical',
    'Fast-paced',
    'Descriptive',
    'Minimalist',
    'Satirical',
    'Epic',
    'Conversational',
    'Dark',
    'Playful',
  ],
  theme: [
    'Friendship',
    'Sacrifice',
    'Hope',
    'Betrayal',
    'Redemption',
    'Courage',
    'Love',
    'Justice',
    'Freedom',
    'Survival',
  ],
  moral: [
    'Good triumphs over evil',
    'Love conquers all',
    'Be true to yourself',
    'Courage in the face of fear',
    'The cost of ambition',
    'Forgiveness is powerful',
  ],
  incitingIncident: [
    'The king is kidnapped',
    'A letter arrives',
    'A murder is discovered',
    'A prophecy is revealed',
    'A stranger comes to town',
    'A disaster strikes',
  ],
  conflict: [
    'Must defeat the villain',
    'Overcome self-doubt',
    'Survive in a hostile world',
    'Win a competition',
    'Escape captivity',
    'Protect a secret',
  ],
  climax: [
    'Final confrontation with the villain',
    'The big reveal',
    'A sacrifice is made',
    'A battle for survival',
    'A daring escape',
  ],
  resolution: [
    'Peace is restored, but at a cost',
    'A new beginning',
    'Bittersweet farewell',
    'Justice is served',
    'The hero returns home',
  ],
  twist: [
    'The mentor was the villain all along',
    'A friend betrays the hero',
    'The prophecy was a lie',
    'The villain is redeemed',
    'The hero fails',
  ],
  worldRules: [
    'Magic can only be used at night',
    'Technology is forbidden',
    'Everyone has a secret',
    'No one can lie',
    'Time moves backwards',
  ],
  magicSystem: [
    'Elemental magic',
    'Forbidden spells',
    'Blood magic',
    'Rune casting',
    'Summoning',
  ],
  technology: [
    'Steampunk gadgets',
    'AI overlords',
    'Teleportation',
    'Virtual reality',
    'Nanobots',
  ],
  specialElements: [
    'Prophecies',
    'Secret societies',
    'Ancient artifacts',
    'Talking animals',
    'Parallel worlds',
  ],
  desiredLength: storyFormOptions.lengths,
};

function SuggestionDropdown({
  options,
  value,
  onSelect,
}: {
  options: string[];
  value: string;
  onSelect: (v: string) => void;
}) {
  // If value matches a suggestion, select it; otherwise, select ""
  const matched = options.includes(value) ? value : '';
  return (
    <select
      className="form-input w-auto inline-block ml-2 text-xs py-1 px-2" // smaller font and padding
      style={{ maxWidth: 120, minWidth: 80, height: '28px' }}
      value={matched}
      onChange={e => {
        if (e.target.value) onSelect(e.target.value);
      }}
    >
      <option value="">Suggestions...</option>
      {options.map(opt => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

interface StoryPromptGeneratorFormProps {
  formData: StoryFormData;
  onFormDataChange: (field: keyof StoryFormData, value: string) => void;
}

const StoryPromptGeneratorForm: React.FC<StoryPromptGeneratorFormProps> = ({
  formData,
  onFormDataChange,
}) => {
  // Helper for text+dropdown fields
  function renderTextWithDropdown(
    field: keyof StoryFormData,
    value: string,
    suggestions: string[],
    placeholder: string
  ) {
    return (
      <div className="flex items-center gap-2">
        <input
          className="form-input flex-1"
          type="text"
          value={value}
          onChange={e => onFormDataChange(field, e.target.value)}
          placeholder={placeholder}
        />
        <SuggestionDropdown
          options={suggestions}
          value={value}
          onSelect={v => onFormDataChange(field, v)}
        />
      </div>
    );
  }

  return (
    <form className="space-y-8">
      {/* Core Elements */}
      <section className="form-section">
        <h3 className="text-xl font-bold mb-2 text-cyan-300">Core Elements</h3>
        <div className="form-grid">
          <div className="form-field">
            <label className="form-label">Title</label>
            <input
              className="form-input"
              type="text"
              value={formData.title}
              onChange={e => onFormDataChange('title', e.target.value)}
              placeholder="e.g. The Lost Kingdom"
            />
          </div>
          <div className="form-field">
            <label className="form-label">Main Idea</label>
            <input
              className="form-input"
              type="text"
              value={formData.mainIdea}
              onChange={e => onFormDataChange('mainIdea', e.target.value)}
              placeholder="e.g. A young hero must save their world from darkness"
            />
          </div>
          <div className="form-field">
            <label className="form-label">Genre</label>
            {renderTextWithDropdown(
              'genre',
              formData.genre,
              SUGGESTIONS.genre,
              'e.g. Fantasy'
            )}
          </div>
          <div className="form-field">
            <label className="form-label">Setting</label>
            {renderTextWithDropdown(
              'setting',
              formData.setting,
              SUGGESTIONS.setting,
              'e.g. Medieval fantasy kingdom'
            )}
          </div>
          <div className="form-field">
            <label className="form-label">Desired Length</label>
            {renderTextWithDropdown(
              'desiredLength',
              formData.desiredLength,
              SUGGESTIONS.desiredLength,
              'e.g. Short Story, Novel'
            )}
          </div>
        </div>
      </section>

      {/* Characters */}
      <section className="form-section">
        <h3 className="text-xl font-bold mb-2 text-cyan-300">Main Character</h3>
        <div className="form-grid">
          <div className="form-field">
            <label className="form-label">Protagonist Name</label>
            <input
              className="form-input"
              type="text"
              value={formData.protagonistName}
              onChange={e =>
                onFormDataChange('protagonistName', e.target.value)
              }
              placeholder="e.g. Arin"
            />
          </div>
          <div className="form-field">
            <label className="form-label">Role</label>
            {renderTextWithDropdown(
              'protagonistRole',
              formData.protagonistRole,
              SUGGESTIONS.protagonistRole,
              'e.g. Farm boy, chosen one'
            )}
          </div>
          <div className="form-field">
            <label className="form-label">Personality</label>
            {renderTextWithDropdown(
              'protagonistPersonality',
              formData.protagonistPersonality,
              SUGGESTIONS.protagonistPersonality,
              'e.g. Brave, curious, stubborn'
            )}
          </div>
          <div className="form-field">
            <label className="form-label">Goal/Motivation</label>
            {renderTextWithDropdown(
              'protagonistGoal',
              formData.protagonistGoal,
              SUGGESTIONS.protagonistGoal,
              'e.g. Save the kingdom'
            )}
          </div>
        </div>
        <div className="form-field mt-4">
          <label className="form-label">Supporting Characters</label>
          <textarea
            className="form-input"
            value={formData.supportingCharacters}
            onChange={e =>
              onFormDataChange('supportingCharacters', e.target.value)
            }
            placeholder="e.g. Mentor, rival, love interest, sidekick"
          />
        </div>
      </section>

      {/* Point of View & Style */}
      <section className="form-section">
        <h3 className="text-xl font-bold mb-2 text-cyan-300">
          Point of View & Style
        </h3>
        <div className="form-grid">
          <div className="form-field">
            <label className="form-label">Point of View</label>
            {renderTextWithDropdown(
              'pov',
              formData.pov,
              SUGGESTIONS.pov,
              'e.g. First Person'
            )}
          </div>
          <div className="form-field">
            <label className="form-label">Tone</label>
            {renderTextWithDropdown(
              'tone',
              formData.tone,
              SUGGESTIONS.tone,
              'e.g. Serious'
            )}
          </div>
          <div className="form-field">
            <label className="form-label">Style</label>
            {renderTextWithDropdown(
              'style',
              formData.style,
              SUGGESTIONS.style,
              'e.g. Lyrical, fast-paced, descriptive'
            )}
          </div>
        </div>
      </section>

      {/* Theme & Moral */}
      <section className="form-section">
        <h3 className="text-xl font-bold mb-2 text-cyan-300">Theme & Moral</h3>
        <div className="form-grid">
          <div className="form-field">
            <label className="form-label">Theme</label>
            {renderTextWithDropdown(
              'theme',
              formData.theme,
              SUGGESTIONS.theme,
              'e.g. Friendship, sacrifice, hope'
            )}
          </div>
          <div className="form-field">
            <label className="form-label">Moral</label>
            {renderTextWithDropdown(
              'moral',
              formData.moral,
              SUGGESTIONS.moral,
              'e.g. Good triumphs over evil'
            )}
          </div>
        </div>
      </section>

      {/* Plot Structure */}
      <section className="form-section">
        <h3 className="text-xl font-bold mb-2 text-cyan-300">Plot Structure</h3>
        <div className="form-grid">
          <div className="form-field">
            <label className="form-label">Inciting Incident</label>
            {renderTextWithDropdown(
              'incitingIncident',
              formData.incitingIncident,
              SUGGESTIONS.incitingIncident,
              'e.g. The king is kidnapped'
            )}
          </div>
          <div className="form-field">
            <label className="form-label">Conflict</label>
            {renderTextWithDropdown(
              'conflict',
              formData.conflict,
              SUGGESTIONS.conflict,
              'e.g. Must defeat the dark lord'
            )}
          </div>
          <div className="form-field">
            <label className="form-label">Key Plot Points</label>
            <textarea
              className="form-input"
              value={formData.plotPoints}
              onChange={e => onFormDataChange('plotPoints', e.target.value)}
              placeholder="e.g. Training, betrayal, discovery, battle"
            />
          </div>
          <div className="form-field">
            <label className="form-label">Climax</label>
            {renderTextWithDropdown(
              'climax',
              formData.climax,
              SUGGESTIONS.climax,
              'e.g. Final confrontation with the villain'
            )}
          </div>
          <div className="form-field">
            <label className="form-label">Resolution/Ending</label>
            {renderTextWithDropdown(
              'resolution',
              formData.resolution,
              SUGGESTIONS.resolution,
              'e.g. Peace is restored, but at a cost'
            )}
          </div>
          <div className="form-field">
            <label className="form-label">Twist/Surprise</label>
            {renderTextWithDropdown(
              'twist',
              formData.twist,
              SUGGESTIONS.twist,
              'e.g. The mentor was the villain all along'
            )}
          </div>
        </div>
      </section>

      {/* Special Elements */}
      <section className="form-section">
        <h3 className="text-xl font-bold mb-2 text-cyan-300">
          Special Elements
        </h3>
        <div className="form-grid">
          <div className="form-field">
            <label className="form-label">World Rules</label>
            {renderTextWithDropdown(
              'worldRules',
              formData.worldRules,
              SUGGESTIONS.worldRules,
              'e.g. Magic can only be used at night'
            )}
          </div>
          <div className="form-field">
            <label className="form-label">Magic System</label>
            {renderTextWithDropdown(
              'magicSystem',
              formData.magicSystem,
              SUGGESTIONS.magicSystem,
              'e.g. Elemental magic, forbidden spells'
            )}
          </div>
          <div className="form-field">
            <label className="form-label">Technology</label>
            {renderTextWithDropdown(
              'technology',
              formData.technology,
              SUGGESTIONS.technology,
              'e.g. Steampunk gadgets, AI overlords'
            )}
          </div>
          <div className="form-field">
            <label className="form-label">Other Special Elements</label>
            {renderTextWithDropdown(
              'specialElements',
              formData.specialElements,
              SUGGESTIONS.specialElements,
              'e.g. Prophecies, secret societies'
            )}
          </div>
        </div>
      </section>

      {/* Additional Notes */}
      <section className="form-section">
        <h3 className="text-xl font-bold mb-2 text-cyan-300">
          Additional Notes
        </h3>
        <div className="form-field">
          <label className="form-label">Additional Notes</label>
          <textarea
            className="form-input"
            value={formData.additionalNotes}
            onChange={e => onFormDataChange('additionalNotes', e.target.value)}
            placeholder="Any extra details, references, or requests"
          />
        </div>
      </section>
    </form>
  );
};

export default StoryPromptGeneratorForm;
