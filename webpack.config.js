'use strict'

const { exec } = require('child_process')
const path = require('path')

const { DefinePlugin } = require('webpack')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const {
  appId,
  fileLimit,
  isProd: envProd,
  projectRoot
} = require('./env')

class OnBuildPlugin {
  constructor (fn) {
    this.fn = fn
  }

  apply (compiler) {
    compiler.hooks.done.tap('OnBuildPlugin', this.fn)
  }
}

const optimization = {
  minimizer: [
    new TerserWebpackPlugin({
      sourceMap: true
    }),
    new OptimizeCSSAssetsWebpackPlugin({
    })
  ]
}

const getAbsoluteRequire = (mod) =>
  require.resolve(mod).replace(new RegExp(`(/node_modules/${mod})/.*`), (_, m) => m)

const resolve = {
  alias: {
    'prop-types': getAbsoluteRequire('prop-types'),
    react: getAbsoluteRequire('react'),
    'react-dom': getAbsoluteRequire('react-dom'),
    'react-router-dom': getAbsoluteRequire('react-router-dom'),
    'styled-components': getAbsoluteRequire('styled-components'),
    '~': projectRoot,
    '@': path.join(projectRoot, 'src', 'views', 'app')
  },
  extensions: [
    '.tsx',
    '.ts',
    '.mjsx',
    '.mjs',
    '.jsx',
    '.js',
    '.yaml',
    '.yml',
    '.json',
    '.scss',
    '.sass',
    '.css'
  ]
}

const rules = ({ isProd, extractCss }) => [
  {
    test: /\.(eot|gif|jpe?g|otf|png|svg|ttf|woff2?)$/,
    use: {
      loader: 'url-loader',
      options: {
        fallback: 'file-loader',
        limit: fileLimit,
        name: (isProd)
          ? 'dist/assets/[hash].[ext]'
          : 'dist/assets/[path][name].[ext]',
        publicPath: '/'
      }
    }
  },
  {
    test: /\.s?[ac]ss$/,
    use: (
      (extractCss)
        ? [{ loader: MiniCssExtractPlugin.loader }]
        : []
    ).concat(
      {
        loader: 'css-loader',
        options: {
          modules: {
            mode: 'local'
          },
          onlyLocals: !extractCss,
          sourceMap: true
        }
      }
    )
  },
  {
    test: /\.s[ac]ss$/,
    use: {
      loader: 'sass-loader',
      options: {
        implementation: require('sass')
      }
    }
  },
  {
    test: /\.ya?ml$/,
    use: ['json-loader', 'yaml-loader']
  },
  {
    test: /\.m?[jt]sx?$/,
    exclude: /[\\/]node_modules[\\/](?!@composition[\\/])/,
    use: {
      loader: 'babel-loader',
      options: {
        ...require('./babel.config'),
        babelrc: false
      }
    }
  }
]

module.exports = (env, argv) => {
  const isProd = envProd || /^prod/i.test(argv.mode)

  const devtool = (isProd)
    ? 'hidden-source-map'
    : 'eval-source-map'

  const mode = (isProd)
    ? 'production'
    : 'development'

  return [
    {
      name: 'client',
      devtool,
      entry: {
        app: path.resolve(__dirname, 'src', 'client', 'app'),
        login: path.resolve(__dirname, 'src', 'client', 'login')
      },
      mode,
      module: {
        rules: rules({ isProd, extractCss: true })
      },
      optimization: {
        ...optimization,
        runtimeChunk: {
          name: 'runtime'
        },
        splitChunks: {
          chunks: 'all',
          minSize: 0,
          name (mod, chunks, cacheGroupKey) {
            return (chunks.length > 1)
              ? 'common'
              : chunks[0].name
          }
        }
      },
      output: {
        filename: 'dist/[name].js',
        chunkFilename: 'dist/[name].js',
        path: projectRoot,
        publicPath: '/'
      },
      plugins: [
        new DefinePlugin({
          __DEFAULT_APP_ID__: JSON.stringify(appId)
        }),
        new MiniCssExtractPlugin({
          filename: 'dist/[name].css',
          chunkFilename: 'dist/[name].css'
        })
      ],
      resolve,
      target: 'web'
    },
    {
      name: 'server',
      entry: {
        router: path.join(projectRoot, 'src', 'server', 'router')
      },
      externals: [
        function (context, request, callback) {
          if (/^[a-z@]/i.test(request)) {
            callback(null, `commonjs ${require.resolve(request)}`)
          } else {
            callback()
          }
        }
      ],
      module: {
        rules: rules({ isProd })
      },
      output: {
        filename: 'build/[name].js',
        libraryTarget: 'commonjs2',
        path: projectRoot
      },
      resolve,
      target: 'node',
      // these are set to enable proper source-map support
      devtool: 'source-map',
      mode: 'development',
      optimization: {
        minimize: false
      }
    },
    // this is just to generate CSS
    {
      name: 'server',
      devtool,
      entry: {
        site: path.join(projectRoot, 'src', 'views', 'site')
      },
      mode,
      module: {
        rules: rules({ isProd, extractCss: true })
      },
      output: {
        filename: 'build/[name].js',
        chunkFilename: 'build/[name].js',
        path: projectRoot
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: 'dist/[name].css',
          chunkFilename: 'dist/[name].css'
        }),
        new OnBuildPlugin((stats) => {
          exec(`rm -rf ${path.join(projectRoot, 'build', 'site.js*')}`, () => {})
        })
      ],
      resolve,
      target: 'node'
    }
  ]
}
