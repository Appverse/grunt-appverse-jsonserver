## [Appverse](http://appverse.org/#)
![](http://appversed.files.wordpress.com/2012/12/logo.png)

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
![](https://img.shields.io/npm/v/grunt-appverse-jsonserver.svg) ![](https://img.shields.io/npm/dm/grunt-appverse-jsonserver.svg) ![](https://img.shields.io/npm/l/grunt-appverse-jsonserver.svg)
[![Dependency Status](https://img.shields.io/david/appverse/grunt-appverse-jsonserver.svg?style=flat-square)](https://david-dm.org/appverse/grunt-appverse-jsonserver)
[![devDependency Status](https://img.shields.io/david/dev/appverse/grunt-appverse-jsonserver.svg?style=flat-square)](https://david-dm.org/appverse/grunt-appverse-jsonserver#info=devDependencies)
[![Inline docs](http://inch-ci.org/github/appverse/grunt-appverse-jsonserver.svg)](http://inch-ci.org/github/appverse/grunt-appverse-jsonserver)

# grunt-appverse-jsonserver

> Grunt tasks to build and run a REST Server with JSON Files

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-appverse-jsonserver --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-appverse-jsonserver');
```


## The "jsonserver" task

### Overview
In your project's Gruntfile, add a section named `jsonserver` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  jsonserver: {
    options: {
      keepAlive:true
    },
    your_target: {
      apidir: 'api',
      port: 8888,
      options : {
        keepAlive:true
      }
    },
  },
})
```

### Settings

#### apidir
Type: `String`

A string value with project directory with JSON files to route by the [json-server](https://github.com/typicode/json-server)

#### port
Type: `Integer`

The port number to use by the [json-server](https://github.com/typicode/json-server)

#### options.keepAlive
Type: `Boolean`
Default value: `false`

Keep the server alive indefinitely. Note that if this option is enabled, any tasks specified after this task will never run. By default, once grunt's tasks have completed, the web server stops. This option changes that behavior. Use it when you run *jsonserver* task as standalone task, it is not necessary to use it with *watch* task combination.

### Usage Examples

#### Multiple instances
In this example, we are setting different servers that will serve different JSON folders.

```js
grunt.initConfig({
  jsonserver: {   
    server_api: {
       apidir: 'api',
       port: 8989
    },
    server_api2: {
       apidir: 'api2',
       port: 8999
    },
  },
})
```

You can run one target:  

```shell
grunt jsonserver:server_api
```

or

```shell
grunt jsonserver:server_api2
```

Or run all the targets:

```shell
grunt jsonserver
```

##### keepAlive multiple instances
Grunt multi target task will run all targets found if no target specified, so in order to keep alive all instances, you only need to set the flag in the last target.

```js
grunt.initConfig({
  jsonserver: {   
    server_api: {
       apidir: 'api',
       port: 8989
    },
    server_api2: {
       apidir: 'api2',
       port: 8999,
       options: {
         keepAlive: true
       }
    },
  },
})
```


## The "jserver" task
This task no needs configuration, it just will run the json-server with default behaviour.

  Directory: `api`

  Port: `8888`

  Keep Alive: `false`

## License
Copyright (c) 2012 GFT Appverse, S.L., Sociedad Unipersonal.

This Source  Code Form  is subject to the  terms of  the Appverse Public License
Version 2.0  ("APL v2.0").  If a copy of  the APL  was not  distributed with this
file, You can obtain one at <http://appverse.org/legal/appverse-license/>.

Redistribution and use in  source and binary forms, with or without modification,
are permitted provided that the  conditions  of the  AppVerse Public License v2.0
are met.

THIS SOFTWARE IS PROVIDED BY THE  COPYRIGHT HOLDERS  AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS  OR IMPLIED WARRANTIES, INCLUDING, BUT  NOT LIMITED TO,   THE IMPLIED
WARRANTIES   OF  MERCHANTABILITY   AND   FITNESS   FOR A PARTICULAR  PURPOSE  ARE
DISCLAIMED. EXCEPT IN CASE OF WILLFUL MISCONDUCT OR GROSS NEGLIGENCE, IN NO EVENT
SHALL THE  COPYRIGHT OWNER  OR  CONTRIBUTORS  BE LIABLE FOR ANY DIRECT, INDIRECT,
INCIDENTAL,  SPECIAL,   EXEMPLARY,  OR CONSEQUENTIAL DAMAGES  (INCLUDING, BUT NOT
LIMITED TO,  PROCUREMENT OF SUBSTITUTE  GOODS OR SERVICES;  LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT(INCLUDING NEGLIGENCE OR OTHERWISE)
ARISING  IN  ANY WAY OUT  OF THE USE  OF THIS  SOFTWARE,  EVEN  IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.
