# Node Challenge

## Installation

Simply run npm install and start commands:

```bash
npm install
```
```bash
npm start
```

## How it works

1) It will generate 200.000 random reports using regex and assign them to a readable stream.
2) Each report will be parsed using node's native readline, logging both the current and average wind speed for each ICAO code.