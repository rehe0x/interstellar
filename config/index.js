import { dev } from './dev.js'
import { pord } from './pord.js'

const getConfig = () => {
  switch (process.env.NODE_ENV) {
    case 'development':return dev
    case 'production':return pord
    default:return dev
  }
}

export const Config = getConfig()
