import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Strategi Cuti Cerdas - Planning Liburan yang Tepat'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1e3a8a',
          backgroundImage: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        }}
      >
        {/* Logo/Icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 30,
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 72,
              fontWeight: 'bold',
              color: '#1e3a8a',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            }}
          >
            📅
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            fontSize: 64,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: 20,
            paddingLeft: 60,
            paddingRight: 60,
            lineHeight: 1.2,
          }}
        >
          Strategi Cuti Cerdas
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: 'flex',
            fontSize: 32,
            color: 'rgba(255, 255, 255, 0.9)',
            textAlign: 'center',
            marginBottom: 40,
            paddingLeft: 60,
            paddingRight: 60,
          }}
        >
          Planning Liburan yang Tepat
        </div>

        {/* Features */}
        <div
          style={{
            display: 'flex',
            gap: 40,
            marginTop: 20,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              padding: '15px 30px',
              borderRadius: 20,
              fontSize: 24,
              color: 'white',
            }}
          >
            ✨ Hemat Cuti
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              padding: '15px 30px',
              borderRadius: 20,
              fontSize: 24,
              color: 'white',
            }}
          >
            🎯 Long Weekend
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              padding: '15px 30px',
              borderRadius: 20,
              fontSize: 24,
              color: 'white',
            }}
          >
            💯 Gratis
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            fontSize: 20,
            color: 'rgba(255, 255, 255, 0.7)',
          }}
        >
          by Team GagituAldi · gagitualdi.online
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
