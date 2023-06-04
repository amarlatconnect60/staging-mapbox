module.exports = function override(config, env) {
  // Exclude the mapbox-gl package from transpilation
  config.module.rules.push({
    test: /\.m?js/,
    include: /node_modules\/(mapbox-gl)\//,
    type: 'javascript/auto',
  })

  return config
}
