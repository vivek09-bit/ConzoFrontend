// scripts/generateSitemap.js
import fs, { createWriteStream }  from 'fs';
import path from 'path';
import { SitemapStream, streamToPromise } from 'sitemap';

// Extract all routes from your App.jsx
const routes = [
  // Home
  { url: '/', changefreq: 'daily', priority: 1.0 },

  // PDF to Image Converters
  { url: '/pdf-to-jpg', changefreq: 'weekly', priority: 0.8 },
  { url: '/pdf-to-png', changefreq: 'weekly', priority: 0.8 },
  { url: '/pdf-to-webp', changefreq: 'weekly', priority: 0.8 },
  { url: '/pdf-to-bmp', changefreq: 'weekly', priority: 0.7 },
  { url: '/pdf-to-tiff', changefreq: 'weekly', priority: 0.7 },

  // Image Format Converters
  { url: '/jpg-to-pdf', changefreq: 'weekly', priority: 0.9 },
  { url: '/jpg-to-png', changefreq: 'weekly', priority: 0.8 },
  { url: '/jpg-to-jpeg', changefreq: 'weekly', priority: 0.7 },
  { url: '/jpeg-to-jpg', changefreq: 'weekly', priority: 0.7 },
  { url: '/jpg-to-webp', changefreq: 'weekly', priority: 0.8 },
  { url: '/png-to-jpg', changefreq: 'weekly', priority: 0.8 },
  { url: '/heic-to-jpg', changefreq: 'weekly', priority: 0.8 },
  { url: '/webp-to-png', changefreq: 'weekly', priority: 0.8 },
  { url: '/bmp-to-jpg', changefreq: 'weekly', priority: 0.7 },
  { url: '/tiff-to-jpg', changefreq: 'weekly', priority: 0.7 },
  { url: '/avif-to-jpg', changefreq: 'weekly', priority: 0.7 },
  { url: '/png-to-webp', changefreq: 'weekly', priority: 0.8 },
  { url: '/avif-to-png', changefreq: 'weekly', priority: 0.7 },
  { url: '/image-convert', changefreq: 'weekly', priority: 0.9 },
  { url: '/webp-to-jpg', changefreq: 'weekly', priority: 0.8 },

  // PDF Utilities
  { url: '/compress-pdf', changefreq: 'weekly', priority: 0.8 },
  { url: '/merge-pdf', changefreq: 'weekly', priority: 0.8 },
  { url: '/split-pdf', changefreq: 'weekly', priority: 0.8 },
  { url: '/pdf-to-word', changefreq: 'weekly', priority: 0.8 },

  // Image to PDF Converters
  { url: '/image-to-pdf', changefreq: 'weekly', priority: 0.9 },
  { url: '/png-to-pdf', changefreq: 'weekly', priority: 0.8 },
  { url: '/heic-to-pdf', changefreq: 'weekly', priority: 0.8 },
  { url: '/webp-to-pdf', changefreq: 'weekly', priority: 0.8 },
  { url: '/multiple-images-to-pdf', changefreq: 'weekly', priority: 0.8 },
  { url: '/combine-images-to-pdf', changefreq: 'weekly', priority: 0.8 },
  { url: '/screenshot-to-pdf', changefreq: 'weekly', priority: 0.7 },
  { url: '/photo-to-pdf', changefreq: 'weekly', priority: 0.7 },
  { url: '/online-image-to-pdf', changefreq: 'weekly', priority: 0.7 },
  { url: '/iphone-image-to-pdf', changefreq: 'weekly', priority: 0.7 },
  { url: '/android-image-to-pdf', changefreq: 'weekly', priority: 0.7 },
  { url: '/windows-image-to-pdf', changefreq: 'weekly', priority: 0.7 },
  { url: '/mac-image-to-pdf', changefreq: 'weekly', priority: 0.7 },
  { url: '/compress-image', changefreq: 'weekly', priority: 0.8 },
];

async function generateSitemap() {
  try {
    // Create sitemap stream
    const sitemap = new SitemapStream({ 
      hostname: 'https://imgpdfhub.com',
      lastmodDateOnly: true
    });

    // Create write stream
    const writeStream = createWriteStream(path.resolve('./public/sitemap.xml'));
    sitemap.pipe(writeStream);

    // Add all routes to sitemap
    routes.forEach(route => {
      sitemap.write({
        url: route.url,
        changefreq: route.changefreq,
        priority: route.priority,
        lastmod: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
      });
    });

    // End the stream
    sitemap.end();

    // Wait for the stream to finish
    await streamToPromise(sitemap);
    
    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

generateSitemap();