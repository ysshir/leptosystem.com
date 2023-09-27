module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "testMatch": [
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  moduleNameMapper: {
    "core/(.*)$": "<rootDir>/src/$1",
    "www/(.*)$": "<rootDir>/src/Modules/www/$1"
  }
}
