import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ashutosh-sharma.com'

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/experience`, lastModified: new Date() },
    { url: `${baseUrl}/projects`, lastModified: new Date() },
    { url: `${baseUrl}/education`, lastModified: new Date() },
    { url: `${baseUrl}/achievements`, lastModified: new Date() },
    { url: `${baseUrl}/certifications`, lastModified: new Date() },
  ]
}