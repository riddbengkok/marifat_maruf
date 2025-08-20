import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://marifat-maruf.vercel.app';
  const pages = [
    '',
    'ai-image-prompt-generator',
    'ai-video-prompt-generator',
    'ai-audio-prompt-generator',
    'ai-story-prompt-generator',
    'bulk-image-analyze',
    'image-analysis',
    'features',
    'portfolio',
  ];

  const urls = pages
    .map(
      page =>
        `<url><loc>${baseUrl}/${page}</loc><changefreq>weekly</changefreq><priority>${page === '' ? '1.0' : page === 'bulk-image-analyze' ? '0.9' : '0.8'}</priority></url>`
    )
    .join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
