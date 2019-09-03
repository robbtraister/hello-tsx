'use strict'

const childProcess = require('child_process')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const exec = promisify(childProcess.exec.bind(childProcess))

const copyFile = promisify(fs.copyFile.bind(fs))
const readFile = promisify(fs.readFile.bind(fs))

const mkdirp = d => exec(`mkdir -p '${d}'`)

const writeFilePromise = promisify(fs.writeFile.bind(fs))
function writeFile (filePath, content) {
  return mkdirp(path.dirname(filePath)).then(() =>
    writeFilePromise(filePath, content)
  )
}

function spawn (cmd, args, options) {
  return new Promise((resolve, reject) => {
    const proc = /^win/i.test(process.platform)
      ? childProcess.spawn('cmd', ['/s', '/c', cmd].concat(args), options)
      : childProcess.spawn(cmd, args, options)

    const sigintListener = () => {
      proc.kill('SIGINT')
    }
    process.once('SIGINT', sigintListener)

    proc.on('exit', code => {
      process.removeListener('SIGINT', sigintListener)
      // ensure cursor is returned
      process.stdout.write('\x1B[?25h')

      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`${code}`))
      }
    })
  })
}

module.exports = {
  copyFile,
  exec,
  mkdirp,
  readFile,
  spawn,
  writeFile
}
