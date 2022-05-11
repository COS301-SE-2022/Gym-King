import React, { useState } from 'react'
import { Map } from 'pigeon-maps'

export function PigeonMap() {
  const [center, setCenter] = useState([-25.7545,28.2314])
  const [zoom, setZoom] = useState(17)
  return (
    <Map 
      height={900}
      center={[center[0],center[1]]}
      zoom={zoom} 
      onBoundsChanged={({ center, zoom }) => { 
        setCenter(center) 
        setZoom(zoom) 
      }} 
    />
  )
}