module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "linebreak-style": 0,
    "no-tabs": 0,
    "no-console": 0,
    "no-use-before-define": 0,
    "no-case-declarations": 0,
    "import/extensions": 0,
    "no-new": 0,
    "no-async-promise-executor": 0,
  },
};
