import { AudioFormData } from '@/components/PromptGenerator/AudioFormData';
import { FormData, ImageFormData } from '@/components/PromptGenerator/FormData';
import { useEffect, useState } from 'react';

interface UseFormStorageProps<
  T extends FormData | ImageFormData | AudioFormData,
> {
  key: string;
  initialData: T;
}

export function useFormStorage<
  T extends FormData | ImageFormData | AudioFormData,
>({ key, initialData }: UseFormStorageProps<T>) {
  const [formData, setFormData] = useState<T>(initialData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(key);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      }
    } catch (error) {
      console.error('Error loading form data from localStorage:', error);
    } finally {
      setIsLoaded(true);
    }
  }, [key]);

  // Save data to localStorage whenever formData changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(key, JSON.stringify(formData));
      } catch (error) {
        console.error('Error saving form data to localStorage:', error);
      }
    }
  }, [formData, key, isLoaded]);

  const updateFormData = (field: string | Partial<T>, value?: string) => {
    if (typeof field === 'string' && value !== undefined) {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    } else if (typeof field === 'object') {
      setFormData(prev => ({
        ...prev,
        ...field,
      }));
    }
  };

  const resetFormData = () => {
    setFormData(initialData);
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing form data from localStorage:', error);
    }
  };

  return {
    formData,
    updateFormData,
    resetFormData,
    isLoaded,
  };
}
