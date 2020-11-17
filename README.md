![logo](./assets/logo.png)

Ultra-simple node app that uploads files from a folder to your reMarkable Tablet thanks to [RmApi](https://github.com/juruen/rmapi) & [watchman](https://facebook.github.io/watchman/docs/install.html).
It can be used for simple dnd transfer and can be useful in many other automated applications.

⚠️ Files placed in the folder will be **uploaded then deleted** ⚠️

## Installation

**1 - Clone & install repo**

`git clone https://github.com/hmenzagh/reMarkable-Sink && cd reMarkable-Sink && yarn`

**2 - Install [watchman](https://facebook.github.io/watchman/docs/install.html)**

**3 - Install & Configure & Set PATH for [RmApi](https://github.com/juruen/rmapi)**

Make sure you can execute `rmapi` just by typing `rmapi` in your terminal.

**4 - Setup .env file**

```bash
PATH_TO_RMAPI='/Users/hmenzagh/go/bin/rmapi'
SINK_FOLDER_PATH='/Users/hmenzagh/Desktop/reMarkable-Sink' # Must be an absolute path
REMARKABLE_FOLDER='Sink' # To create in top-level reMarkable folder
```

**5 - Do a quick test with `yarn start`**

Done 🎉

## Run at startup

### MacOS

*(Tested on Big Sur)*

**1 - Update `com.reMarkable-Sink.hmenzagh.plist`**

Change line `:15` to reflect your folder absolute path

**2 - Install [Brew](https://brew.sh)**

*Setup command as of 11/2020*

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

**3 - Install bash**

brew install bash

⚠️ This is needed because of MacOS's **SIP** that prevents reMarkable-Sink from deleting/reading the PDFs properly and causes EPERM errors. The other option is to disable SIP witch is not recommended for most users.

**4 - Move the plist to Launch LaunchAgents**

```bash
mv com.reMarkable-Sink.hmenzagh.plist ~/Library/LaunchAgents/.
```

### Linux

*(Alternatively you can setup a crontab)*

**1 - Install [PM2](https://github.com/Unitech/pm2)**

`sudo npm install pm2 -g`

**2 - Start reMarkable-Sink**

`pm2 start index.js -n reMarkable-Sink`

**3 - Save setup**

`pm2 save`

**4 - Set at startup**

`sudo pm2 startup` and follow instructions if needed !

## Limitations

- Only accepts PDFs < 50mo
- The user that executes index.sj needs to be the user that is logged in with RmAPI
