export const building = {
  building_metal_mine: {
    name: '金属矿',
    about: '金属矿提供了帝国所需的基本资源，而且可用来建造建筑物和飞船',
    description: '金属矿提供了帝国所需的基本资源，而且被用于建造建筑物和飞船，属于帝国最资本的资源。金属是建造建筑物和制造飞船时最主要也是最基本的资源。金属矿是最容易获取的资源，只要少许能量就能开采，但是它的使用量也是最大的。矿脉都位于地底深处，同时越深越大的矿消耗的能量也最大。',
    image: '',
    requeriments: {},
    pricelist: {
      metal: 60,
      crystal: 15,
      deuterium: 0,
      energy: 0,
      factor: 3 / 2
    },
    formulas: {
      yield: (BuildLevel, BuildLevelFactor) => (30 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor),
      energy: (BuildLevel, BuildLevelFactor) => (10 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor)
    }
  },
  building_crystal_mine: {
    name: '晶体矿',
    about: '晶体是生产电子元件和生产合金的主要资源之一',
    description: '晶体是生产电子元件和生产合金的主要资源。相对于金属的生产过程来说，将晶体矿转换为生产用晶体所需要的能量是生产金属的两倍，也因此晶体的价格高于金属。所有的飞船和建筑物在建造时都需要用到晶体，可惜生产大多数飞船所需的晶体比较少见，并且和金属矿一样必须在地层深处才能开采到，越深的矿脉开采到的晶体矿也越多。',
    image: '',
    requeriments: {},
    pricelist: {
      metal: 60,
      crystal: 15,
      deuterium: 0,
      energy: 0,
      factor: 3 / 2
    },
    formulas: {
      yield: (BuildLevel, BuildLevelFactor) => (30 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor),
      energy: (BuildLevel, BuildLevelFactor) => (10 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor)
    }
  },
  building_deuterium_sintetizer: {
    name: '重氢合成器',
    about: '重氢是飞船的燃料，可以从深海中提取。重氢属于稀有物质，相当珍贵而且重要。',
    description: '重氢，也就是重水。它的原子比普通的氢原子多一个中子，由氘－氚聚变反应（核反应）所生成的高能量来提供飞船及建筑物所需的能量。用于其分子较重的缘故，重氢可以在深海中找到，将重氢分离器升级可以增加重氢的产量。',
    image: '',
    requeriments: {},
    pricelist: {
      metal: 60,
      crystal: 15,
      deuterium: 0,
      energy: 0,
      factor: 3 / 2
    },
    formulas: {
      yield: (BuildLevel, BuildLevelFactor) => (30 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor),
      energy: (BuildLevel, BuildLevelFactor) => (10 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor)
    }
  },
  building_solar_plant: {
    name: '太阳能发电站',
    about: '',
    description: '为了给建筑物提供足够的能量，需要大型的太阳能发电站。太阳能发电是生产能量的一种方式，它使用了以半导体所构成的太阳能电池来进行光电转换。当升级太阳能发电站时，需要更多的空间来安置太阳能面板以提供更多的能量。可以说太阳能发电站是所有建筑的基础。',
    image: '',
    requeriments: {},
    pricelist: {
      metal: 60,
      crystal: 15,
      deuterium: 0,
      energy: 0,
      factor: 3 / 2
    },
    formulas: {
      yield: (BuildLevel, BuildLevelFactor) => (30 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor),
      energy: (BuildLevel, BuildLevelFactor) => (10 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor)
    }
  },
  building_fusion_plant: {
    name: '核电站',
    about: '',
    description: `在核电站的高温高压下，氢原子聚变成氦原子并释放出大量能量。消耗一个绿豆大小的重氢会产生41,32*10^-13焦耳的能量；使用1克，你可以生产172 MWh的能量。
                  越大越复杂的原子炉会使用更多的重氢，但每小时也可以生产更多的能量。能量的效果可以通过研究能量科技来提升。
                  核电厂的能量生产是这样计算的：
                  30 * [核电厂等级] * (1,05 + [能量科技等级] * 0,01) ^ [核电厂等级]`,
    image: '',
    requeriments: {
      building_deuterium_sintetizer: 5,
      research_energy_tech: 3
    },
    pricelist: {
      metal: 60,
      crystal: 15,
      deuterium: 0,
      energy: 0,
      factor: 3 / 2
    },
    formulas: {
      yield: (BuildLevel, BuildLevelFactor) => (30 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor),
      energy: (BuildLevel, BuildLevelFactor) => (10 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor)
    }
  },
  building_robot_factory: {
    name: '机器人技术',
    about: '',
    description: '机器人工厂提供便宜且高效的劳动力用于基础建设。每提升一级，建筑物升级的速度也就越快。',
    image: '',
    requeriments: {},
    pricelist: {
      metal: 60,
      crystal: 15,
      deuterium: 0,
      energy: 0,
      factor: 3 / 2
    },
    formulas: {
      yield: (BuildLevel, BuildLevelFactor) => (30 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor),
      energy: (BuildLevel, BuildLevelFactor) => (10 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor)
    }
  },
  building_nano_factory: {
    name: '纳米机器人工厂',
    about: '',
    description: '纳米机器人事实上是一些平均大小为纳米等级的微型机器人。这些小机器人经由程序设定及网络化以分工合作的方式来完成建筑工作，他们能带来非凡的效率。纳米机器人进行的是分子等级的工作，在生产飞船时有着无穷的妙处。将他们留在飞船的构造中，只要有足够的能量和资源，他们就可以用来进行损害控管和修复工作。',
    image: '',
    requeriments: {
      building_robot_factory: 10,
      research_computer_tech: 10
    },
    pricelist: {
      metal: 60,
      crystal: 15,
      deuterium: 0,
      energy: 0,
      factor: 3 / 2
    },
    formulas: {
      yield: (BuildLevel, BuildLevelFactor) => (30 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor),
      energy: (BuildLevel, BuildLevelFactor) => (10 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor)
    }
  },
  building_hangar: {
    name: '船厂',
    about: '',
    description: '造船厂可以建造所有的太空船和星球防御设施。当造船厂规模扩大，它就能生产用途范围更广、速度更快的飞船。如果星球上有纳米机器人工厂，生产飞船的时间将大幅度减少。',
    image: '',
    requeriments: {
      building_robot_factory: 2
    },
    pricelist: {
      metal: 60,
      crystal: 15,
      deuterium: 0,
      energy: 0,
      factor: 3 / 2
    },
    formulas: {
      yield: (BuildLevel, BuildLevelFactor) => (30 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor),
      energy: (BuildLevel, BuildLevelFactor) => (10 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor)
    }
  },
  building_metal_store: {
    name: '金属仓库',
    about: '',
    description: '这些巨大的仓库储存着挖掘出来的矿石。金属仓库越大，能储存的金属也越多。需要注意的是金属仓库如果满了，就不能再生产金属了。',
    image: '',
    requeriments: {},
    pricelist: {
      metal: 60,
      crystal: 15,
      deuterium: 0,
      energy: 0,
      factor: 3 / 2
    },
    formulas: {
      yield: (BuildLevel, BuildLevelFactor) => (30 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor),
      energy: (BuildLevel, BuildLevelFactor) => (10 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor)
    }
  },
  building_crystal_store: {
    name: '晶体仓库',
    about: '',
    description: '未加工的晶体被零时储存在巨大的仓库里。仓库越大，能储存的晶体也越多。需要注意的是晶体仓库如果满了，就不能再生产晶体了。',
    image: '',
    requeriments: {},
    pricelist: {
      metal: 60,
      crystal: 15,
      deuterium: 0,
      energy: 0,
      factor: 3 / 2
    },
    formulas: {
      yield: (BuildLevel, BuildLevelFactor) => (30 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor),
      energy: (BuildLevel, BuildLevelFactor) => (10 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor)
    }
  },
  building_deuterium_store: {
    name: '重氢槽',
    about: '',
    description: '重氢槽用来储存刚被分离出来的重氢。巨大的储存槽通常设置于造船厂附近，储存槽越大，能储存的重氢也就越多。需要注意的是储存槽如果满了，就不能再生产重氢。',
    image: '',
    requeriments: {},
    pricelist: {
      metal: 60,
      crystal: 15,
      deuterium: 0,
      energy: 0,
      factor: 3 / 2
    },
    formulas: {
      yield: (BuildLevel, BuildLevelFactor) => (30 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor),
      energy: (BuildLevel, BuildLevelFactor) => (10 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor)
    }
  },
  building_laboratory: {
    name: '研究实验室',
    about: '',
    description: '为了研究新技术，必须先造一个研究实验室。实验室的等级对研究新技术的速度有决定性的作用。等级越高，新技术的研究也就越快。为了尽可能的结束研究工作，当在一个星球上展开研究时，所有的研究员都会被送到这个研究所，因此别的星球上的研究所就不能继续工作。当一个技术被研发出来后，研究员将返回母星，并且把新技术带回去。如此就可以把在一个星球上研发的技术在所有的星球上通用。',
    image: '',
    requeriments: {},
    pricelist: {
      metal: 60,
      crystal: 15,
      deuterium: 0,
      energy: 0,
      factor: 3 / 2
    },
    formulas: {
      yield: (BuildLevel, BuildLevelFactor) => (30 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor),
      energy: (BuildLevel, BuildLevelFactor) => (10 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor)
    }
  },
  building_terraformer: {
    name: '地形改造器',
    about: '',
    description: `过去在开发星系里的行星时，经常遇到可用空间不足的问题。传统的建筑学和工程学无法满足更多空间的需求。一小群高能物理学家和纳米技术人员最终找到了解决办法：地形改造，使用大量的能量甚至能创造出一整块大陆。在这个建筑物里生产著特别设计的奈米机器人，以确保创造出的陆块的可用性和品质。
                  注意：当你建造了地形改造器后，它便不能被拆除。`,
    image: '',
    requeriments: {
      building_nano_factory: 1,
      research_energy_tech: 12
    },
    pricelist: {
      metal: 60,
      crystal: 15,
      deuterium: 0,
      energy: 0,
      factor: 3 / 2
    },
    formulas: {
      yield: (BuildLevel, BuildLevelFactor) => (30 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor),
      energy: (BuildLevel, BuildLevelFactor) => (10 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor)
    }
  },
  building_ally_deposit: {
    name: '联盟太空站',
    about: '',
    description: '联盟太空站允许友好舰队停泊在轨道上空以协助防御，并提供舰队所需的燃料。每提升一个等级，太空站可以额外提供轨道上的舰队每小时10，000单位的重氢。',
    image: '',
    requeriments: {},
    pricelist: {
      metal: 60,
      crystal: 15,
      deuterium: 0,
      energy: 0,
      factor: 3 / 2
    },
    formulas: {
      yield: (BuildLevel, BuildLevelFactor) => (30 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor),
      energy: (BuildLevel, BuildLevelFactor) => (10 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor)
    }
  },
  building_mondbasis: {
    name: '月球基地',
    about: '',
    description: `由于月球上没有大气，所以要移民月球必须先造一个月球基地。基地提供必要的空气，重力和温度。基地的等级越高，提供生存必需的面积也就越大。 月球基地每升一级，能覆盖的面积增加3方圆直到覆盖整个月球为止。 月球基地自己也占一个方圆的面积只要你建造了月球基地后它就不能被拆除。
                  只要你建造了月球基地后它就不能被拆除。
                  必须要等待月球出现之后才能够建造的建筑， 月球是你的任一颗行星受到其它玩家的攻击， 在防御方跟攻击方在战斗中所损失的资源总和达到一定数量， 就会有一定机率产生月球， 每100k的资源量，就有１％的机率产生月球， 无论战场废墟的资源有多少，最高也只能达到２０％`,
    image: '',
    requeriments: {},
    pricelist: {
      metal: 60,
      crystal: 15,
      deuterium: 0,
      energy: 0,
      factor: 3 / 2
    },
    formulas: {
      yield: (BuildLevel, BuildLevelFactor) => (30 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor),
      energy: (BuildLevel, BuildLevelFactor) => (10 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor)
    }
  },
  building_phalanx: {
    name: '感应阵',
    about: '',
    description: `高解析度的感应阵列被用来扫瞄巨量的频谱。高性能电脑组合空间波动的微小变化，能感应到在遥远星系的舰队的运动情况。由于系统相当复杂，每次扫瞄都需要大量(5000)重氢以提供所需能量。
                  扫描距离=等级*等级-1`,
    image: '',
    requeriments: {
      building_mondbasis: 1
    },
    pricelist: {
      metal: 60,
      crystal: 15,
      deuterium: 0,
      energy: 0,
      factor: 3 / 2
    },
    formulas: {
      yield: (BuildLevel, BuildLevelFactor) => (30 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor),
      energy: (BuildLevel, BuildLevelFactor) => (10 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor)
    }
  },
  building_sprungtor: {
    name: '空间隧道',
    about: '',
    description: '空间传送点是巨大的传输工具，能够使庞大的舰队瞬间穿越星系。空间传送点因为运用了最尖端的科技，不需要任何能量即可完成工作。',
    image: '',
    requeriments: {
      building_mondbasis: 1,
      research_hyperspace_tech: 7
    },
    pricelist: {
      metal: 60,
      crystal: 15,
      deuterium: 0,
      energy: 0,
      factor: 3 / 2
    },
    formulas: {
      yield: (BuildLevel, BuildLevelFactor) => (30 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor),
      energy: (BuildLevel, BuildLevelFactor) => (10 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor)
    }
  },
  building_silo: {
    name: '导弹发射井',
    about: '',
    description: '导弹发射井是用来储藏及发射导弹的设施。每一级的导弹发射井可以储存5枚星际导弹或10枚拦截导弹。导弹可以混合储存；一枚星际导弹所需的空间可以放置两枚拦截导弹。',
    image: '',
    requeriments: {},
    pricelist: {
      metal: 60,
      crystal: 15,
      deuterium: 0,
      energy: 0,
      factor: 3 / 2
    },
    formulas: {
      yield: (BuildLevel, BuildLevelFactor) => (30 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor),
      energy: (BuildLevel, BuildLevelFactor) => (10 * BuildLevel * (1.1 ** BuildLevel)) * (0.1 * BuildLevelFactor)
    }
  }
}
