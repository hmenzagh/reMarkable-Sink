![logo](./assets/logo.png)

Ultra-simple node app that uploads files from a folder to your ReMarkable Tablet thanks to [RmApi](https://github.com/juruen/rmapi) & [watchman](https://facebook.github.io/watchman/docs/install.html).
It can be used for simple dnd transfer and can be useful in many other automated applications.

⚠️ Files placed in the folder will be **uploaded then deleted** ⚠️

## Installation

**1 - Clone & install repo**

`git clone https://github.com/hmenzagh/ReMarkable-Sink && cd ReMarkable-Sink && yarn`

**2 - Install [watchman](https://facebook.github.io/watchman/docs/install.html)**

**3 - Install & Configure & Set PATH for [RmApi](https://github.com/juruen/rmapi)**

Make sure you can execute `rmapi` just by typing `rmapi` in your terminal.

**4 - Setup .env file**

```bash
PATH_TO_RMAPI='/Users/hmenzagh/go/bin/rmapi'
SINK_FOLDER_PATH='/Users/hmenzagh/Desktop/ReMarkable-Sink' # Must be an absolute path
REMARKABLE_FOLDER='Sink' # To create in top-level ReMarkable folder
```

**5 - Do a quick test with `yarn start`**

Done 🎉

## Run at startup

**1 - Install [PM2](https://github.com/Unitech/pm2)**

`npm install pm2 -g`

**2 - Start RemarKable-Sink**

`pm2 start index.js -n ReMarkable-Sink`

**3 - Save setup**

`pm2 save`

**4 - Set at startup**

`pm2 startup` or `sudo pm2 startup` and follow instructions if needed !
