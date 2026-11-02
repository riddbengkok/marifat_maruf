import Footer from '@/components/Footer';
import Link from 'next/link';

const promptTools = [
  {
    category: 'IMAGE',
    title: 'Image prompt generator',
    description:
      'Turn a subject, style, lighting, and composition into an image prompt.',
    href: '/ai-image-prompt-generator',
  },
  {
    category: 'VIDEO',
    title: 'Video prompt generator',
    description:
      'Specify a scene, camera movement, duration, and visual direction.',
    href: '/ai-video-prompt-generator',
  },
  {
    category: 'AUDIO',
    title: 'Audio prompt generator',
    description: 'Describe music, sound effects, atmosphere, or voice work.',
    href: '/ai-audio-prompt-generator',
  },
  {
    category: 'STORY & SCRIPT',
    title: 'Story and script generator',
    description: 'Not available yet. This writing tool is in development.',
    href: null,
  },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[#090d16] text-slate-200">
      <section
        aria-labelledby="features-title"
        className="mx-auto max-w-6xl px-5 pb-16 pt-24 sm:px-8 sm:pt-28 lg:pb-20"
      >
        <header className="max-w-3xl border-b border-white/[0.1] pb-8">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
            Tools
          </p>
          <h1
            id="features-title"
            className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-slate-50 sm:text-4xl"
          >
            Prompt generators
          </h1>
          <p className="mt-3 max-w-xl text-base leading-7 text-slate-400">
            Create structured starting prompts for image, video, and audio
            tools.
          </p>
        </header>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {promptTools.map(tool => (
            <article
              key={tool.category}
              className="flex min-h-56 flex-col rounded-lg border border-white/[0.09] bg-white/[0.02] p-5 transition-colors duration-150 hover:border-white/[0.16] hover:bg-white/[0.035] sm:p-6"
            >
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-slate-500">
                <span>{tool.category}</span>
                <span
                  aria-hidden="true"
                  className="h-px flex-1 bg-white/[0.08]"
                />
              </div>
              <h2 className="mt-4 text-lg font-medium tracking-tight text-slate-100 sm:text-xl">
                {tool.title}
              </h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
                {tool.description}
              </p>
              {tool.href ? (
                <Link
                  href={tool.href}
                  className="mt-auto inline-flex min-h-11 w-fit items-center gap-2 pt-4 text-sm font-medium text-emerald-300 transition-colors duration-150 hover:text-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 motion-reduce:transition-none"
                >
                  Open generator
                  <span aria-hidden="true">→</span>
                </Link>
              ) : (
                <span className="mt-auto inline-flex min-h-11 items-center pt-4 text-sm text-slate-500">
                  In development
                </span>
              )}
            </article>
          ))}
        </div>

        <nav
          aria-label="More information"
          className="mt-8 flex flex-col gap-3 border-t border-white/[0.1] pt-5 text-sm sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-slate-500">
            Web development{' '}
            <Link
              href="/portfolio"
              className="text-slate-300 underline decoration-slate-600 underline-offset-4 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 motion-reduce:transition-none"
            >
              See selected work
            </Link>
          </p>
          <a
            href="mailto:riddbengkok@gmail.com"
            className="w-fit text-slate-300 underline decoration-slate-600 underline-offset-4 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 motion-reduce:transition-none"
          >
            Get in touch
          </a>
        </nav>
      </section>
      <Footer />
    </main>
  );
}
