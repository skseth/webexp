'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
// https://github.com/bripkens/connect-history-api-fallback
// handles issues with reloading SPA urls
import historyApiFallback from 'connect-history-api-fallback';


const reload = browserSync.reload;



// CONFIG PARAMS
const SERVER_PORT = 5000
const APP_PREFIX = 'scaffold'


// Watch files for changes & reload
gulp.task('serve', () => {

    // https://www.browsersync.io/docs/options/ 
  browserSync({
    port: SERVER_PORT,

    // don't show notifications in browser
    notify: false,

    logPrefix: APP_PREFIX,

    // You need to add the text in match to your html body
    // this allows browserSync to put the reload snippet at that point
    snippetOptions: {
      rule: {
        match: '<span id="browser-sync-binding"></span>',
        fn: function(snippet) {
          return snippet;
        }
      }
    },
    // https: true,
    // adds certificate warning
    server: {
      baseDir: ['app'],
      directory: true,
      middleware: [historyApiFallback()]
    }
  });

  gulp.watch(['app/**/*'], [reload]);
});
