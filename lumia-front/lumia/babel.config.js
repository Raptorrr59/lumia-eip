module.exports = {
    presets: [
      [
        '@babel/preset-react',
        {
          runtime: 'automatic', // <-- active le runtime automatique
        },
      ],
      '@babel/preset-env'
    ],
  };