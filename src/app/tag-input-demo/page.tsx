'use client';

import React from 'react';
import TagInput from '@/components/TagInput';

/**
 * Demo page for TagInput component
 * Showcases the component with different configurations
 */
export default function TagInputDemo() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
      }}>
        {/* Header */}
        <header style={{
          textAlign: 'center',
          marginBottom: '40px',
          color: '#ffffff',
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '12px',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}>
            🏷️ Simple Tag Input
          </h1>
          <p style={{
            fontSize: '1.1rem',
            opacity: 0.9,
          }}>
            ReactJS & TypeScript Live Coding Test
          </p>
        </header>

        {/* Main Demo Card */}
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          marginBottom: '24px',
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '8px',
            color: '#333',
          }}>
            Basic Tag Input
          </h2>
          <p style={{
            color: '#666',
            marginBottom: '20px',
            fontSize: '0.95rem',
          }}>
            Type a tag and press <kbd style={{
              background: '#f0f0f0',
              padding: '2px 6px',
              borderRadius: '4px',
              fontFamily: 'monospace',
            }}>Enter</kbd> to add it. Click the × to remove.
          </p>
          <TagInput placeholder="Enter tags (e.g., react, typescript, javascript)..." />
        </div>

        {/* Advanced Demo Card */}
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          marginBottom: '24px',
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '8px',
            color: '#333',
          }}>
            With Max Tags Limit
          </h2>
          <p style={{
            color: '#666',
            marginBottom: '20px',
            fontSize: '0.95rem',
          }}>
            This example has a maximum of 5 tags.
          </p>
          <TagInput 
            placeholder="Add up to 5 tags..."
            maxTags={5}
            initialTags={['React', 'TypeScript']}
          />
        </div>

        {/* Features Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '16px',
            color: '#333',
          }}>
            ✨ Features Implemented
          </h2>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}>
            {[
              'Add tags by pressing Enter key',
              'Remove tags by clicking the × button',
              'Prevents empty tags from being added',
              'Prevents duplicate tags (case-sensitive)',
              'Input clears automatically after adding a tag',
              'Visual feedback with hover and focus states',
              'Error messages for invalid inputs',
              'Responsive design for mobile devices',
              'Accessibility features (ARIA labels)',
              'TypeScript type safety throughout',
            ].map((feature, index) => (
              <li key={index} style={{
                padding: '10px 0',
                borderBottom: index < 9 ? '1px solid #f0f0f0' : 'none',
                color: '#555',
                fontSize: '0.95rem',
              }}>
                <span style={{ color: '#667eea', marginRight: '8px' }}>✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <footer style={{
          textAlign: 'center',
          marginTop: '40px',
          color: '#ffffff',
          opacity: 0.8,
          fontSize: '0.9rem',
        }}>
          <p>Built with React, TypeScript, and ❤️</p>
        </footer>
      </div>
    </div>
  );
}
