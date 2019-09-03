#!/usr/bin/env node

'use strict'

const {
  build,
  dev,
  help,
  init,
  prod,
  run,
  start,
  version,
  watch
} = require('.')

function printHelp () {
  process.stderr.write(help())
}

function printVersion () {
  process.stderr.write('tsx version: ')
  process.stdout.write(version())
  process.stderr.write('\n')
}

const commands = {
  build,
  dev,
  help: printHelp,
  init,
  prod,
  run,
  start,
  version: printVersion,
  watch
}

if (module === require.main) {
  const command = process.argv[2]
  const fn = commands[command] || commands.help
  fn(...process.argv.slice(3))
}
