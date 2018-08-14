import glob from 'glob'
import path from 'path'

export default glob.sync('./src/*.js').map(file => {
  const name = path.basename(file, path.extname(file))
  return {
    mode: process.env.NODE_ENV,
    node: false,
    entry: {
      [name]: file
    },
    output: {
      path: path.resolve('.'),
      filename: '[name].js'
    },
    module: {
      rules: [{
        test: /.js$/,
        use: 'babel-loader'
      }]
    },
    optimization: {
      minimize: false
    },
    plugins: [

    ],
    externals: [
      (context, request, callback) => {
        if(Boolean(~request.indexOf(name))) {
          callback()
          return
        }

        callback(null, 'commonjs ' + request)
      }
    ]
  }
})
