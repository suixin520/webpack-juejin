module.exports = function(env, argv) {
  console.log('env', env);
  console.log('argv', argv);
  return argv.mode === 'production' ?
    require('./configs/webpack.production') :
    require('./configs/webpack.development')
}