<center><h1>Game<b>Arch</b></h2></center>

<!-- MarkdownTOC autolink="true" -->
- [About](#About)
- [Getting Started](#Getting-Started)
  - [Commands](#Basic-Commands)
- [Installation](#Getting-Started)
  - [Self hosted](#Self-hosted)
  - [Docker](#Docker)
  - [Custom variables](#Self-hosted)
- [Extras](#Extras)
  - [Telegram Bot](#Telegram-Bot)
- [Information](#Information)
  - [Resolution mode](#Resolution-Mode)
  - [Images](#Images)
  - [Backup](#Backup)
<!-- /MarkdownTOC -->
## About

GameArch (Game Archive) is a self-hosted open-source tool for your videogame collection. 


want to contribute? simply open a PR in the ```dev``` branch, or get in touch. 

## Getting Started

First, you can edit the two dotenv files in the root of the project for enabling / disabling the auto open for Browsers, and in the Backend folder to set the credentials for the Nodemailer, the initial created User and so on.

### Basic Commands
1. `yarn install` install the dependencys.
2. `yarn start` in the Frontend directory starts the react app on port 3000 (Linux).
3. `yarn start-win` in the Frontend directory starts the react app on port 3000 (Windows).
4. `yarn start` in the Backend directory starts the express server on port 5000.
5. `yarn build` in the Frontend directory trigger a production build for the Frontend.

## Installation

### Self hosted
1. clone the `main` branch to your machine with ` git clone   https://github.com/Cryptec/GameArch.git` and change the directory with `cd GameArch`.
2. switch to the Frontend directory with `cd Frontend`, followed by `yarn install` install the dependencys. Repeat this in the Backend directory.
3. in both directorys change the name of `example.env` to `.env`. To edit the files use your favourite editor like <code>nano</code>. <b>it is important to set the email settings, otherwise the reset password function will not work!</b>
4. `yarn start` in the Backend directory starts the express server on port 5000.
5. `yarn build` in the Frontend directory trigger a production build for the Frontend.

### Docker

Thanks to christophkoenig there is also a Docker conatiner available. You can find the instructions in his 
repository <https://github.com/christophkoenig/docker-gamearch>

### Custom variables
1. define the platforms/consoles for your needs in   `/Frontend/src/utils/platforms.js`

## Extras

### Telegram-Bot

The Telegram bot is an experimental feature in development, to easily check infos about the collection or gameinfos "on the go".
To use the bot, you need to start the Telegram bot [BotFather](https://telegram.me/BotFather) to receive a Bot-token.
Add this token in the `/Backend/.env` file to `BOT_TOKEN`, and set `TELEGRAM_BOT` to enabled (default is disabled!). Now your created bot is connected with your GameArch installation.

Some commands to use are: 

`/start` - Start the bot.\
`/help` - List all commands.\
`/games <FirstLetter>` - Lists all owned game titles that start with the mentioned letter.\
`/find <GameTitle>` - Checks if the game is in the collection and replies with title and some infos.\
`/info <GameTitle>` - Replies the description of the provided title.\
`/wishlist` - Replies the wishlist.

All commands also work at reply to a message. For example, list all games beginning with the letter 'B', and then reply to a game with `/info`.\
More detailed infos will be provided in the Bot itself.

## Information

### Resolution-Mode

once a sale price is given, the game is automatically marked as 'Not Owned' and of course no longer counts towards the total value of the collection. If you want to undo the whole thing, you should also do this using the resolution mode, namely delete the sale price and, if necessary, mark the game as 'owned' again. You can also simply mark the game as owned again in 'normal' mode, but this changes automatically as soon as you switch back to sale mode, because this recognizes the specified sale price in the database.

Long story short: if you own the game again, delete the sale price!

### Images

the ideal resolution for Boxcover like N64 or SNES to display perfectly in the 'Grid-view' is 800px x 560px!

### Backup

If you want to backup your GameArch Data, you need to save your `db.sqlite` file from the `/Backend/db` folder, and also the images from the `/Backend/public/uploads` folder. 
To restore simply copy the db file and the images back in place in your new installation.
