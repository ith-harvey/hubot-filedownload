## Hubot Slack Blacklist

Copied and reversed from [Michael Davis' Hubot Slack Whitelist](https://github.com/michaeljacobdavis/hubot-slack-whitelist-middleware)

Don't want `#general` to trigger your bot?

**Use this.**

## How to use

**Install**
```
npm install --save hubot-slack-blacklist-middleware
```

**Register**

In `external-scripts.json` add

```
"hubot-slack-blacklist-middleware"
```


This is meant for slack, but will work with any [adapter](https://github.com/github/hubot/blob/master/docs/adapters.md) that exposes the current channel via `context.response.envelope.room`.

## Environment Variables
There are two ways to set a blacklist:

Environment Variable | Description | Example
--- | --- | ---
`HUBOT_BLACKLIST` | A comma separated list (no spaces). | `random,general`
`HUBOT_BLACKLIST_PATH` | Set the path (relative to your hubot directory) to a `json`/`js`/`coffee` file that returns an array of blacklisted channels. | `blacklist.json`
