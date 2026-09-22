import { ImageResponse } from 'next/og'

export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'
//this is a simple example of an OG image, you can customize it to your liking
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#007AFF',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 55,
          fontWeight: 'bold',
        }}
      >BTVI</div>
    ),
    { ...size }
  )
}
