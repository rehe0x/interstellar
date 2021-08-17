export const TaskTypeEnum = Object.freeze({
  BUILD: 'build',
  MISSION: 'mission'
})

export const BuildTypeEnum = Object.freeze({
  BUILDING: 'building',
  RESEARCH: 'research',
  FLEET: 'fleet',
  DEFENSE: 'defense'
})

export const BuildQueueStatusEnum = Object.freeze({
  RUNNING: 'running',
  PENDING: 'pending'
})

export const MissionTypeEnum = Object.freeze({
  COLONY: { CODE: 'colony', VALUE: '殖民' },
  SPY: { CODE: 'spy', VALUE: '探测' },
  DISPATCH: { CODE: 'dispatch', VALUE: '派遣' },
  TRANSPORT: { CODE: 'transport', VALUE: '运输' },
  HELP: { CODE: 'help', VALUE: '协防' },
  ATTACK: { CODE: 'attack', VALUE: '攻击' },
  JDAM: { CODE: 'jdam', VALUE: '导弹攻击' },
  RECYCLE: { CODE: 'recycle', VALUE: '回收' },
  EXPLORE: { CODE: 'explore', VALUE: '探险' }
})

export const MissionStatusEnum = Object.freeze({
  START: 'start',
  STAY: 'stay',
  BACK: 'back'
})

export const PlanetTypeEnum = Object.freeze({
  STAR: 'star',
  MOON: 'moon'
})

export const PlanetLabelEnum = Object.freeze({
  STARBASE: 'starbase',
  STARCOLONY: 'starcolony'
})

export const UserStatusEnum = Object.freeze({
  PROTECTED: 'protected',
  NORMAL: 'normal',
  HOLIDAY: 'holiday',
  BANNED: 'banned'
})
