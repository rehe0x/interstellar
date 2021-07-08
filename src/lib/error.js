class BusinessError extends Error {
  constructor (msg) {
    super(msg)
    this.code = 99
    this.msg = msg
    this.name = 'BusinessError'
  }
}

class HttpError extends Error {
  constructor (code, msg) {
    super(msg)
    this.code = code
    this.msg = msg
    this.name = 'HttpError'
  }
}

module.exports = {
  BusinessError,
  HttpError
}
