# GameArch

<!-- MarkdownTOC autolink="true" -->
- [About](#About)
- [Getting Started](#Getting-Started)
  - [Commands](#Basic-Commands)
- [Installation](#Getting-Started)
  - [Self hosted](#Self-hosted)
  - [Custom variables](#Self-hosted)
<!-- /MarkdownTOC -->
## About

GameArch (Game Archive) is an open-source Tool for your videogame collection.


want to contribute? simply open a PR in the ```development``` branch, or get in touch. 

NOTE:
The project is at a very early stage, so don´t expect it to work as it should already.

## Getting Started

First, you can edit the two dotenv files in the root of the project for enabling / disabling the auto open for Browsers, and in the Backend folder to set the credentials for the Nodemailer, the initial created User and so on.

### Basic Commands
1. `yarn install` install the dependencys.
2. `yarn start` in the Frontend directory starts the react app on port 3000.
3. `yarn start` in the Backend directory starts the express server on port 5000.
4. `yarn build` in the Frontend directory trigger a production build for the Frontend.

## Installation

### Self hosted
1. clone the `main` branch to your machine with ` git clone   https://github.com/Cryptec/GameArch.git` and change the directory with `cd GameArch`.
2. switch to the Frontend directory with `cd Frontend`, followed by `yarn install` install the dependencys. Repeat this in the Backend directory.
3. in both directorys change the name of `example.env` to `.env`. To edit the files use your favourite editor like <code>nano</code>. <b>it is important to set the email settings, otherwise the reset password function will not work!</b>
4. `yarn start` in the Backend directory starts the express server on port 5000.
5. `yarn build` in the Frontend directory trigger a production build for the Frontend.

### Custom variables
