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
