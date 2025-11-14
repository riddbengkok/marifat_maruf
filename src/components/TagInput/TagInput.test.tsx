import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TagInput from './TagInput';

describe('TagInput Component', () => {
  describe('Rendering', () => {
    it('should render the input field', () => {
      render(<TagInput />);
      const input = screen.getByRole('textbox', { name: /tag input/i });
      expect(input).toBeInTheDocument();
    });

    it('should render with custom placeholder', () => {
      const placeholder = 'Add your tags here';
      render(<TagInput placeholder={placeholder} />);
      const input = screen.getByPlaceholderText(placeholder);
      expect(input).toBeInTheDocument();
    });

    it('should render with initial tags', () => {
      const initialTags = ['React', 'TypeScript'];
      render(<TagInput initialTags={initialTags} />);
      
      initialTags.forEach(tag => {
        expect(screen.getByText(tag)).toBeInTheDocument();
      });
    });
  });

  describe('Adding Tags', () => {
    it('should add a tag when Enter key is pressed', () => {
      render(<TagInput />);
      const input = screen.getByRole('textbox', { name: /tag input/i });

      fireEvent.change(input, { target: { value: 'JavaScript' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

      expect(screen.getByText('JavaScript')).toBeInTheDocument();
    });

    it('should clear input after adding a tag', () => {
      render(<TagInput />);
      const input = screen.getByRole('textbox', { name: /tag input/i }) as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'React' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

      expect(input.value).toBe('');
    });

    it('should trim whitespace from tags', () => {
      render(<TagInput />);
      const input = screen.getByRole('textbox', { name: /tag input/i });

      fireEvent.change(input, { target: { value: '  React  ' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

      expect(screen.getByText('React')).toBeInTheDocument();
    });

    it('should add multiple tags', () => {
      render(<TagInput />);
      const input = screen.getByRole('textbox', { name: /tag input/i });

      const tags = ['React', 'TypeScript', 'JavaScript'];
      tags.forEach(tag => {
        fireEvent.change(input, { target: { value: tag } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
      });

      tags.forEach(tag => {
        expect(screen.getByText(tag)).toBeInTheDocument();
      });
    });
  });

  describe('Validation - Empty Tags', () => {
    it('should not add empty tags', () => {
      render(<TagInput />);
      const input = screen.getByRole('textbox', { name: /tag input/i });

      fireEvent.change(input, { target: { value: '' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

      expect(screen.getByText(/tag cannot be empty/i)).toBeInTheDocument();
    });

    it('should not add tags with only whitespace', () => {
      render(<TagInput />);
      const input = screen.getByRole('textbox', { name: /tag input/i });

      fireEvent.change(input, { target: { value: '   ' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

      expect(screen.getByText(/tag cannot be empty/i)).toBeInTheDocument();
    });

    it('should clear error when user starts typing', () => {
      render(<TagInput />);
      const input = screen.getByRole('textbox', { name: /tag input/i });

      // Trigger error
      fireEvent.change(input, { target: { value: '' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
      expect(screen.getByText(/tag cannot be empty/i)).toBeInTheDocument();

      // Start typing
      fireEvent.change(input, { target: { value: 'R' } });
      expect(screen.queryByText(/tag cannot be empty/i)).not.toBeInTheDocument();
    });
  });

  describe('Validation - Duplicate Tags', () => {
    it('should not add duplicate tags (case-sensitive)', () => {
      render(<TagInput caseSensitive={true} />);
      const input = screen.getByRole('textbox', { name: /tag input/i });

      // Add first tag
      fireEvent.change(input, { target: { value: 'React' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

      // Try to add duplicate
      fireEvent.change(input, { target: { value: 'React' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

      expect(screen.getByText(/tag already exists/i)).toBeInTheDocument();
      expect(screen.getAllByText('React')).toHaveLength(1);
    });

    it('should allow same tag with different case when case-sensitive', () => {
      render(<TagInput caseSensitive={true} />);
      const input = screen.getByRole('textbox', { name: /tag input/i });

      fireEvent.change(input, { target: { value: 'React' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

      fireEvent.change(input, { target: { value: 'react' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('react')).toBeInTheDocument();
    });

    it('should not allow same tag with different case when case-insensitive', () => {
      render(<TagInput caseSensitive={false} />);
      const input = screen.getByRole('textbox', { name: /tag input/i });

      fireEvent.change(input, { target: { value: 'React' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

      fireEvent.change(input, { target: { value: 'react' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

      expect(screen.getByText(/tag already exists/i)).toBeInTheDocument();
      expect(screen.getAllByText('React')).toHaveLength(1);
    });
  });

  describe('Validation - Max Tags', () => {
    it('should enforce max tags limit', () => {
      render(<TagInput maxTags={2} />);
      const input = screen.getByRole('textbox', { name: /tag input/i });

      // Add 2 tags
      fireEvent.change(input, { target: { value: 'React' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

      fireEvent.change(input, { target: { value: 'TypeScript' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

      // Try to add 3rd tag
      fireEvent.change(input, { target: { value: 'JavaScript' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

      expect(screen.getByText(/maximum 2 tags allowed/i)).toBeInTheDocument();
      expect(screen.queryByText('JavaScript')).not.toBeInTheDocument();
    });

    it('should display tag count with max limit', () => {
      render(<TagInput maxTags={5} initialTags={['React']} />);
      expect(screen.getByText(/1 tag \(max: 5\)/i)).toBeInTheDocument();
    });
  });

  describe('Removing Tags', () => {
    it('should remove a tag when remove button is clicked', () => {
      render(<TagInput initialTags={['React', 'TypeScript']} />);

      const removeButton = screen.getByLabelText(/remove react/i);
      fireEvent.click(removeButton);

      expect(screen.queryByText('React')).not.toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
    });

    it('should remove all tags', () => {
      const tags = ['React', 'TypeScript', 'JavaScript'];
      render(<TagInput initialTags={tags} />);

      tags.forEach(tag => {
        const removeButton = screen.getByLabelText(new RegExp(`remove ${tag}`, 'i'));
        fireEvent.click(removeButton);
      });

      tags.forEach(tag => {
        expect(screen.queryByText(tag)).not.toBeInTheDocument();
      });
    });

    it('should clear error when removing a tag', () => {
      render(<TagInput maxTags={2} initialTags={['React', 'TypeScript']} />);
      const input = screen.getByRole('textbox', { name: /tag input/i });

      // Trigger max tags error
      fireEvent.change(input, { target: { value: 'JavaScript' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
      expect(screen.getByText(/maximum 2 tags allowed/i)).toBeInTheDocument();

      // Remove a tag
      const removeButton = screen.getByLabelText(/remove react/i);
      fireEvent.click(removeButton);

      expect(screen.queryByText(/maximum 2 tags allowed/i)).not.toBeInTheDocument();
    });
  });

  describe('Tag Count Display', () => {
    it('should display tag count for single tag', () => {
      render(<TagInput initialTags={['React']} />);
      expect(screen.getByText('1 tag')).toBeInTheDocument();
    });

    it('should display tag count for multiple tags', () => {
      render(<TagInput initialTags={['React', 'TypeScript']} />);
      expect(screen.getByText('2 tags')).toBeInTheDocument();
    });

    it('should not display tag count when no tags', () => {
      render(<TagInput />);
      expect(screen.queryByText(/\d+ tags?/)).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(<TagInput initialTags={['React']} />);
      
      expect(screen.getByRole('textbox', { name: /tag input/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/remove react/i)).toBeInTheDocument();
    });

    it('should have role="alert" for error messages', () => {
      render(<TagInput />);
      const input = screen.getByRole('textbox', { name: /tag input/i });

      fireEvent.change(input, { target: { value: '' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

      const errorMessage = screen.getByRole('alert');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent(/tag cannot be empty/i);
    });
  });
});
