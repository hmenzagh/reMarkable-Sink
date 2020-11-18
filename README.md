![logo](./assets/logo.png)

Ultra-simple node app that uploads files from a folder to your reMarkable Tablet thanks to [RmApi](https://github.com/juruen/rmapi) & [watchman](https://facebook.github.io/watchman/docs/install.html).
It can be used for simple dnd transfer and can be useful in many other automated applications.

Demo video: https://www.youtube.com/watch?v=SX8s0wqZ2ks&feature=youtu.be

⚠️ Files placed in the folder will be **uploaded then deleted** ⚠️

## Installation

**1 - Clone & install repo**

`git clone https://github.com/hmenzagh/reMarkable-Sink && cd reMarkable-Sink && yarn`

**2 - Install [watchman](https://facebook.github.io/watchman/docs/install.html)**

**3 - Install & Configure [RmApi](https://github.com/juruen/rmapi)**

Don't forget to run & set your one-time code !

**4 - Setup .env file**

```bash
PATH_TO_RMAPI='/Users/hmenzagh/go/bin/rmapi'
SINK_FOLDER_PATH='/Users/hmenzagh/Desktop/reMarkable-Sink' # Must be an absolute path
REMARKABLE_FOLDER='Sink' # To create in top-level reMarkable folder
```

**5 - Do a quick test with `yarn start`**

Done 🎉 
*(don't forgat to exit the process before setting up daemon)*

## Run at startup

### MacOS

*(Tested on Big Sur)*

**1 - Update `com.remarkable-sink.hmenzagh.plist`**

Change line `:15` to reflect your folder absolute path

**2 - Install [Brew](https://brew.sh)**

*Setup command as of 11/2020*

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

**3 - Install bash**

```brew install bash```

⚠️ This is needed because of MacOS's **SIP** that prevents reMarkable-Sink from deleting/reading the PDFs properly and causes EPERM errors. The other option is to disable SIP witch is not recommended for most users.

**4 - Install [forever](https://github.com/foreverjs/forever#readme)**

```npm install forever -g```

**5 - Move the plist to Launch LaunchAgents**

```bash
mv com.remarkable-sink.hmenzagh.plist ~/Library/LaunchAgents/.
```

6 - Start the daemon

```bash
launchctl load ~/Library/LaunchAgents/com.remarkable-sink.hmenzagh.plist
launchctl start com.remarkable-sink.hmenzagh
```
or restart the computer !

*(launchctl load can fail and is a known issue with Big Sur, in this case you should restart)*

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
