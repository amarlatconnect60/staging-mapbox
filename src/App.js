import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css' // Import mapbox-gl CSS

mapboxgl.accessToken =
  'pk.eyJ1IjoibHVkZmkiLCJhIjoiY2xoZWpwemM1MWxzbjN0b2FyaW5qdXJzNCJ9.c-SshhzMhRvnuUqku2LKEg' // Use your Mapbox token here

const App = () => {
  const mapContainerRef = useRef(null)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v11',
      center: [101.22, 3.453],
      zoom: 13,
    })

    map.on('load', () => {
      map.addSource('your-vector-source', {
        type: 'vector',
        url: 'mapbox://ludfi.d3kgp4v5',
      })

      map.addLayer({
        id: 'your-vector-layer',
        type: 'fill',
        source: 'your-vector-source',
        'source-layer': 'SBB_SawahSempadan-b5zxxf',
        paint: {
          'fill-color': [
            'match',
            ['get', 'gridcode'],
            1,
            'red',
            2,
            'orange',
            3,
            'yellow',
            'black', // default color if none of the conditions are met
          ],
          'fill-opacity': 0.6,
        },
      })
    })

    // Clean up on unmount
    return () => map.remove()
  }, [])

  return (
    <div
      className='map-container'
      ref={mapContainerRef}
      style={{ width: '100%', height: '100vh' }}
    />
  )
}

export default App
