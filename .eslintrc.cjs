module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react", "prettier"],

  rules: {
    "react/jsx-no-target-blank": "off",
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": "error",
    "no-unused-expressions": "error",
    "prefer-const": "error",
    "no-console": "warn",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "arrow-body-style": ["error", "as-needed"],
    "@typescript-eslint/no-explicit-any": 1,
    "@typescript-eslint/no-var-requires": 1,
  },
};
