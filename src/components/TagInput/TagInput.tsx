import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import './TagInput.css';

/**
 * Props interface for TagInput component
 */
interface TagInputProps {
  initialTags?: string[];
  placeholder?: string;
  maxTags?: number;
  caseSensitive?: boolean;
}

/**
 * Simple Tag Input Component
 *
 * Features:
 * - Add tags by pressing Enter
 * - Remove tags by clicking the X button
 * - Prevents empty tags
 * - Prevents duplicate tags (case-sensitive by default)
 * - Clear input after successful tag addition
 */
const TagInput: React.FC<TagInputProps> = ({
  initialTags = [],
  placeholder = 'Type a tag and press Enter...',
  maxTags,
  caseSensitive = true,
}) => {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  /**
   * Handles input field changes
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
    // Clear error when user starts typing
    if (error) setError('');
  };

  /**
   * Validates and adds a new tag
   */
  const addTag = (tagToAdd: string): void => {
    // Trim whitespace
    const trimmedTag = tagToAdd.trim();

    // Validation: Prevent empty tags
    if (!trimmedTag) {
      setError('Tag cannot be empty');
      return;
    }

    // Validation: Check max tags limit
    if (maxTags && tags.length >= maxTags) {
      setError(`Maximum ${maxTags} tags allowed`);
      return;
    }

    // Validation: Prevent duplicate tags
    const isDuplicate = caseSensitive
      ? tags.includes(trimmedTag)
      : tags.some(tag => tag.toLowerCase() === trimmedTag.toLowerCase());

    if (isDuplicate) {
      setError('Tag already exists');
      return;
    }

    // Add the tag and clear input
    setTags([...tags, trimmedTag]);
    setInputValue('');
    setError('');
  };

  /**
   * Handles key press events (Enter key to add tag)
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  /**
   * Removes a tag at the specified index
   */
  const removeTag = (indexToRemove: number): void => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
    setError('');
  };

  return (
    <div className="tag-input-container">
      <div className="tag-input-wrapper">
        {/* Display Tags */}
        {tags.length > 0 && (
          <div className="tags-list">
            {tags.map((tag, index) => (
              <span key={index} className="tag">
                <span className="tag-text">{tag}</span>
                <button
                  type="button"
                  className="tag-remove-btn"
                  onClick={() => removeTag(index)}
                  aria-label={`Remove ${tag}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Input Field */}
        <input
          type="text"
          className="tag-input"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label="Tag input"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}

      {/* Tag Count */}
      {tags.length > 0 && (
        <div className="tag-count">
          {tags.length} {tags.length === 1 ? 'tag' : 'tags'}
          {maxTags && ` (max: ${maxTags})`}
        </div>
      )}
    </div>
  );
};

export default TagInput;
