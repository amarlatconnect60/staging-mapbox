// import React, { useEffect, useRef, useState } from 'react'
// import mapboxgl from 'mapbox-gl'
// import 'mapbox-gl/dist/mapbox-gl.css' //import css library

// mapboxgl.accessToken =
//   'pk.eyJ1IjoibHVkZmkiLCJhIjoiY2xoZWpwemM1MWxzbjN0b2FyaW5qdXJzNCJ9.c-SshhzMhRvnuUqku2LKEg'

// const vectorTilesets = [
//   {
//     name: 'SBB_SawahSempadan-b5zxxf',
//     id: 'ludfi.d3kgp4v5',
//     center: [101.212, 3.456],
//     zoom: 12.47,
//   },
//   {
//     name: 'SBB_SungaiBesar-5ivn2i',
//     id: 'ludfi.7gd5ph03',
//     center: [100.996, 3.689],
//     zoom: 12.38,
//   },
//   {
//     name: 'SBB_SungaiManik-1h1g7j',
//     id: 'ludfi.3h80mkkk',
//     center: [101.077, 4.078],
//     zoom: 14.01,
//   },
//   {
//     name: 'SBB_LabuKubong-6jf9ep',
//     id: 'ludfi.55idvngu',
//     center: [101.058, 4.105],
//     zoom: 12.09,
//   },
//   {
//     name: 'SBB_LamborKiri-97sftn',
//     id: 'ludfi.7k8vwcw5',
//     center: [100.888, 4.262],
//     zoom: 14.43,
//   },
//   {
//     name: 'SBB_Kerian-b5je8f',
//     id: 'ludfi.82v0kb9b',
//     center: [100.473, 5.078],
//     zoom: 12.21,
//   },
//   {
//     name: 'SBB_SungaiDua-54csrd',
//     id: 'ludfi.autu1orm',
//     center: [100.425, 5.466],
//     zoom: 13.49,
//   },
//   {
//     name: 'SBB_TikamBatu-9nqq8h',
//     id: 'ludfi.1pf2yazn',
//     center: [100.426, 5.569],
//     zoom: 14.33,
//   },
//   {
//     name: 'SBB_SelarongBatang-7oosb4',
//     id: 'ludfi.213z4h99',
//     center: [100.392, 6.016],
//     zoom: 13.11,
//   },
// ]

// const App = () => {
//   const mapContainerRef = useRef(null)
//   const popupRef = useRef(new mapboxgl.Popup({ offset: 15 }))
//   const [map, setMap] = useState(null)

//   useEffect(() => {
//     const mapInstance = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: 'mapbox://styles/mapbox/dark-v11',
//       center: vectorTilesets[0].center,
//       zoom: vectorTilesets[0].zoom,
//     })

//     mapInstance.on('load', () => {
//       setMap(mapInstance)
//     })

//     return () => mapInstance.remove()
//   }, [])

//   useEffect(() => {
//     if (map) {
//       map.addSource('your-vector-source', {
//         type: 'vector',
//         url: `mapbox://${vectorTilesets[0].id}`,
//       })

//       map.addLayer({
//         id: 'your-vector-layer',
//         type: 'fill',
//         source: 'your-vector-source',
//         'source-layer': vectorTilesets[0].name,
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

//       // Add border layer source and layer
//       map.addSource('border-source', {
//         type: 'vector',
//         url: `mapbox://ludfi.99uvhjbb`,
//       })

//       // Add border fill layer
//       map.addLayer({
//         id: 'border-fill-layer',
//         type: 'fill',
//         source: 'border-source',
//         'source-layer': 'ALL_SBB_POLYGON-7gaa7g',
//         paint: {
//           'fill-color': 'rgba(0, 0, 0, 0)', // fully transparent fill
//           'fill-outline-color': 'black', // black outline
//         },
//       })

//       // Add border line layer
//       map.addLayer({
//         id: 'border-line-layer',
//         type: 'line',
//         source: 'border-source',
//         'source-layer': 'ALL_SBB_POLYGON-7gaa7g',
//         paint: {
//           'line-color': 'black', // black line
//           'line-width': 3, // adjust to the desired thickness
//         },
//       })

//       map.on('click', 'border-fill-layer', e => {
//         const features = map.queryRenderedFeatures(e.point, {
//           layers: ['border-fill-layer'],
//         })

//         if (!features.length) {
//           return
//         }

//         const feature = features[0]

//         const popup = new mapboxgl.Popup({ offset: [0, -15] })
//           .setLngLat(e.lngLat)
//           .setHTML(
//             `<h3>LOT ${feature.properties.LOT}</h3>` +
//               `<ul>` +
//               `<li>id: ${feature.properties.id}</li>` +
//               `<li>ALAMATPEMI: ${feature.properties.ALAMATPEMI}</li>` +
//               `<li>BLOCK: ${feature.properties.BLOCK}</li>` +
//               `<li>CLASS: ${feature.properties.CLASS}</li>` +
//               `<li>DAERAH: ${feature.properties.DAERAH}</li>` +
//               `<li>FASA: ${feature.properties.FASA}</li>` +
//               `<li>Field: ${feature.properties.Field}</li>` +
//               `<li>GUID: ${feature.properties.GUID}</li>` +
//               `<li>Ha: ${feature.properties.Ha}</li>` +
//               `<li>KEGUNAANTA: ${feature.properties.KEGUNAANTA}</li>` +
//               `<li>Field: ${feature.properties.Field}</li>` +
//               `<li>KELUASAN: ${feature.properties.KELUASAN}</li>` +
//               `<li>KEMASKINI: ${feature.properties.KEMASKINI}</li>` +
//               `<li>MI_PRINX: ${feature.properties.MI_PRINX}</li>` +
//               `<li>MUKIM: ${feature.properties.MUKIM}</li>` +
//               `<li>NAMAPEMILI: ${feature.properties.NAMAPEMILI}</li>` +
//               `<li>NEGERI: ${feature.properties.NEGERI}</li>` +
//               `<li>NOFAILUKUR: ${feature.properties.NOFAILUKUR}</li>` +
//               `<li>OBJECTID: ${feature.properties.OBJECTID}</li>` +
//               `<li>PA: ${feature.properties.PA}</li>` +
//               `<li>S_AREA: ${feature.properties.S_AREA}</li>` +
//               `<li>SEKSYEN: ${feature.properties.SEKSYEN}</li>` +
//               `<li>Shape_Area: ${feature.properties.Shape_Area}</li>` +
//               +`<li>Shape_Le_1: ${feature.properties.Shape_Le_1}</li>` +
//               `<li>Shape_Leng: ${feature.properties.Shape_Leng}</li>` +
//               `<li>STATUS: ${feature.properties.STATUS}</li>` +
//               `<li>UPI: ${feature.properties.UPI}</li>` +
//               `</ul>`
//           )
//           .addTo(map)
//       })

//       let hoverPopup = new mapboxgl.Popup({
//         closeButton: false,
//         closeOnClick: false,
//       })

//       map.on('mousemove', 'border-fill-layer', function (e) {
//         if (e.features.length > 0) {
//           const feature = e.features[0]

//           hoverPopup
//             .setLngLat(e.lngLat)
//             .setHTML(`LOT: ${feature.properties.LOT}`)
//             .addTo(map)
//         }
//       })

//       // When the mouse leaves the state-fill layer, remove the popup
//       map.on('mouseleave', 'border-fill-layer', function () {
//         hoverPopup.remove()
//       })
//     }
//   }, [map])

//   const switchTileset = tileset => {
//     if (map.getLayer('your-vector-layer')) {
//       map.removeLayer('your-vector-layer')
//     }

//     if (map.getSource('your-vector-source')) {
//       map.removeSource('your-vector-source')
//     }

//     map.addSource('your-vector-source', {
//       type: 'vector',
//       url: `mapbox://${tileset.id}`,
//     })

//     map.addLayer({
//       id: 'your-vector-layer',
//       type: 'fill',
//       source: 'your-vector-source',
//       'source-layer': tileset.name,
//       paint: {
//         'fill-color': [
//           'match',
//           ['get', 'gridcode'],
//           1,
//           'red',
//           2,
//           'orange',
//           3,
//           'yellow',
//           4,
//           'green',
//           'black',
//         ],
//         'fill-opacity': 0.6,
//       },
//     })

//     map.flyTo({ center: tileset.center, zoom: tileset.zoom })
//   }

//   return (
//     <div>
//       <div ref={mapContainerRef} style={{ width: '100%', height: '500px' }} />

//       <div>
//         {vectorTilesets.map(tileset => (
//           <button key={tileset.id} onClick={() => switchTileset(tileset)}>
//             {tileset.name}
//           </button>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default App

//v2
import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css' //import css library

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

const mapStyles = [
  { label: 'Streets', value: 'mapbox://styles/mapbox/streets-v12' },
  { label: 'Light', value: 'mapbox://styles/mapbox/light-v11' },
  { label: 'Dark', value: 'mapbox://styles/mapbox/dark-v11' },
  { label: 'Outdoors', value: 'mapbox://styles/mapbox/outdoors-v11' },
  {
    label: 'Satellite Streets',
    value: 'mapbox://styles/mapbox/satellite-streets-v12',
  },
]

const App = () => {
  const mapContainerRef = useRef(null)
  const popupRef = useRef(new mapboxgl.Popup({ offset: 15 }))
  const [map, setMap] = useState(null)
  const [mapStyle, setMapStyle] = useState(mapStyles[2].value) // Default style is Dark
  const [selectedTileset, setSelectedTileset] = useState(vectorTilesets[0])

  useEffect(() => {
    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: selectedTileset.center,
      zoom: selectedTileset.zoom,
    })

    mapInstance.on('load', () => {
      setMap(mapInstance)
    })

    return () => mapInstance.remove()
  }, [mapStyle, selectedTileset])

  useEffect(() => {
    if (map && map.isStyleLoaded()) {
      const sourceID = `${selectedTileset.id}-source`
      const layerID = `${selectedTileset.id}-layer`

      // Remove old source and layer if they exist
      if (map.getSource(sourceID)) {
        map.removeLayer(layerID)
        map.removeSource(sourceID)
      }

      map.addSource('sourceID', {
        type: 'vector',
        url: `mapbox://${selectedTileset.id}`,
      })

      map.addLayer({
        id: 'layerID',
        type: 'fill',
        source: 'sourceID',
        'source-layer': selectedTileset.name,
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

      // Add border layer source and layer
      map.addSource('border-source', {
        type: 'vector',
        url: `mapbox://ludfi.99uvhjbb`,
      })

      // Add border fill layer
      map.addLayer({
        id: 'border-fill-layer',
        type: 'fill',
        source: 'border-source',
        'source-layer': 'ALL_SBB_POLYGON-7gaa7g',
        paint: {
          'fill-color': 'rgba(0, 0, 0, 0)', // fully transparent fill
          'fill-outline-color': 'black', // black outline
        },
      })

      // Add border line layer
      map.addLayer({
        id: 'border-line-layer',
        type: 'line',
        source: 'border-source',
        'source-layer': 'ALL_SBB_POLYGON-7gaa7g',
        paint: {
          'line-color': 'black', // black line
          'line-width': 3, // adjust to the desired thickness
        },
      })

      map.on('click', 'border-fill-layer', e => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ['border-fill-layer'],
        })

        if (!features.length) {
          return
        }

        const feature = features[0]

        const popup = new mapboxgl.Popup({ offset: [0, -15] })
          .setLngLat(e.lngLat)
          .setHTML(
            `<h3>LOT ${feature.properties.LOT}</h3>` +
              `<ul>` +
              `<li>id: ${feature.properties.id}</li>` +
              `<li>ALAMATPEMI: ${feature.properties.ALAMATPEMI}</li>` +
              `<li>BLOCK: ${feature.properties.BLOCK}</li>` +
              `<li>CLASS: ${feature.properties.CLASS}</li>` +
              `<li>DAERAH: ${feature.properties.DAERAH}</li>` +
              `<li>FASA: ${feature.properties.FASA}</li>` +
              `<li>Field: ${feature.properties.Field}</li>` +
              `<li>GUID: ${feature.properties.GUID}</li>` +
              `<li>Ha: ${feature.properties.Ha}</li>` +
              `<li>KEGUNAANTA: ${feature.properties.KEGUNAANTA}</li>` +
              `<li>Field: ${feature.properties.Field}</li>` +
              `<li>KELUASAN: ${feature.properties.KELUASAN}</li>` +
              `<li>KEMASKINI: ${feature.properties.KEMASKINI}</li>` +
              `<li>MI_PRINX: ${feature.properties.MI_PRINX}</li>` +
              `<li>MUKIM: ${feature.properties.MUKIM}</li>` +
              `<li>NAMAPEMILI: ${feature.properties.NAMAPEMILI}</li>` +
              `<li>NEGERI: ${feature.properties.NEGERI}</li>` +
              `<li>NOFAILUKUR: ${feature.properties.NOFAILUKUR}</li>` +
              `<li>OBJECTID: ${feature.properties.OBJECTID}</li>` +
              `<li>PA: ${feature.properties.PA}</li>` +
              `<li>S_AREA: ${feature.properties.S_AREA}</li>` +
              `<li>SEKSYEN: ${feature.properties.SEKSYEN}</li>` +
              `<li>Shape_Area: ${feature.properties.Shape_Area}</li>` +
              +`<li>Shape_Le_1: ${feature.properties.Shape_Le_1}</li>` +
              `<li>Shape_Leng: ${feature.properties.Shape_Leng}</li>` +
              `<li>STATUS: ${feature.properties.STATUS}</li>` +
              `<li>UPI: ${feature.properties.UPI}</li>` +
              `</ul>`
          )
          .addTo(map)
      })

      let hoverPopup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      })

      map.on('mousemove', 'border-fill-layer', function (e) {
        if (e.features.length > 0) {
          const feature = e.features[0]

          hoverPopup
            .setLngLat(e.lngLat)
            .setHTML(`LOT: ${feature.properties.LOT}`)
            .addTo(map)
        }
      })

      // When the mouse leaves the state-fill layer, remove the popup
      map.on('mouseleave', 'border-fill-layer', function () {
        hoverPopup.remove()
      })

      map.flyTo({ center: selectedTileset.center, zoom: selectedTileset.zoom })
    }
  }, [map, selectedTileset])

  // const switchTileset = tileset => {
  //   if (map.getLayer('your-vector-layer')) {
  //     map.removeLayer('your-vector-layer')
  //   }

  //   if (map.getSource('your-vector-source')) {
  //     map.removeSource('your-vector-source')
  //   }

  //   map.addSource('your-vector-source', {
  //     type: 'vector',
  //     url: `mapbox://${tileset.id}`,
  //   })

  //   map.addLayer({
  //     id: 'your-vector-layer',
  //     type: 'fill',
  //     source: 'your-vector-source',
  //     'source-layer': tileset.name,
  //     paint: {
  //       'fill-color': [
  //         'match',
  //         ['get', 'gridcode'],
  //         1,
  //         'red',
  //         2,
  //         'orange',
  //         3,
  //         'yellow',
  //         4,
  //         'green',
  //         'black',
  //       ],
  //       'fill-opacity': 0.6,
  //     },
  //   })

  //   map.flyTo({ center: tileset.center, zoom: tileset.zoom })
  // }

  const handleTilesetChange = event => {
    setSelectedTileset(
      vectorTilesets.find(tileset => tileset.id === event.target.value)
    )
  }

  const handleStyleChange = event => {
    setMapStyle(event.target.value)
  }

  return (
    <div>
      <div ref={mapContainerRef} style={{ width: '100%', height: '600px' }} />

      <div>
        <label>Choose map style: </label>
        {mapStyles.map(style => (
          <label key={style.value}>
            <input
              type='radio'
              name='map-style'
              value={style.value}
              checked={mapStyle === style.value}
              onChange={handleStyleChange}
            />
            {style.label}
          </label>
        ))}
      </div>

      <div>
        <label>Choose tileset: </label>
        {vectorTilesets.map(tileset => (
          <label key={tileset.id}>
            <input
              type='radio'
              name='tileset'
              value={tileset.id}
              checked={selectedTileset.id === tileset.id}
              onChange={handleTilesetChange}
            />
            {tileset.name}
          </label>
        ))}
      </div>
    </div>
  )
}

export default App

// v1
// import React, { useEffect, useRef, useState } from 'react'
// import mapboxgl from 'mapbox-gl'
// import 'mapbox-gl/dist/mapbox-gl.css'

// mapboxgl.accessToken =
//   'pk.eyJ1IjoibHVkZmkiLCJhIjoiY2xoZWpwemM1MWxzbjN0b2FyaW5qdXJzNCJ9.c-SshhzMhRvnuUqku2LKEg'

// const vectorTilesets = [
//   {
//     name: 'SBB_SawahSempadan-b5zxxf',
//     id: 'ludfi.d3kgp4v5',
//     center: [101.212, 3.456],
//     zoom: 12.47,
//   },
//   {
//     name: 'SBB_SungaiBesar-5ivn2i',
//     id: 'ludfi.7gd5ph03',
//     center: [100.996, 3.689],
//     zoom: 12.38,
//   },
//   {
//     name: 'SBB_SungaiManik-1h1g7j',
//     id: 'ludfi.3h80mkkk',
//     center: [101.077, 4.078],
//     zoom: 14.01,
//   },
//   {
//     name: 'SBB_LabuKubong-6jf9ep',
//     id: 'ludfi.55idvngu',
//     center: [101.058, 4.105],
//     zoom: 12.09,
//   },
//   {
//     name: 'SBB_LamborKiri-97sftn',
//     id: 'ludfi.7k8vwcw5',
//     center: [100.888, 4.262],
//     zoom: 14.43,
//   },
//   {
//     name: 'SBB_Kerian-b5je8f',
//     id: 'ludfi.82v0kb9b',
//     center: [100.473, 5.078],
//     zoom: 12.21,
//   },
//   {
//     name: 'SBB_SungaiDua-54csrd',
//     id: 'ludfi.autu1orm',
//     center: [100.425, 5.466],
//     zoom: 13.49,
//   },
//   {
//     name: 'SBB_TikamBatu-9nqq8h',
//     id: 'ludfi.1pf2yazn',
//     center: [100.426, 5.569],
//     zoom: 14.33,
//   },
//   {
//     name: 'SBB_SelarongBatang-7oosb4',
//     id: 'ludfi.213z4h99',
//     center: [100.392, 6.016],
//     zoom: 13.11,
//   },
// ]

// const styles = [
//   {
//     id: 'streets-v11',
//     name: 'Streets',
//   },
//   {
//     id: 'light-v10',
//     name: 'Light',
//   },
//   {
//     id: 'dark-v10',
//     name: 'Dark',
//   },
//   {
//     id: 'outdoors-v11',
//     name: 'Outdoors',
//   },
//   {
//     id: 'satellite-streets-v11',
//     name: 'Satellite Streets',
//   },
// ]

// const App = () => {
//   const mapContainerRef = useRef(null)
//   const popupRef = useRef(new mapboxgl.Popup({ offset: 15 }))
//   const [map, setMap] = useState(null)

//   useEffect(() => {
//     const mapInstance = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: 'mapbox://styles/mapbox/dark-v11',
//       center: vectorTilesets[0].center,
//       zoom: vectorTilesets[0].zoom,
//     })

//     mapInstance.on('load', () => {
//       // Add controls to the map
//       mapInstance.addControl(new mapboxgl.FullscreenControl(), 'top-right') // Add fullscreen control
//       mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-right') // Add navigation control

//       setMap(mapInstance)
//     })

//     return () => mapInstance.remove()
//   }, [])

//   useEffect(() => {
//     if (map) {
//       map.addSource('your-vector-source', {
//         type: 'vector',
//         url: `mapbox://${vectorTilesets[0].id}`,
//       })

//       map.addLayer({
//         id: 'your-vector-layer',
//         type: 'fill',
//         source: 'your-vector-source',
//         'source-layer': vectorTilesets[0].name,
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

//       // Add border layer source and layer
//       map.addSource('border-source', {
//         type: 'vector',
//         url: `mapbox://ludfi.99uvhjbb`,
//       })

//       // Add border fill layer
//       map.addLayer({
//         id: 'border-fill-layer',
//         type: 'fill',
//         source: 'border-source',
//         'source-layer': 'ALL_SBB_POLYGON-7gaa7g',
//         paint: {
//           'fill-color': 'rgba(0, 0, 0, 0)', // fully transparent fill
//           'fill-outline-color': 'black', // black outline
//         },
//       })

//       // Add border line layer
//       map.addLayer({
//         id: 'border-line-layer',
//         type: 'line',
//         source: 'border-source',
//         'source-layer': 'ALL_SBB_POLYGON-7gaa7g',
//         paint: {
//           'line-color': 'black', // black line
//           'line-width': 3, // adjust to the desired thickness
//         },
//       })

//       map.on('click', 'border-fill-layer', e => {
//         const features = map.queryRenderedFeatures(e.point, {
//           layers: ['border-fill-layer'],
//         })

//         if (!features.length) {
//           return
//         }

//         const feature = features[0]

//         const popup = new mapboxgl.Popup({ offset: [0, -15] })
//           .setLngLat(e.lngLat)
//           .setHTML(
//             `<h3>LOT ${feature.properties.LOT}</h3>` +
//               `<ul>` +
//               `<li>id: ${feature.properties.id}</li>` +
//               `<li>ALAMATPEMI: ${feature.properties.ALAMATPEMI}</li>` +
//               `<li>BLOCK: ${feature.properties.BLOCK}</li>` +
//               `<li>CLASS: ${feature.properties.CLASS}</li>` +
//               `<li>DAERAH: ${feature.properties.DAERAH}</li>` +
//               `<li>FASA: ${feature.properties.FASA}</li>` +
//               `<li>Field: ${feature.properties.Field}</li>` +
//               `<li>GUID: ${feature.properties.GUID}</li>` +
//               `<li>Ha: ${feature.properties.Ha}</li>` +
//               `<li>KEGUNAANTA: ${feature.properties.KEGUNAANTA}</li>` +
//               `<li>Field: ${feature.properties.Field}</li>` +
//               `<li>KELUASAN: ${feature.properties.KELUASAN}</li>` +
//               `<li>KEMASKINI: ${feature.properties.KEMASKINI}</li>` +
//               `<li>MI_PRINX: ${feature.properties.MI_PRINX}</li>` +
//               `<li>MUKIM: ${feature.properties.MUKIM}</li>` +
//               `<li>NAMAPEMILI: ${feature.properties.NAMAPEMILI}</li>` +
//               `<li>NEGERI: ${feature.properties.NEGERI}</li>` +
//               `<li>NOFAILUKUR: ${feature.properties.NOFAILUKUR}</li>` +
//               `<li>OBJECTID: ${feature.properties.OBJECTID}</li>` +
//               `<li>PA: ${feature.properties.PA}</li>` +
//               `<li>S_AREA: ${feature.properties.S_AREA}</li>` +
//               `<li>SEKSYEN: ${feature.properties.SEKSYEN}</li>` +
//               `<li>Shape_Area: ${feature.properties.Shape_Area}</li>` +
//               +`<li>Shape_Le_1: ${feature.properties.Shape_Le_1}</li>` +
//               `<li>Shape_Leng: ${feature.properties.Shape_Leng}</li>` +
//               `<li>STATUS: ${feature.properties.STATUS}</li>` +
//               `<li>UPI: ${feature.properties.UPI}</li>` +
//               `</ul>`
//           )
//           .addTo(map)
//       })

//       let hoverPopup = new mapboxgl.Popup({
//         closeButton: false,
//         closeOnClick: false,
//       })

//       map.on('mousemove', 'border-fill-layer', function (e) {
//         if (e.features.length > 0) {
//           const feature = e.features[0]

//           hoverPopup
//             .setLngLat(e.lngLat)
//             .setHTML(`LOT: ${feature.properties.LOT}`)
//             .addTo(map)
//         }
//       })

//       // When the mouse leaves the state-fill layer, remove the popup
//       map.on('mouseleave', 'border-fill-layer', function () {
//         hoverPopup.remove()
//       })
//     }
//   }, [map])

//   const switchTileset = tileset => {
//     if (map.getLayer('your-vector-layer')) {
//       map.removeLayer('your-vector-layer')
//     }

//     if (map.getSource('your-vector-source')) {
//       map.removeSource('your-vector-source')
//     }

//     map.addSource('your-vector-source', {
//       type: 'vector',
//       url: `mapbox://${tileset.id}`,
//     })

//     map.addLayer({
//       id: 'your-vector-layer',
//       type: 'fill',
//       source: 'your-vector-source',
//       'source-layer': tileset.name,
//       paint: {
//         'fill-color': [
//           'match',
//           ['get', 'gridcode'],
//           1,
//           'red',
//           2,
//           'orange',
//           3,
//           'yellow',
//           4,
//           'green',
//           'black',
//         ],
//         'fill-opacity': 0.6,
//       },
//     })

//     map.flyTo({ center: tileset.center, zoom: tileset.zoom })
//   }

//   const switchStyle = styleId => {
//     const styleUrl = `mapbox://styles/mapbox/${styleId}`
//     map.setStyle(styleUrl)
//   }

//   return (
//     <div>
//       <div ref={mapContainerRef} style={{ width: '100%', height: '600px' }} />

//       <div>
//         <h2>Map Styles</h2>
//         {styles.map(style => (
//           <label key={style.id}>
//             <input
//               type='radio'
//               name='mapStyle'
//               value={style.id}
//               onChange={() => switchStyle(style.id)}
//             />
//             {style.name}
//           </label>
//         ))}
//       </div>

//       <div>
//         <h2>Vector Tilesets</h2>
//         {vectorTilesets.map(tileset => (
//           <label key={tileset.id}>
//             <input
//               type='radio'
//               name='tileset'
//               value={tileset.id}
//               onChange={() => switchTileset(tileset)}
//             />
//             {tileset.name}
//           </label>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default App
