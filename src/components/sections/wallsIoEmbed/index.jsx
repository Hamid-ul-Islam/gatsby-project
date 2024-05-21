import React, { useState, useEffect } from 'react'
import { Script } from 'gatsby'
import { useLocale } from '@context/localeContext'

const WallsIoEmbed = () => {
  const [loadedScript, setLoadedScript] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLoadedScript(true)
    }
  }, [loadedScript, setLoadedScript])

  const onLoadScript = () => {
    const iframe = window.document.createElement('div')
    iframe.innerHTML = `<iframe
              src="https://my.walls.io/riftrally?nobackground=1&;show_header=0"
              title="My social wall"
              width="100%"
              height="900"
              frameBorder="0"
              scrolling="no"
            />`
    const container = window.document.getElementById('iframe-wallsIoEmbed')
    container.appendChild(iframe)
  }

  return (
    <>
      {loadedScript && (
        <Script
          id="signupScript"
          src="https://walls.io/js/wallsio-widget-1.2.js"
          onLoad={() => onLoadScript()}
        />
      )}
      <div className="relative w-[100vw]">
        <div id="iframe-wallsIoEmbed" className="bg-[#0C2E3F]"></div>
      </div>
    </>
  )
}

export default WallsIoEmbed
