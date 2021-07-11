#!/usr/bin/env node

/**
 * Module dependencies.
 */

import { app } from '../src/app.js'
import { createServer } from 'http'
import { config } from '../config/index.js'
import Debug from 'debug'
const debug = new Debug('demo:server')

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(config.port || '3000')
// app.set('port', port);

/**
 * Create HTTP server.
 */

const server = createServer(app.callback())

/**
 * Listen on provided port, on all network interfaces.
 */
console.log(`当前运行环境 | ${config.env} | ${config.port}`)
server.listen(config.port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort (val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening () {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  debug('Listening on ' + bind)
}
