# Hubot-filedownload bot

This bot built on the [Hubot][hubot] framework and provides a download file functionality to the Rocket.Chat Hubot.

Simply run a command then upload a file, the bot will then retreive the file from the Rocket.Chat server where it is setup and write the file locally to the server where the bot is running.

## Installation instructions

* `npm install --save hubot-filedownload`: Download the bot via npm
* `["hubot-filedownload"]`:add the script to the Hubot's `external-scripts.json` file

Make sure the following Rocket.Chat environment variables are set:

* export ROCKETCHAT_USER=[name of the bot]
* export ROCKETCHAT_PASSWORD=[password for the bot]
* export ROCKETCHAT_URL= <URL HERE>

The file-download bot relies on the above variables to retrieve an authorization token from the Rocket.Chat server where it is setup.
(To learn more about environment variables and how they effect Hubot look at the Rocket.Chat Hubot github: https://github.com/RocketChat/hubot-rocketchat)

### Commands

  * `@[bot name] download file` : Instructs the bot to listen for the file upload.

## More information on Hubot:

[hubot]: http://hubot.github.com
[generator-hubot]: https://github.com/github/generator-hubot
