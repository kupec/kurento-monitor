# Kurento monitor #

Monitor of kurento media pipelines

![kurento-monitor](https://cloud.githubusercontent.com/assets/15513933/26028169/6ec689e8-3823-11e7-9915-0398b7ef8ffa.png)

## How to use it? ##

Clone project and run:

```
npm install
node index.js HOST PORT
```

where `HOST`,`PORT` is the kurento websocket ip/port

## Pipeline names ##

Monitor can group pipelines by project name. The part of pipeline name before `__` is used as project name. For example, in *foobar* project you should add such line:

```
pipeline.setName('foobar__' + userId);
```

