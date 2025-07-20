'use client';

import { AudioFormData, audioFormOptions } from './AudioFormData';
import FormField from './FormField';
import FormSection from './FormSection';

interface AudioPromptGeneratorFormProps {
  formData: AudioFormData;
  onFormDataChange: (data: Partial<AudioFormData>) => void;
}

const AudioPromptGeneratorForm: React.FC<AudioPromptGeneratorFormProps> = ({
  formData,
  onFormDataChange,
}) => {
  const handleInputChange = (field: keyof AudioFormData, value: string) => {
    // If sound type is changing, reset related fields to prevent ambiguity
    if (field === 'soundType') {
      const resetFields: Partial<AudioFormData> = {
        soundType: value,
        genre: '',
        mood: '',
        style: '',
      };
      onFormDataChange(resetFields);
    } else {
      onFormDataChange({ [field]: value });
    }
  };

  // Helper function to get relevant options based on sound type
  const getRelevantOptions = () => {
    switch (formData.soundType) {
      case 'sound effect':
        return {
          showGenre: false,
          showTempo: false,
          showKey: false,
          showTimeSignature: false,
          showInstruments: false,
          showVocals: false,
          showEffects: true,
          showSoundDesign: true,
          showAtmosphere: true,
          showEmotions: true,
          showEnergy: true,
          showIntensity: true,
          showSetting: true,
          showTimeOfDay: true,
          showSeason: true,
          showLocation: true,
        };
      case 'music':
        return {
          showGenre: true,
          showTempo: true,
          showKey: true,
          showTimeSignature: true,
          showInstruments: true,
          showVocals: true,
          showEffects: true,
          showSoundDesign: true,
          showAtmosphere: true,
          showEmotions: true,
          showEnergy: true,
          showIntensity: true,
          showSetting: true,
          showTimeOfDay: true,
          showSeason: true,
          showLocation: true,
        };
      case 'ambience':
        return {
          showGenre: false,
          showTempo: false,
          showKey: false,
          showTimeSignature: false,
          showInstruments: false,
          showVocals: false,
          showEffects: true,
          showSoundDesign: true,
          showAtmosphere: true,
          showEmotions: true,
          showEnergy: true,
          showIntensity: true,
          showSetting: true,
          showTimeOfDay: true,
          showSeason: true,
          showLocation: true,
        };
      default:
        return {
          showGenre: false,
          showTempo: false,
          showKey: false,
          showTimeSignature: false,
          showInstruments: false,
          showVocals: false,
          showEffects: false,
          showSoundDesign: false,
          showAtmosphere: false,
          showEmotions: false,
          showEnergy: false,
          showIntensity: false,
          showSetting: false,
          showTimeOfDay: false,
          showSeason: false,
          showLocation: false,
        };
    }
  };

  const relevantOptions = getRelevantOptions();

  return (
    <div className="form-container">
      {/* Core Elements */}
      <FormSection title="Core Elements" icon="🎵">
        <div className="form-grid">
          <FormField
            label="Subject/Concept"
            type="text"
            value={formData.subject}
            onChange={value => handleInputChange('subject', value)}
            placeholder="e.g., A peaceful morning in the forest"
            required
          />
          <FormField
            label="Type of Sound"
            type="select"
            value={formData.soundType}
            onChange={value => handleInputChange('soundType', value)}
            options={audioFormOptions.soundTypes.map(type => ({
              value: type,
              label: type,
            }))}
            placeholder="Select type of sound"
            required
          />
          {formData.soundType === 'sound effect' && (
            <FormField
              label="Sound Effect Type"
              type="select"
              value={formData.genre}
              onChange={value => handleInputChange('genre', value)}
              options={audioFormOptions.soundEffectTypes.map(effect => ({
                value: effect,
                label: effect,
              }))}
              placeholder="Select sound effect type"
            />
          )}
          {formData.soundType === 'ambience' && (
            <>
              <FormField
                label="Ambience Type"
                type="select"
                value={formData.genre}
                onChange={value => handleInputChange('genre', value)}
                options={audioFormOptions.ambienceTypes.map(ambience => ({
                  value: ambience,
                  label: ambience,
                }))}
                placeholder="Select ambience type"
              />
              <FormField
                label="Animal Sounds"
                type="select"
                value={formData.mood}
                onChange={value => handleInputChange('mood', value)}
                options={audioFormOptions.animalSounds.map(animal => ({
                  value: animal,
                  label: animal,
                }))}
                placeholder="Select animal sounds (optional)"
              />
              <FormField
                label="Weather Sounds"
                type="select"
                value={formData.style}
                onChange={value => handleInputChange('style', value)}
                options={audioFormOptions.weatherSounds.map(weather => ({
                  value: weather,
                  label: weather,
                }))}
                placeholder="Select weather sounds (optional)"
              />
            </>
          )}
          {formData.soundType === 'music' && (
            <>
              <FormField
                label="Genre"
                type="select"
                value={formData.genre}
                onChange={value => handleInputChange('genre', value)}
                options={audioFormOptions.genres.map(genre => ({
                  value: genre,
                  label: genre,
                }))}
                placeholder="Select genre"
              />
              <FormField
                label="Mood"
                type="select"
                value={formData.mood}
                onChange={value => handleInputChange('mood', value)}
                options={audioFormOptions.moods.map(mood => ({
                  value: mood,
                  label: mood,
                }))}
                placeholder="Select mood"
              />
              <FormField
                label="Style"
                type="select"
                value={formData.style}
                onChange={value => handleInputChange('style', value)}
                options={audioFormOptions.styles.map(style => ({
                  value: style,
                  label: style,
                }))}
                placeholder="Select style"
              />
            </>
          )}
        </div>
      </FormSection>

      {/* Audio-Specific Parameters - Only show for music */}
      {relevantOptions.showTempo && (
        <FormSection title="Audio Parameters" icon="🎚️">
          <div className="form-grid">
            <FormField
              label="Tempo"
              type="select"
              value={formData.tempo}
              onChange={value => handleInputChange('tempo', value)}
              options={audioFormOptions.tempos.map(tempo => ({
                value: tempo,
                label: tempo,
              }))}
              placeholder="Select tempo"
            />
            <FormField
              label="Key"
              type="select"
              value={formData.key}
              onChange={value => handleInputChange('key', value)}
              options={audioFormOptions.keys.map(key => ({
                value: key,
                label: key,
              }))}
              placeholder="Select key"
            />
            <FormField
              label="Time Signature"
              type="select"
              value={formData.timeSignature}
              onChange={value => handleInputChange('timeSignature', value)}
              options={audioFormOptions.timeSignatures.map(sig => ({
                value: sig,
                label: sig,
              }))}
              placeholder="Select time signature"
            />
            <FormField
              label="Duration"
              type="select"
              value={formData.duration}
              onChange={value => handleInputChange('duration', value)}
              options={audioFormOptions.durations.map(duration => ({
                value: duration,
                label: duration,
              }))}
              placeholder="Select duration"
            />
            <FormField
              label="Audio Quality"
              type="select"
              value={formData.audioQuality}
              onChange={value => handleInputChange('audioQuality', value)}
              options={audioFormOptions.audioQualities.map(quality => ({
                value: quality,
                label: quality,
              }))}
              placeholder="Select quality"
            />
          </div>
        </FormSection>
      )}

      {/* Instrumentation & Sound - Only show for music */}
      {relevantOptions.showInstruments && (
        <FormSection title="Instrumentation & Sound" icon="🎸">
          <div className="form-grid">
            <FormField
              label="Instruments"
              type="select"
              value={formData.instruments}
              onChange={value => handleInputChange('instruments', value)}
              options={audioFormOptions.instruments.map(instrument => ({
                value: instrument,
                label: instrument,
              }))}
              placeholder="Select instruments"
            />
            <FormField
              label="Vocals"
              type="select"
              value={formData.vocals}
              onChange={value => handleInputChange('vocals', value)}
              options={audioFormOptions.vocals.map(vocal => ({
                value: vocal,
                label: vocal,
              }))}
              placeholder="Select vocals"
            />
            <FormField
              label="Effects"
              type="select"
              value={formData.effects}
              onChange={value => handleInputChange('effects', value)}
              options={audioFormOptions.effects.map(effect => ({
                value: effect,
                label: effect,
              }))}
              placeholder="Select effects"
            />
            <FormField
              label="Sound Design"
              type="select"
              value={formData.soundDesign}
              onChange={value => handleInputChange('soundDesign', value)}
              options={audioFormOptions.soundDesign.map(design => ({
                value: design,
                label: design,
              }))}
              placeholder="Select sound design"
            />
          </div>
        </FormSection>
      )}

      {/* Effects & Sound Design - Show for all types */}
      {relevantOptions.showEffects && !relevantOptions.showInstruments && (
        <FormSection title="Effects & Sound Design" icon="🎛️">
          <div className="form-grid">
            <FormField
              label="Effects"
              type="select"
              value={formData.effects}
              onChange={value => handleInputChange('effects', value)}
              options={audioFormOptions.effects.map(effect => ({
                value: effect,
                label: effect,
              }))}
              placeholder="Select effects"
            />
            <FormField
              label="Sound Design"
              type="select"
              value={formData.soundDesign}
              onChange={value => handleInputChange('soundDesign', value)}
              options={audioFormOptions.soundDesign.map(design => ({
                value: design,
                label: design,
              }))}
              placeholder="Select sound design"
            />
          </div>
        </FormSection>
      )}

      {/* Atmosphere & Emotion - Show for all types */}
      {relevantOptions.showAtmosphere && (
        <FormSection title="Atmosphere & Emotion" icon="🌙">
          <div className="form-grid">
            <FormField
              label="Atmosphere"
              type="select"
              value={formData.atmosphere}
              onChange={value => handleInputChange('atmosphere', value)}
              options={audioFormOptions.atmospheres.map(atmosphere => ({
                value: atmosphere,
                label: atmosphere,
              }))}
              placeholder="Select atmosphere"
            />
            <FormField
              label="Emotions"
              type="select"
              value={formData.emotions}
              onChange={value => handleInputChange('emotions', value)}
              options={audioFormOptions.emotions.map(emotion => ({
                value: emotion,
                label: emotion,
              }))}
              placeholder="Select emotions"
            />
            <FormField
              label="Energy"
              type="select"
              value={formData.energy}
              onChange={value => handleInputChange('energy', value)}
              options={audioFormOptions.energies.map(energy => ({
                value: energy,
                label: energy,
              }))}
              placeholder="Select energy"
            />
            <FormField
              label="Intensity"
              type="select"
              value={formData.intensity}
              onChange={value => handleInputChange('intensity', value)}
              options={audioFormOptions.intensities.map(intensity => ({
                value: intensity,
                label: intensity,
              }))}
              placeholder="Select intensity"
            />
          </div>
        </FormSection>
      )}

      {/* Context & Setting - Show for all types */}
      {relevantOptions.showSetting && (
        <FormSection title="Context & Setting" icon="🏛️">
          <div className="form-grid">
            <FormField
              label="Setting"
              type="select"
              value={formData.setting}
              onChange={value => handleInputChange('setting', value)}
              options={audioFormOptions.settings.map(setting => ({
                value: setting,
                label: setting,
              }))}
              placeholder="Select setting"
            />
            <FormField
              label="Time of Day"
              type="select"
              value={formData.timeOfDay}
              onChange={value => handleInputChange('timeOfDay', value)}
              options={audioFormOptions.timeOfDays.map(time => ({
                value: time,
                label: time,
              }))}
              placeholder="Select time of day"
            />
            <FormField
              label="Season"
              type="select"
              value={formData.season}
              onChange={value => handleInputChange('season', value)}
              options={audioFormOptions.seasons.map(season => ({
                value: season,
                label: season,
              }))}
              placeholder="Select season"
            />
            <FormField
              label="Location"
              type="select"
              value={formData.location}
              onChange={value => handleInputChange('location', value)}
              options={audioFormOptions.locations.map(location => ({
                value: location,
                label: location,
              }))}
              placeholder="Select location"
            />
          </div>
        </FormSection>
      )}

      {/* Additional Details - Show for all types */}
      <FormSection title="Additional Details" icon="📝">
        <div className="form-grid">
          <FormField
            label="Additional Details"
            type="textarea"
            value={formData.additionalDetails}
            onChange={value => handleInputChange('additionalDetails', value)}
            placeholder="Any additional details or specifications"
          />
          <FormField
            label="References"
            type="textarea"
            value={formData.references}
            onChange={value => handleInputChange('references', value)}
            placeholder="Audio references, artists, or examples"
          />
          <FormField
            label="Technical Notes"
            type="textarea"
            value={formData.technicalNotes}
            onChange={value => handleInputChange('technicalNotes', value)}
            placeholder="Technical specifications or requirements"
          />
        </div>
      </FormSection>

      {/* Technical - Show for all types */}
      <FormSection title="Technical" icon="⚙️">
        <div className="form-grid">
          <FormField
            label="AI Model"
            type="select"
            value={formData.model}
            onChange={value => handleInputChange('model', value)}
            options={audioFormOptions.models.map(model => ({
              value: model,
              label: model,
            }))}
            placeholder="Select AI model"
          />
        </div>
      </FormSection>
    </div>
  );
};

export default AudioPromptGeneratorForm;
