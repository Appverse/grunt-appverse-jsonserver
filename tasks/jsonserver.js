/*
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
 */

'use strict';

module.exports = function (grunt) {
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
   grunt.registerMultiTask('jsonserver', 'Multitask - Running Mock Server', function() {
      grunt.log.writeln('Running : ' + this.target + ' : ' + JSON.stringify (this.data));
      var options = this.options ({keepAlive: false});
      var apidir = this.data.apidir;
      var port = this.data.port;
      runServer (apidir, port);
      var keepAlive = options.keepAlive;
      if (this.data.options) {
         keepAlive = this.data.options.keepAlive;
      }
      if (keepAlive) {
         this.async();
      }
   });

   grunt.registerTask('jserver', 'Running Mock Server with default configuration', function() {
      grunt.log.writeln('Running Mock Server with default configuration');
      runServer ('api', 8888);
   });

   function runServer (apidir,port) {
     var jsonServer = require('json-server');
     var fs = require('fs');
     var path = require('path');
     grunt.log.writeln('Reading MOCK - JSON directory. Loading al the JSON files to the MockServer database.');
     var apiFolder = path.join(process.cwd(), apidir + '/');
     grunt.log.writeln('Folder: ' + apiFolder);
     grunt.log.writeln('Port: ' + port);
     if (!fs.existsSync(apiFolder)) {
         fs.mkdirSync(apiFolder);
     }
     var db = {};
     var files = fs.readdirSync(apiFolder);
     files.forEach(function (file) {
         if (path.extname(apiFolder + file) === '.json') {
             db[path.basename(apiFolder + file, '.json')] = require(path.join(apiFolder,file));
         }
     });
     // Returns an Express server
     var server = jsonServer.create();
     // Set default middlewares (logger, static, cors and no-cache)
     server.use(jsonServer.defaults());
     // Returns an Express router
     var router = jsonServer.router(db);
     server.use(router);
     server.listen(port);
   }

};
