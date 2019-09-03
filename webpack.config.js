'use strict'

const { exec } = require('child_process')
const path = require('path')

const { DefinePlugin } = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const {
  app: {
    id: appId,
    title: appTitle,
    fileLimit
  },
  isProd: envProd,
  packageRoot,
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

const getAbsoluteRequire = (mod) =>
  require.resolve(mod).replace(new RegExp(`(/node_modules/${mod})/.*`), (_, m) => m)

const resolve = {
  alias: {
    'prop-types': getAbsoluteRequire('prop-types'),
    react: getAbsoluteRequire('react'),
    'react-dom': getAbsoluteRequire('react-dom'),
    'react-router': getAbsoluteRequire('react-router'),
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
        engine: path.resolve(__dirname, 'src', 'client', 'engine')
      },
      mode,
      module: {
        rules: rules({ isProd })
      },
      optimization: {
        minimizer: [
          new TerserWebpackPlugin({
            sourceMap: true
          })
        ],
        chunkIds: 'named',
        moduleIds: 'named',
        runtimeChunk: {
          name: 'runtime'
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
        })
      ],
      resolve,
      target: 'web'
    },
    {
      name: 'client',
      devtool,
      entry: {
        app: path.resolve(projectRoot, 'src', 'views', 'app'),
        login: path.resolve(projectRoot, 'src', 'views', 'login')
      },
      externals: {
        'prop-types': 'PropTypes',
        react: 'React',
        'react-dom': 'ReactDOM',
        'react-router': 'ReactRouterDOM',
        'react-router-dom': 'ReactRouterDOM'
      },
      mode,
      module: {
        rules: rules({ isProd, extractCss: true })
      },
      optimization: {
        minimizer: [
          new TerserWebpackPlugin({
            sourceMap: true
          }),
          new OptimizeCSSAssetsWebpackPlugin({
          })
        ],
        chunkIds: 'named',
        moduleIds: 'named',
        runtimeChunk: {
          name: 'runtime'
        },
        splitChunks: {
          chunks: 'all',
          minSize: 0,
          name (mod, chunks, cacheGroupKey) {
            const chunkNames = Object.keys(
              chunks
                .map((chunk) => chunk.name)
                .reduce((map, name) => {
                  map[name] = true
                  return map
                }, {})
            )
            return (chunkNames.length > 1)
              ? 'common'
              : chunkNames[0]
          }
        }
      },
      output: {
        filename: 'dist/[name].js',
        chunkFilename: 'dist/[name].js',
        globalObject: "(typeof self !== 'undefined' ? self : this)",
        library: ['window', 'App'],
        libraryExport: 'default',
        libraryTarget: 'var',
        path: projectRoot,
        publicPath: '/'
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: 'dist/[name].css',
          chunkFilename: 'dist/[name].css'
        }),
        new HtmlWebpackPlugin({
          excludeChunks: ['login'],
          filename: 'dist/index.html',
          appId,
          inject: 'head',
          template: path.join(projectRoot, 'src', 'views', 'index.html'),
          title: appTitle
        }),
        new ScriptExtHtmlWebpackPlugin({
          defaultAttribute: 'defer'
        })
      ],
      resolve,
      target: 'web'
    },
    {
      name: 'server',
      entry: {
        router: path.join(packageRoot, 'src', 'server', 'router')
      },
      externals: [
        function (context, request, callback) {
          if (/^[a-z@]/i.test(request)) {
            callback(null, `commonjs ${request}`)
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
      stats: {
        // ignore missing status code pages
        warnings: false
      },
      target: 'node',
      // these are set to enable proper source-map support
      devtool: 'source-map',
      mode: 'development',
      optimization: {
        minimize: false,
        splitChunks: false
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
      optimization: {
        minimizer: [
          new OptimizeCSSAssetsWebpackPlugin({
          })
        ]
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
      stats: {
        // ignore missing site component
        errors: false,
        warnings: false
      },
      target: 'node'
    }
  ]
}
