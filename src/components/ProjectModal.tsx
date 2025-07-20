'use client';

import { useEffect, useState } from 'react';
import FigmaEmbed from './FigmaEmbed';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    link: string;
    technologies: string[];
  };
}

const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  const [showEmbed, setShowEmbed] = useState(true);
  const [embedError, setEmbedError] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      setShowEmbed(true);
      setEmbedError(false);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-7xl h-[90vh] bg-gray-900 rounded-xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-gray-800 border-b border-gray-700 flex-shrink-0">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">{project.title}</h2>
            <p className="text-gray-300 mt-1 text-sm">{project.description}</p>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            {showEmbed && !embedError && (
              <button
                onClick={() => setShowEmbed(false)}
                className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
              >
                Show Details
              </button>
            )}
            {!showEmbed && (
              <button
                onClick={() => setShowEmbed(true)}
                className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
              >
                Show Design
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 p-6">
          {showEmbed && !embedError ? (
            // Figma Embed
            <div className="h-full w-full">
              <FigmaEmbed
                figmaUrl={project.link}
                title={project.title}
                className="h-full w-full"
              />
            </div>
          ) : (
            // Project Details View
            <div className="h-full flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center max-w-2xl">
                  <div className="text-gray-400 mb-8">
                    <svg
                      className="w-24 h-24 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {project.technologies.map(tech => (
                      <span
                        key={tech}
                        className="px-4 py-2 text-sm bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    View Design in Figma
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-800 border-t border-gray-700 flex-shrink-0">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map(tech => (
              <span
                key={tech}
                className="px-3 py-1 text-sm bg-cyan-500/20 text-cyan-300 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
