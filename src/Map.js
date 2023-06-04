import React, { useState } from 'react'
import ReactMapGL, { Source, Layer } from 'react-map-gl'

const MAPBOX_TOKEN =
  'pk.eyJ1IjoibHVkZmkiLCJhIjoiY2xoZWpwemM1MWxzbjN0b2FyaW5qdXJzNCJ9.c-SshhzMhRvnuUqku2LKEg'

export default function Map() {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  })

  return (
    <ReactMapGL
      {...viewport}
      width='100%'
      height='100%'
      mapStyle='mapbox://styles/mapbox/streets-v11'
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapboxApiAccessToken={MAPBOX_TOKEN}
    >
      <Source id='my-data' type='vector' url='mapbox://ludfi.2euk5121'>
        <Layer
          id='data'
          type='fill'
          source='my-data'
          source-layer='layer0'
          paint={{
            'fill-color': '#888888',
            'fill-opacity': 0.4,
          }}
        />
      </Source>
    </ReactMapGL>
  )
}
