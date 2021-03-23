module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        loose: true,
        modules: false,
        exclude: ["@babel/plugin-transform-typeof-symbol"],
      },
    ],
    ["@babel/preset-typescript"],
  ],
  env: {
    test: {
      presets: [
        [
          "@babel/preset-env",
          {
            loose: true,
            exclude: ["@babel/plugin-transform-typeof-symbol"],
          },
        ],
        ["@babel/preset-typescript"],
      ],
    },
  },
};
