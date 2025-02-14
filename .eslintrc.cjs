module.exports = {
  root: true,
  ignorePatterns: ["node_modules/**/*.*"],
  parser: "@typescript-eslint/parser",
  overrides: [
    {
      files: ["*.ts"],
      parserOptions: {
        project: ["tsconfig.json"]
      },
      extends: [
        "plugin:prettier/recommended"
      ],
      rules: {
        "prettier/prettier": [
          "error",
          {
            "printWidth": 120,
            "tabWidth": 4,
            "semi": true,
            "singleQuote": true,
            "trailingComma": "none",
            "singleAttributePerLine": true,
            "endOfLine": "auto",
            "bracketSameLine": true,
          }
        ],
      }
    }
  ],

};
