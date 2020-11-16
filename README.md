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
SINK_FOLDER_PATH='/Users/hmenzagh/Desktop/ReMarkable-Sink' # Must be an absolute path
REMARKABLE_FOLDER='Sink' # To create in top-level ReMarkable folder
```

**5 - Do a quick test with `yarn start`**

Done 🎉

## Run at startup

*(This setup is done for MacOS depending on your OS process will differ)*

**1 - Install [forever](https://github.com/foreverjs/forever#readme)**

`npm install forever -g`

**2 - Edit crontab**

```sudo crontab -e```

add

```@reboot forever start /Users/hmenzagh/Projects/ReMarkable-Sink/index.js```

replacing `/Users/hmenzagh/Projects/ReMarkable-Sink/` with your path !

