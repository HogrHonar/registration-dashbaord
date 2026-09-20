import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'تۆمار',
    short_name: 'تۆمار',
    description: 'داشبۆردی تۆمارکردنی فێرخوازان',
    start_url: '/dashboard',
    display: 'standalone',
    background_color: '#f9fafb',
    theme_color: '#f9fafb',
        icons: [
      {
        src: '/bright-logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      }
    ],
  }
}
