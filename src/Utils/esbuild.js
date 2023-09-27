// コマンドライン
(() => {
  const [, , source, dist, ...rest] = process.argv;

  const options = {
    entryPoints: [source],
    outfile    : dist,
    platform   : 'node',
    external   : [
      // knex
      'oracledb', 'tedious', 'mysql', 'mysql2', 'pg-native', 'pg-query-stream', 'better-sqlite3', 'sqlite3'
    ],
  }

  rest.forEach(elem => {
    if (!elem.startsWith('--')) {
      return;
    }

    if (elem.startsWith('--platform=')) {
      options['platform'] = elem.substring(11);
    }
    else {
      options[elem.substring(2)] = true;
    }
  });

  if (options.watch) {
    require('esbuild').build(options)
  }
  else {
    require('esbuild').buildSync(options);
  }
})();
