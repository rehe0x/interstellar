
import { UniverseMap } from './universe.map.js'

import { BuildingMap, BuildingMoonMap, ResearchMap, FleetMap, DefenseMap } from './build/index.js'
import { genRandom } from '../lib/utils.js'

class Formula {
  //  造价
  static price (obj, level) {
    const metal = Math.floor(obj.pricelist.metal * (obj.pricelist.factor ** level))
    const crystal = Math.floor(obj.pricelist.crystal * (obj.pricelist.factor ** level))
    const deuterium = Math.floor(obj.pricelist.deuterium * (obj.pricelist.factor ** level))
    return { metal, crystal, deuterium }
  }

  // 消耗能量（每级）
  static energy (level) {
    const energy = Math.floor((10 * level * (1.1 ** level)) - (10 * (level - 1) * (1.1 ** (level - 1))))
    return { energy }
  }

  // 建筑建造时间
  static buildingTime (obj, planetSub, userSub) {
    let time = (obj.metal + obj.crystal) / UniverseMap[userSub.universeId].brBuildSpeed * (1 / (planetSub.buildingRobotFactory + 1)) * (0.5 ** planetSub.buildingNanoFactory)
    time = Math.floor(time * 60 * 60 * (1 - (userSub.rpgConstructeur * 0.1)) / UniverseMap[userSub.universeId].buildSpeed)
    return time === 0 ? 1 : time
  }

  // 研究时间
  static researchTime (obj, userSub, lablevel) {
    let time = (obj.metal + obj.crystal) / UniverseMap[userSub.universeId].brBuildSpeed / ((lablevel + 1) * 2)
    time = Math.floor(time * 60 * 60 * (1 - (userSub.rpgConstructeur * 0.1)) / UniverseMap[userSub.universeId].buildSpeed)
    return time === 0 ? 1 : time
  }

  // 舰队&&防御时间
  static fleetDefenseTime (obj, planetSub, userSub) {
    //   [(金属+晶体) / 5000] × [2 / (船厂等级+1)] × 0.5^纳米等级
    let time = (obj.metal + obj.crystal) / UniverseMap[userSub.universeId].fdBuildSpeed * (2 / (planetSub.buildingHangar + 1)) * (0.5 ** planetSub.buildingNanoFactory)
    time = Math.floor(time * 60 * 60 * (1 - (userSub.rpgTechnocrate * 0.05)) / UniverseMap[userSub.universeId].buildSpeed)
    return time === 0 ? 1 : time
  }

  // 是否满足前置条件
  static isRequeriment (obj, planetSub, userSub) {
    const requerimentArr = []
    let b = true
    for (const key in obj.requeriments) {
      const name = ResearchMap[key] ? ResearchMap[key].name : BuildingMap[key] ? BuildingMap[key].name : BuildingMoonMap[key] ? BuildingMoonMap[key].name : null
      const mylevel = planetSub[key] ? planetSub[key] : userSub[key] ? userSub[key] : 0
      if (b) {
        b = !(obj.requeriments[key] > mylevel)
      }
      requerimentArr.push({
        name,
        level: obj.requeriments[key],
        mylevel
      })
    }
    return { isReq: b, requeriments: requerimentArr }
  }

  // 计算仓库最大容量
  static storageMax (planetSub, userSub) {
    const metalStorageMax = Math.floor((UniverseMap[userSub.universeId].baseStorageSize * (1.5 ** planetSub.buildingMetalStore)) * (1 + (userSub.rpgStockeur * 0.5)) * UniverseMap[userSub.universeId].maxOverflow)
    const crystalStorageMax = Math.floor((UniverseMap[userSub.universeId].baseStorageSize * (1.5 ** planetSub.buildingCrystalStore)) * (1 + (userSub.rpgStockeur * 0.5)) * UniverseMap[userSub.universeId].maxOverflow)
    const deuteriumStorageMax = Math.floor((UniverseMap[userSub.universeId].baseStorageSize * (1.5 ** planetSub.buildingDeuteriumStore)) * (1 + (userSub.rpgStockeur * 0.5)) * UniverseMap[userSub.universeId].maxOverflow)
    return { metalStorageMax, crystalStorageMax, deuteriumStorageMax }
  }

  // 产量计算（每小时） && 能源消耗
  static prodPerhour (planetSub, planet, userSub) {
    const buildLevelFactor = 10
    // 资源生产
    const metalPerhour = Math.floor(30 * planetSub.buildingMetalMine * (1.1 ** planetSub.buildingMetalMine) * (0.1 * buildLevelFactor) * UniverseMap[userSub.universeId].resourceSpeed * (1 + (userSub.rpgGeologue * 0.05)))
    const crystalPerhour = Math.floor(20 * planetSub.buildingCrystalMine * (1.1 ** planetSub.buildingCrystalMine) * (0.1 * buildLevelFactor) * UniverseMap[userSub.universeId].resourceSpeed * (1 + (userSub.rpgGeologue * 0.05)))
    let deuteriumPerhour = Math.floor((10 * planetSub.buildingDeuteriumSintetizer * (1.1 ** planetSub.buildingDeuteriumSintetizer) * (-0.002 * planet.tempMax + 1.28)) * (0.1 * buildLevelFactor) * UniverseMap[userSub.universeId].resourceSpeed * (1 + (userSub.rpgGeologue * 0.05)))
    // 减去核电消耗
    deuteriumPerhour += -Math.floor(10 * planetSub.buildingFusionPlant * (1.1, planetSub.buildingFusionPlant) * (0.1 * buildLevelFactor) * UniverseMap[userSub.universeId].resourceSpeed * (1 + (userSub.rpgGeologue * 0.05)))
    // 消耗能量
    const metalEnergy = Math.floor(10 * planetSub.buildingMetalMine * (1.1 ** planetSub.buildingMetalMine) * UniverseMap[userSub.universeId].resourceSpeed * (1 + (userSub.rpgIngenieur * 0.05)))
    const crystalEnergy = Math.floor(10 * planetSub.buildingCrystalMine * (1.1 ** planetSub.buildingCrystalMine) * UniverseMap[userSub.universeId].resourceSpeed * (1 + (userSub.rpgIngenieur * 0.05)))
    const deuteriumEnergy = Math.floor(30 * planetSub.buildingDeuteriumSintetizer * (1.1 ** planetSub.buildingDeuteriumSintetizer) * UniverseMap[userSub.universeId].resourceSpeed * (1 + (userSub.rpgIngenieur * 0.05)))
    const energyUsed = metalEnergy + crystalEnergy + deuteriumEnergy
    // 生产能量
    const energyBSP = Math.floor(20 * planetSub.buildingSolarPlant * (1.1, planetSub.buildingSolarPlant) * (0.1 * buildLevelFactor) * UniverseMap[userSub.universeId].resourceSpeed * (1 + (userSub.rpgIngenieur * 0.05)))
    const energyBFP = Math.floor(50 * planetSub.buildingFusionPlant * (1.1, planetSub.buildingFusionPlant) * (0.1 * buildLevelFactor) * UniverseMap[userSub.universeId].resourceSpeed * (1 + (userSub.rpgIngenieur * 0.05)))
    const energyFSS = Math.floor((planet.tempMax / 4 + 20) * planetSub.fleetSolarSatelit * (0.1 * buildLevelFactor) * UniverseMap[userSub.universeId].resourceSpeed * (1 + (userSub.rpgIngenieur * 0.05)))
    const energyMax = energyBSP + energyBFP + energyFSS

    return { metalPerhour, crystalPerhour, deuteriumPerhour, energyUsed, energyMax }
  }

  // 期间生产资源计算
  static prodTheorical (obj, planet) {
    let productionLevel = 100
    if (obj.energyMax === 0) {
      obj.metalPerhour = obj.metalPerhour !== 0 ? UniverseMap[planet.universeId].baseMetalIncome : 0
      obj.crystalPerhour = obj.crystalPerhour !== 0 ? UniverseMap[planet.universeId].baseCrystalIncome : 0
      obj.deuteriumPerhour = obj.deuteriumPerhour !== 0 ? UniverseMap[planet.universeId].baseDeuteriumIncome : 0
    } else if ((obj.energyMax - obj.energyUsed) < 0) {
      productionLevel = Math.floor((obj.energyMax / obj.energyUsed) * 100)
    }
    // 计算间隔时间
    const nowTime = obj.nowTime
    const prodTime = Math.floor((nowTime - planet.resourcesUpdateTime) / 1000)
    // 计算资源
    const metalTime = (obj.metalPerhour / 3600) * UniverseMap[planet.universeId].resourceSpeed * (0.01 * productionLevel)
    const metalProduction = Math.floor(prodTime * metalTime)
    // const metalBaseProduc = Math.floor(prodTime * (GameConfig.METAL_BASIC_INCOME / 3600) * GameConfig.RESOURCE_MULTIPLIER)
    const metalTheorical = metalProduction + 0

    const crystalTime = (obj.crystalPerhour / 3600) * UniverseMap[planet.universeId].resourceSpeed * (0.01 * productionLevel)
    const crystalProduction = Math.floor(prodTime * crystalTime)
    // const crystalBaseProduc = Math.floor(prodTime * (GameConfig.CRYSTAL_BASIC_INCOME / 3600) * GameConfig.RESOURCE_MULTIPLIER)
    const crystalTheorical = crystalProduction + 0

    const deuteriumTime = (obj.deuteriumPerhour / 3600) * UniverseMap[planet.universeId].resourceSpeed * (0.01 * productionLevel)
    const deuteriumProduction = Math.floor(prodTime * deuteriumTime)
    // const deuteriumBaseProduc = Math.floor(prodTime * (GameConfig.DEUTERIUM_BASIC_INCOME / 3600) * GameConfig.RESOURCE_MULTIPLIER)
    const deuteriumTheorical = deuteriumProduction + 0

    return {
      metalTheorical,
      crystalTheorical,
      deuteriumTheorical,
      metalTime: Number.parseFloat(metalTime).toFixed(2),
      crystalTime: Number.parseFloat(crystalTime).toFixed(2),
      deuteriumTime: Number.parseFloat(deuteriumTime).toFixed(2)
    }
  }

  // 计算星球大小
  static planetSize (universeId, galaxyZ) {
    const miniArray = [40, 50, 55, 100, 95, 80, 115, 120, 125, 75, 80, 85, 60, 40, 50]
    const MaxArray = [90, 130, 150, 240, 240, 230, 180, 180, 190, 125, 120, 130, 180, 180, 150]
    return UniverseMap[universeId].basePlanetSzie + genRandom(miniArray[galaxyZ - 1], MaxArray[galaxyZ - 1])
  }

  // 计算星球温度
  static planetTemp (galaxyZ) {
    const tempMiniArray = [[0, 100], [-25, 75], [-50, 50], [-75, 25], [-100, 10]]
    const groupIndex = ~~((galaxyZ - 1) / (15 / tempMiniArray.length))
    const [tMini, tMax] = tempMiniArray[groupIndex]
    const tempMini = genRandom(tMini, tMax)
    const tempMax = tempMini + genRandom(10, 60)
    return { tempMini, tempMax }
  }

  // 获取目标距离
  static getTargetDistance ({ galaxyX, galaxyY, galaxyZ, targetGalaxyX, targetGalaxyY, targetGalaxyZ }) {
    let distance = 5
    if (galaxyX - targetGalaxyX !== 0) {
      distance = Math.abs(galaxyX - targetGalaxyX) * 20000
    } else if (galaxyY - targetGalaxyY !== 0) {
      distance = Math.abs(galaxyY - targetGalaxyY) * 5 * 19 + 2700
    } else if (galaxyZ - targetGalaxyZ !== 0) {
      distance = Math.abs(galaxyZ - targetGalaxyZ) * 5 + 1000
    }
    return distance
  }

  // 获取任务抵达时间
  static getMissionSeconds ({ speed, maxSpeed, distance }) {
    const seconds = 35000 / (speed / 10) * Math.sqrt(distance * 10 / maxSpeed) + 10
    return seconds.toFixed(0)
  }

  // 计算航行任务 最大速度 距离 时间 油耗 承载量
  static missionCompute ({ userSub, galaxyX, galaxyY, galaxyZ, targetGalaxyX, targetGalaxyY, targetGalaxyZ, speed, fleets }) {
    // 最块速度
    let maxSpeed = 0
    let distance = Formula.getTargetDistance({ galaxyX, galaxyY, galaxyZ, targetGalaxyX, targetGalaxyY, targetGalaxyZ })
    let seconds = 0
    let consumption = 0
    let capacity = 0
    let maxDistance = null
    if (fleets && Object.keys(fleets).length) {
      const fleetDetail = {}
      let fleetIS = true
      for (const key in fleets) {
        if (!Object.hasOwnProperty.call(FleetMap, key)) {
          fleetIS = false
        }
        const combatcaps = FleetMap[key].combatcaps
        let fleetSpeed = 0
        let fleetConsumption = 0
        if (combatcaps.speed !== combatcaps.speed2 && userSub[combatcaps.engine2] >= combatcaps.speed2Condition) {
          fleetSpeed = combatcaps.speed2 * (1 + ResearchMap[combatcaps.engine2].speed * userSub[combatcaps.engine2])
          fleetConsumption = combatcaps.consumption2
        } else {
          fleetSpeed = combatcaps.speed * (1 + ResearchMap[combatcaps.engine].speed * userSub[combatcaps.engine])
          fleetConsumption = combatcaps.consumption
        }
        fleetSpeed = fleetSpeed * (1 + 0.25 * userSub.rpgGeneral)
        if (maxSpeed === 0) {
          maxSpeed = fleetSpeed
        } else if (fleetSpeed < maxSpeed) {
          maxSpeed = fleetSpeed
        }
        fleetDetail[key] = { count: fleets[key], fleetSpeed, fleetConsumption, capacity: combatcaps.capacity }
      }

      // 如果是导弹 只获取x距离 计算时间
      if (!fleetIS && Object.keys(fleets).length === 1) {
        const combatcaps = DefenseMap[Object.keys()[0]].combatcaps
        maxDistance = userSub[combatcaps.engine] * 2 - 1
        seconds = 30
        if (galaxyX - targetGalaxyX !== 0) {
          distance = -1
        } else if (galaxyY - targetGalaxyY !== 0) {
          distance = Math.abs(galaxyY - targetGalaxyY)
          seconds += distance * 60
        }
      } else {
        // 获取时间
        seconds = Formula.getMissionSeconds({ speed, maxSpeed: maxSpeed, distance })
        // 计算油耗 承载能力
        for (const key in fleetDetail) {
          const speedPercent = Math.sqrt(maxSpeed / fleetDetail[key].fleetSpeed).toFixed(2)
          const basicConsumption = fleetDetail[key].fleetConsumption * fleetDetail[key].count
          consumption += basicConsumption * distance / 35000 * ((speedPercent + 1) ** 2)
          capacity += fleetDetail[key].capacity * fleetDetail[key].count
        }
      }
    }

    console.log(maxSpeed, distance, seconds, consumption.toFixed(0), capacity)
    return { maxSpeed, distance, maxDistance, seconds, consumption: +consumption.toFixed(0), capacity }
  }
}

export {
  Formula
}
