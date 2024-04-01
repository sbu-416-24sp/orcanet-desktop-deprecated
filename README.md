# README

## About

This is the official Wails React-TS template.

You can configure the project by editing `wails.json`. More information about the project settings can be found
here: https://wails.io/docs/reference/project-config

## Live Development

To run in live development mode, run `wails dev` in the project directory. This will run a Vite development
server that will provide very fast hot reload of your frontend changes. If you want to develop in a browser
and have access to your Go methods, there is also a dev server that runs on http://localhost:34115. Connect
to this in your browser, and you can call your Go code from devtools.

## Installation Instruction

To get started with this project, you will need to install dependencies in both the root directory and the frontend directory.
Install the required prop-types package by running:
npm install prop-types --legacy-peer-deps


## Building

To build a redistributable, production mode package, use `wails build`.


