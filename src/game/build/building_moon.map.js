import { deepFreeze } from '../../lib/utils.js'

const BuildingMoonMap = {
  buildingRobotFactory: {
    name: '机器人技术',
    about: '',
    description: '机器人工厂提供便宜且高效的劳动力用于基础建设。每提升一级，建筑物升级的速度也就越快。',
    image: '',
    requeriments: {},
    pricelist: {
      metal: 400,
      crystal: 120,
      deuterium: 200,
      energy: 0,
      factor: 2
    }
  },
  buildingHangar: {
    name: '船厂',
    about: '',
    description: '造船厂可以建造所有的太空船和星球防御设施。当造船厂规模扩大，它就能生产用途范围更广、速度更快的飞船。如果星球上有纳米机器人工厂，生产飞船的时间将大幅度减少。',
    image: '',
    requeriments: {
      buildingRobotFactory: 2
    },
    pricelist: {
      metal: 400,
      crystal: 200,
      deuterium: 100,
      energy: 0,
      factor: 2
    }
  },
  buildingMetalStore: {
    name: '金属仓库',
    about: '',
    description: '这些巨大的仓库储存着挖掘出来的矿石。金属仓库越大，能储存的金属也越多。需要注意的是金属仓库如果满了，就不能再生产金属了。',
    image: '',
    requeriments: {},
    pricelist: {
      metal: 2000,
      crystal: 0,
      deuterium: 0,
      energy: 0,
      factor: 2
    }
  },
  buildingCrystalStore: {
    name: '晶体仓库',
    about: '',
    description: '未加工的晶体被零时储存在巨大的仓库里。仓库越大，能储存的晶体也越多。需要注意的是晶体仓库如果满了，就不能再生产晶体了。',
    image: '',
    requeriments: {},
    pricelist: {
      metal: 2000,
      crystal: 1000,
      deuterium: 0,
      energy: 0,
      factor: 2
    }
  },
  buildingDeuteriumStore: {
    name: '重氢槽',
    about: '',
    description: '重氢槽用来储存刚被分离出来的重氢。巨大的储存槽通常设置于造船厂附近，储存槽越大，能储存的重氢也就越多。需要注意的是储存槽如果满了，就不能再生产重氢。',
    image: '',
    requeriments: {},
    pricelist: {
      metal: 2000,
      crystal: 2000,
      deuterium: 0,
      energy: 0,
      factor: 2
    }
  },
  buildingMondbasis: {
    name: '月球基地',
    about: '',
    description: `由于月球上没有大气，所以要移民月球必须先造一个月球基地。基地提供必要的空气，重力和温度。基地的等级越高，提供生存必需的面积也就越大。 月球基地每升一级，能覆盖的面积增加3方圆直到覆盖整个月球为止。 月球基地自己也占一个方圆的面积只要你建造了月球基地后它就不能被拆除。
                  只要你建造了月球基地后它就不能被拆除。
                  必须要等待月球出现之后才能够建造的建筑， 月球是你的任一颗行星受到其它玩家的攻击， 在防御方跟攻击方在战斗中所损失的资源总和达到一定数量， 就会有一定机率产生月球， 每100k的资源量，就有１％的机率产生月球， 无论战场废墟的资源有多少，最高也只能达到２０％`,
    image: '',
    requeriments: {},
    pricelist: {
      metal: 20000,
      crystal: 40000,
      deuterium: 20000,
      energy: 0,
      factor: 2
    }
  },
  buildingPhalanx: {
    name: '感应阵',
    about: '',
    description: `高解析度的感应阵列被用来扫瞄巨量的频谱。高性能电脑组合空间波动的微小变化，能感应到在遥远星系的舰队的运动情况。由于系统相当复杂，每次扫瞄都需要大量(5000)重氢以提供所需能量。
                  扫描距离=等级*等级-1`,
    image: '',
    requeriments: {
      buildingMondbasis: 1
    },
    pricelist: {
      metal: 20000,
      crystal: 40000,
      deuterium: 20000,
      energy: 0,
      factor: 2
    }
  },
  buildingSprungtor: {
    name: '空间隧道',
    about: '',
    description: '空间传送点是巨大的传输工具，能够使庞大的舰队瞬间穿越星系。空间传送点因为运用了最尖端的科技，不需要任何能量即可完成工作。',
    image: '',
    requeriments: {
      buildingMondbasis: 1,
      researchHyperspace: 7
    },
    pricelist: {
      metal: 2000000,
      crystal: 4000000,
      deuterium: 2000000,
      energy: 0,
      factor: 2
    }
  }
}

deepFreeze(BuildingMoonMap)
export {
  BuildingMoonMap
}
