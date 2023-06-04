import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken =
  'pk.eyJ1IjoibHVkZmkiLCJhIjoiY2xoZWpwemM1MWxzbjN0b2FyaW5qdXJzNCJ9.c-SshhzMhRvnuUqku2LKEg'

const vectorTilesets = [
  {
    name: 'SBB_SawahSempadan-b5zxxf',
    id: 'ludfi.d3kgp4v5',
    center: [101.212, 3.456],
    zoom: 12.47,
  },
  {
    name: 'SBB_SungaiBesar-5ivn2i',
    id: 'ludfi.7gd5ph03',
    center: [100.996, 3.689],
    zoom: 12.38,
  },
  {
    name: 'SBB_SungaiManik-1h1g7j',
    id: 'ludfi.3h80mkkk',
    center: [101.077, 4.078],
    zoom: 14.01,
  },
  {
    name: 'SBB_LabuKubong-6jf9ep',
    id: 'ludfi.55idvngu',
    center: [101.058, 4.105],
    zoom: 12.09,
  },
  {
    name: 'SBB_LamborKiri-97sftn',
    id: 'ludfi.7k8vwcw5',
    center: [100.888, 4.262],
    zoom: 14.43,
  },
  {
    name: 'SBB_Kerian-b5je8f',
    id: 'ludfi.82v0kb9b',
    center: [100.473, 5.078],
    zoom: 12.21,
  },
  // old error
  // {
  //   name: 'SBB_SungaiDua-5dp8bq',
  //   id: 'ludfi.23evnlpy',
  //   center: [100.425, 5.466],
  //   zoom: 13.49,
  // },
  // {
  //   name: 'SBB_TikamBatu-dhrwfs',
  //   id: 'ludfi.7i909c7w',
  //   center: [100.426, 5.569],
  //   zoom: 14.33,
  // },
  // new
  {
    name: 'SBB_SungaiDua-54csrd',
    id: 'ludfi.autu1orm',
    center: [100.425, 5.466],
    zoom: 13.49,
  },
  {
    name: 'SBB_TikamBatu-9nqq8h',
    id: 'ludfi.1pf2yazn',
    center: [100.426, 5.569],
    zoom: 14.33,
  },
  {
    name: 'SBB_SelarongBatang-7oosb4',
    id: 'ludfi.213z4h99',
    center: [100.392, 6.016],
    zoom: 13.11,
  },
]

const App = () => {
  const mapContainerRef = useRef(null)
  const popupRef = useRef(new mapboxgl.Popup({ offset: 15 }))
  const [map, setMap] = useState(null)

  useEffect(() => {
    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: vectorTilesets[0].center,
      zoom: vectorTilesets[0].zoom,
    })

    mapInstance.on('load', () => {
      setMap(mapInstance)
    })

    return () => mapInstance.remove()
  }, [])

  useEffect(() => {
    if (map) {
      map.addSource('your-vector-source', {
        type: 'vector',
        url: `mapbox://${vectorTilesets[0].id}`,
      })

      map.addLayer({
        id: 'your-vector-layer',
        type: 'fill',
        source: 'your-vector-source',
        'source-layer': vectorTilesets[0].name,
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
            4,
            'green',
            'black',
          ],
          'fill-opacity': 0.6,
        },
      })

      map.on('mousemove', 'your-vector-layer', e => {
        if (e.features.length) {
          const feature = e.features[0]
          popupRef.current
            .setLngLat(e.lngLat)
            .setHTML(`SBB_SawahSempadan-b5zxxf`)
            .addTo(map)
        }
      })

      map.on('mouseleave', 'your-vector-layer', () => {
        popupRef.current.remove()
      })

      map.on('click', 'your-vector-layer', e => {
        if (e.features.length) {
          const feature = e.features[0]
          const popupContent = `
            SBB_SawahSempadan-b5zxxf<br/>
            id (${feature.id})<br/>
            gridcode# (${feature.properties.gridcode})<br/>
            Id# (${feature.properties.Id})<br/>
            Shape_Area# (${feature.properties.Shape_Area})<br/>
            Shape_Leng# (${feature.properties.Shape_Leng})
          `
          popupRef.current.setLngLat(e.lngLat).setHTML(popupContent).addTo(map)
        }
      })
    }
  }, [map])

  const switchTileset = tileset => {
    if (map.getLayer('your-vector-layer')) {
      map.removeLayer('your-vector-layer')
    }

    if (map.getSource('your-vector-source')) {
      map.removeSource('your-vector-source')
    }

    map.addSource('your-vector-source', {
      type: 'vector',
      url: `mapbox://${tileset.id}`,
    })

    map.addLayer({
      id: 'your-vector-layer',
      type: 'fill',
      source: 'your-vector-source',
      'source-layer': tileset.name,
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
          4,
          'green',
          'black',
        ],
        'fill-opacity': 0.6,
      },
    })

    map.flyTo({ center: tileset.center, zoom: tileset.zoom })
  }

  return (
    <div>
      <div ref={mapContainerRef} style={{ width: '100%', height: '90vh' }} />

      <div>
        {vectorTilesets.map(tileset => (
          <button key={tileset.id} onClick={() => switchTileset(tileset)}>
            {tileset.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default App

//import React, { useEffect, useRef, useState } from 'react'
// import mapboxgl from 'mapbox-gl'
// import 'mapbox-gl/dist/mapbox-gl.css' // Import mapbox-gl CSS

// mapboxgl.accessToken =
//   'pk.eyJ1IjoibHVkZmkiLCJhIjoiY2xoZWpwemM1MWxzbjN0b2FyaW5qdXJzNCJ9.c-SshhzMhRvnuUqku2LKEg' // Use your Mapbox token here

// const App = () => {
//   const mapContainerRef = useRef(null)
//   const popupRef = useRef(new mapboxgl.Popup({ offset: 15 }))
//   const [mapState, setMapState] = useState({
//     tilesetId: 'SBB_SawahSempadan-b5zxxf',
//     center: [101.212, 3.456],
//     zoom: 12.47,
//   })
//   const mapRef = useRef(null)

//   const tilesets = [
// { id: 'SBB_SawahSempadan-b5zxxf', center: [101.212, 3.456], zoom: 12.47 },
// { id: 'SBB_SungaiBesar-5ivn2i', center: [100.996, 3.689], zoom: 12.38 },
// { id: 'SBB_SungaiManik-1h1g7j', center: [101.077, 4.078], zoom: 14.01 },
// { id: 'SBB_LabuKubong-6jf9ep', center: [101.058, 4.105], zoom: 12.09 },
// { id: 'SBB_LamborKiri-97sftn', center: [100.888, 4.262], zoom: 14.43 },
// { id: 'SBB_Kerian-b5je8f', center: [100.473, 5.078], zoom: 12.21 },
// { id: 'SBB_SungaiDua-5dp8bq', center: [100.425, 5.466], zoom: 13.49 },
// { id: 'SBB_TikamBatu-dhrwfs', center: [100.426, 5.569], zoom: 14.33 },
// { id: 'SBB_SelarongBatang-7oosb4', center: [100.392, 6.016], zoom: 13.11 },
// ]

//   const changeTileset = (tilesetId, center, zoom) => {
//     setMapState({ tilesetId, center, zoom })
//   }

//   useEffect(() => {
//     mapRef.current = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: mapState.center,
//       zoom: mapState.zoom,
//     })

//     mapRef.current.on('load', () => {
//       mapRef.current.addSource('your-vector-source', {
//         type: 'vector',
//         url: `mapbox://${mapState.tilesetId}`,
//       })

//       mapRef.current.addLayer({
//         id: 'your-vector-layer',
//         type: 'fill',
//         source: 'your-vector-source',
//         'source-layer': mapState.tilesetId,
//         paint: {
//           'fill-color': [
//             'match',
//             ['get', 'gridcode'],
//             1,
//             'red',
//             2,
//             'orange',
//             3,
//             'yellow',
//             4,
//             'green',
//             'black',
//           ],
//           'fill-opacity': 0.6,
//         },
//       })

//       mapRef.current.on('mousemove', 'your-vector-layer', e => {
//         if (e.features.length) {
//           const feature = e.features[0]
//           popupRef.current
//             .setLngLat(e.lngLat)
//             .setHTML(`SBB_SawahSempadan-b5zxxf`)
//             .addTo(mapRef.current)
//         }
//       })

//       mapRef.current.on('mouseleave', 'your-vector-layer', () => {
//         popupRef.current.remove()
//       })

//       mapRef.current.on('click', 'your-vector-layer', e => {
//         if (e.features.length) {
//           const feature = e.features[0]
//           const popupContent = `
//             SBB_SawahSempadan-b5zxxf<br/>
//             id (${feature.id})<br/>
//             gridcode# (${feature.properties.gridcode})<br/>
//             Id# (${feature.properties.Id})<br/>
//             Shape_Area# (${feature.properties.Shape_Area})<br/>
//             Shape_Leng# (${feature.properties.Shape_Leng})
//           `
//           new mapboxgl.Popup({ offset: [0, -15] })
//             .setLngLat(e.lngLat)
//             .setHTML(popupContent)
//             .addTo(mapRef.current)
//         }
//       })
//     })

//     return () => mapRef.current.remove()
//   }, [mapState])

//   useEffect(() => {
//     if (mapRef.current && mapRef.current.getSource('your-vector-source')) {
//       mapRef.current
//         .getSource('your-vector-source')
//         .setData(`mapbox://${mapState.tilesetId}`)
//       mapRef.current.flyTo({
//         center: mapState.center,
//         zoom: mapState.zoom,
//       })
//     }
//   }, [mapState])

//   return (
//     <div className='map-container' style={{ width: '100%', height: '90vh' }}>
//       <div>
//         {tilesets.map(tileset => (
//           <button
//             key={tileset.id}
//             onClick={() =>
//               changeTileset(tileset.id, tileset.center, tileset.zoom)
//             }
//           >
//             {tileset.id}
//           </button>
//         ))}
//       </div>
//       <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
//     </div>
//   )
// }

// export default App
