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
      <div className="relative w-full max-w-7xl h-[90vh] bg-[#0c101a] border border-white/[0.1] rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-slate-900/80 border-b border-white/[0.08] flex-shrink-0">
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-slate-400 mt-1 text-xs sm:text-sm">
              {project.description}
            </p>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            {showEmbed && !embedError && (
              <button
                onClick={() => setShowEmbed(false)}
                className="px-3 py-1.5 text-xs font-medium bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-white rounded-lg transition-colors"
              >
                Show Details
              </button>
            )}
            {!showEmbed && (
              <button
                onClick={() => setShowEmbed(true)}
                className="px-3 py-1.5 text-xs font-medium bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-white rounded-lg transition-colors"
              >
                Show Spec
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
            >
              <svg
                className="w-5 h-5"
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
        <div className="flex-1 min-h-0 p-6 bg-[#090d16]">
          {showEmbed && !embedError ? (
            // Figma Embed
            <div className="h-full w-full rounded-xl overflow-hidden border border-white/[0.06]">
              <FigmaEmbed
                figmaUrl={project.link}
                title={project.title}
                className="h-full w-full"
              />
            </div>
          ) : (
            // Project Details View
            <div className="h-full flex flex-col justify-center items-center">
              <div className="text-center max-w-2xl px-4">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto mb-6 text-slate-300">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm sm:text-base mb-8 leading-relaxed font-normal">
                  {project.description}
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {project.technologies.map(tech => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-mono rounded-md bg-white/[0.05] border border-white/[0.08] text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-2.5 bg-white text-slate-950 font-semibold text-xs rounded-lg hover:bg-slate-100 transition-colors shadow-sm"
                >
                  <span>Open Spec in Figma</span>
                  <span className="ml-1.5 font-mono text-xs">↗</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-900/80 border-t border-white/[0.08] flex-shrink-0 flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map(tech => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[11px] font-mono rounded bg-white/[0.04] border border-white/[0.06] text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
          <button
            onClick={onClose}
            className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            Esc to close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
