
import { GameConfig } from './config.js'

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
    let time = (obj.metal + obj.crystal) / GameConfig.GAME_SPEED * (1 / (planetSub.buildingRobotFactory + 1)) * (0.5 ** planetSub.buildingNanoFactory)
    time = Math.floor(time * 60 * 60 * (1 - (userSub.rpgConstructeur * 0.1)) / GameConfig.BUILD_SPEED)
    return time
  }

  // 研究时间
  static researchTime (obj, userSub, lablevel) {
    let time = (obj.metal + obj.crystal) / GameConfig.GAME_SPEED / ((lablevel + 1) * 2)
    time = Math.floor(time * 60 * 60 * (1 - (userSub.rpgConstructeur * 0.1)) / GameConfig.BUILD_SPEED)
    return time
  }

  // 是否满足前置条件
  static isRequeriment (obj, planetSub, userSub) {
    let b = true
    for (const key in obj.requeriments) {
      if ((!planetSub[key] && !userSub[key]) || (planetSub[key] && obj.requeriments[key] > planetSub[key]) || (userSub[key] && obj.requeriments[key] > userSub[key])) {
        b = false
        break
      }
    }
    return b
  }

  // 计算仓库最大容量
  static storageMax (planetSub, userSub) {
    const metalStorageMax = Math.floor((GameConfig.BASE_STORAGE_SIZE * (1.5 ** planetSub.buildingMetalStore)) * (1 + (userSub.rpgStockeur * 0.5)) * GameConfig.MAX_OVERFLOW)
    const crystalStorageMax = Math.floor((GameConfig.BASE_STORAGE_SIZE * (1.5 ** planetSub.buildingCrystalStore)) * (1 + (userSub.rpgStockeur * 0.5)) * GameConfig.MAX_OVERFLOW)
    const deuteriumStorageMax = Math.floor((GameConfig.BASE_STORAGE_SIZE * (1.5 ** planetSub.buildingDeuteriumStore)) * (1 + (userSub.rpgStockeur * 0.5)) * GameConfig.MAX_OVERFLOW)
    return { metalStorageMax, crystalStorageMax, deuteriumStorageMax }
  }

  // 产量计算（每小时） && 能源消耗
  static prodPerhour (planetSub, planet, userSub) {
    const buildLevelFactor = 10
    // 资源生产
    const metalPerhour = Math.floor(30 * planetSub.buildingMetalMine * (1.1 ** planetSub.buildingMetalMine) * (0.1 * buildLevelFactor) * GameConfig.RESOURCE_MULTIPLIER * (1 + (userSub.rpgGeologue * 0.05)))
    const crystalPerhour = Math.floor(20 * planetSub.buildingCrystalMine * (1.1 ** planetSub.buildingCrystalMine) * (0.1 * buildLevelFactor) * GameConfig.RESOURCE_MULTIPLIER * (1 + (userSub.rpgGeologue * 0.05)))
    let deuteriumPerhour = Math.floor((10 * planetSub.buildingDeuteriumSintetizer * (1.1 ** planetSub.buildingDeuteriumSintetizer) * (-0.002 * planet.tempMax + 1.28)) * (0.1 * buildLevelFactor) * GameConfig.RESOURCE_MULTIPLIER * (1 + (userSub.rpgGeologue * 0.05)))
    // 减去核电消耗
    deuteriumPerhour += -Math.floor(10 * planetSub.buildingFusionPlant * (1.1, planetSub.buildingFusionPlant) * (0.1 * buildLevelFactor) * GameConfig.RESOURCE_MULTIPLIER * (1 + (userSub.rpgGeologue * 0.05)))
    // 消耗能量
    const metalEnergy = Math.floor(10 * planetSub.buildingMetalMine * (1.1 ** planetSub.buildingMetalMine) * GameConfig.RESOURCE_MULTIPLIER * (1 + (userSub.rpgIngenieur * 0.05)))
    const crystalEnergy = Math.floor(10 * planetSub.buildingCrystalMine * (1.1 ** planetSub.buildingCrystalMine) * GameConfig.RESOURCE_MULTIPLIER * (1 + (userSub.rpgIngenieur * 0.05)))
    const deuteriumEnergy = Math.floor(30 * planetSub.buildingDeuteriumSintetizer * (1.1 ** planetSub.buildingDeuteriumSintetizer) * GameConfig.RESOURCE_MULTIPLIER * (1 + (userSub.rpgIngenieur * 0.05)))
    const energyUsed = metalEnergy + crystalEnergy + deuteriumEnergy
    // 生产能量
    const energyBSP = Math.floor(20 * planetSub.buildingSolarPlant * (1.1, planetSub.buildingSolarPlant) * (0.1 * buildLevelFactor) * GameConfig.RESOURCE_MULTIPLIER * (1 + (userSub.rpgIngenieur * 0.05)))
    const energyBFP = Math.floor(50 * planetSub.buildingFusionPlant * (1.1, planetSub.buildingFusionPlant) * (0.1 * buildLevelFactor) * GameConfig.RESOURCE_MULTIPLIER * (1 + (userSub.rpgIngenieur * 0.05)))
    const energyFSS = Math.floor((planet.tempMax / 4 + 20) * planetSub.fleetSolarSatelit * (0.1 * buildLevelFactor) * GameConfig.RESOURCE_MULTIPLIER * (1 + (userSub.rpgIngenieur * 0.05)))
    const energyMax = energyBSP + energyBFP + energyFSS

    return { metalPerhour, crystalPerhour, deuteriumPerhour, energyUsed, energyMax }
  }

  // 期间生产资源计算
  static prodTheorical (obj, planet) {
    let productionLevel = 100
    if (obj.energyMax === 0) {
      obj.metalPerhour = obj.metalPerhour !== 0 ? GameConfig.METAL_BASIC_INCOME : 0
      obj.crystalPerhour = obj.crystalPerhour !== 0 ? GameConfig.CRYSTAL_BASIC_INCOME : 0
      obj.deuteriumPerhour = obj.deuteriumPerhour !== 0 ? GameConfig.DEUTERIUM_BASIC_INCOME : 0
    } else if ((obj.energyMax - obj.energyUsed) < 0) {
      productionLevel = Math.floor((obj.energyMax / obj.energyUsed) * 100)
    }
    console.log(productionLevel)
    // 计算间隔时间
    const nowTime = obj.nowTime
    const prodTime = Math.floor((nowTime - planet.resourcesUpdateTime) / 1000)
    const metalProduction = Math.floor(prodTime * (obj.metalPerhour / 3600) * GameConfig.RESOURCE_MULTIPLIER * (0.01 * productionLevel))
    // const metalBaseProduc = Math.floor(prodTime * (GameConfig.METAL_BASIC_INCOME / 3600) * GameConfig.RESOURCE_MULTIPLIER)
    const metalTheorical = metalProduction + 0

    const crystalProduction = Math.floor(prodTime * (obj.crystalPerhour / 3600) * GameConfig.RESOURCE_MULTIPLIER * (0.01 * productionLevel))
    // const crystalBaseProduc = Math.floor(prodTime * (GameConfig.CRYSTAL_BASIC_INCOME / 3600) * GameConfig.RESOURCE_MULTIPLIER)
    const crystalTheorical = crystalProduction + 0

    const deuteriumProduction = Math.floor(prodTime * (obj.deuteriumPerhour / 3600) * GameConfig.RESOURCE_MULTIPLIER * (0.01 * productionLevel))
    // const deuteriumBaseProduc = Math.floor(prodTime * (GameConfig.DEUTERIUM_BASIC_INCOME / 3600) * GameConfig.RESOURCE_MULTIPLIER)
    const deuteriumTheorical = deuteriumProduction + 0

    return { metalTheorical, crystalTheorical, deuteriumTheorical }
  }
}

export {
  Formula
}
