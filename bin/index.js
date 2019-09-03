'use strict'

const fs = require('fs')
const path = require('path')

const { packageRoot, projectRoot } = require('../env')

const { copyFile, mkdirp, spawn } = require('../src/utils/promises')

async function tryToCopy (src, dst) {
  try {
    await copyFile(src, dst, fs.constants.COPYFILE_EXCL)
  } catch (_) {}
}

function help () {
  return `tsx: ${version()}

commands:
  build
  dev
  help
  init
  prod
  start
  version
`
}

async function init () {
  await mkdirp(path.join(projectRoot, 'src', 'server', 'router'))
  await mkdirp(path.join(projectRoot, 'src', 'views', 'app'))
  await mkdirp(path.join(projectRoot, 'src', 'views', 'site'))
  await tryToCopy(
    path.join(packageRoot, 'bin', 'templates', 'app.tsx'),
    path.join(projectRoot, 'src', 'views', 'app', 'index.tsx')
  )
  await tryToCopy(
    path.join(packageRoot, 'bin', 'templates', 'site.tsx'),
    path.join(projectRoot, 'src', 'views', 'site', 'index.tsx')
  )
  await tryToCopy(
    path.join(packageRoot, 'bin', 'templates', 'index.html'),
    path.join(projectRoot, 'src', 'views', 'index.html')
  )
  await tryToCopy(
    path.join(packageRoot, 'bin', 'templates', 'router.ts'),
    path.join(projectRoot, 'src', 'server', 'router', 'index.ts')
  )
}

async function run (cmd, ...args) {
  if (!cmd || cmd === '--') {
    process.stderr.write('available scripts:\n')
    const { scripts } = require(path.join(projectRoot, 'package.json'))
    Object.keys(scripts).forEach(scriptName => {
      process.stderr.write(`  ${scriptName}\n`)
      process.stderr.write(`    ${scripts[scriptName]}\n`)
    })
  } else {
    // spawn will throw on SIGINT
    try {
      await spawn('npm', ['run', cmd, ...args], {
        cwd: packageRoot,
        env: {
          ...process.env,
          PROJECT_ROOT: projectRoot
        },
        stdio: 'inherit'
      })
    } catch (e) {
      // ignore SIGINT
    }
  }
}

function version () {
  return require('../package.json').version
}

module.exports = {
  build: (...args) => run('build', ...args),
  dev: (...args) => run('dev', ...args),
  help,
  init,
  prod: (...args) => run('prod', ...args),
  run,
  start: (...args) => run('start', ...args),
  version,
  watch: (...args) => run('watch', ...args)
}
