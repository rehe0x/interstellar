import { deepFreeze } from "../../lib/utils.js";

const _sd = {
  fleet_metal_mine: 1,
  fleet_big_ship_cargo: 1,
  fleet_light_hunter: 1,
  fleet_heavy_hunter: 1,
  fleet_crusher: 1,
  fleet_battle_ship: 1,
  fleet_colonizer: 1,
  fleet_recycler: 1,
  fleet_spy_sonde: 1,
  fleet_bomber_ship: 1,
  fleet_solar_satelit: 1,
  fleet_destructor: 1,
  fleet_dearth_star: 1,
  fleet_battleship: 1,
  defense_misil_launcher: 1,
  defense_small_laser: 1,
  defense_big_laser: 1,
  defense_gauss_canyon: 1,
  defense_ionic_canyon: 1,
  defense_buster_canyon: 1,
  defense_small_protection_shield: 1,
  defense_big_protection_shield: 1
}

const fleets = {
  fleet_metal_mine: {
    name: '小型运输舰',
    about: '当脉冲引擎研发到5级时,小型运输舰将会换装此型引擎,并增加速度',
    description: '小型运输舰的大小和战斗机差不多,但是它们没有高效率的引擎和军用装备,而是把空间挪出来做为货仓. 小型运输舰可以装载5000单位的资源.大型运输舰的搭载量是它的五倍,装甲,防护盾和引擎也都有提升. 由于火力薄弱,运输舰需要其它的船舰护航',
    image: '',
    requeriments: {
      building_hangar: 2,
      research_combustion_tech: 2
    },
    pricelist: {
      metal: 2000,
      crystal: 2000,
      deuterium: 0,
      energy: 0,
      factor: 1
    },
    combatcaps: {
      consumption: 20,
      consumption2: 40,
      speed: 5000,
      speed2: 10000,
      capacity: 5000,
      shield: 10,
      attack: 5,
      sd: {
        ..._sd,
        fleet_solar_satelit: 5,
        fleet_spy_sonde: 5
      }
    }
  },
  fleet_big_ship_cargo: {
    name: '大型运输舰',
    about: '当脉冲引擎研发到5级时,小型运输舰将会换装此型引擎,并增加速度',
    description: `由于它的空间都被拿来作为货仓,无法搭载高等级的武器系统和其它科技,这类船舰不应该单独行动 .使用高出力的燃料引擎,它成为快速的资源后勤单位，在星球之间穿梭.当然它也伴随着舰队攻击敌方星球，从而能掠夺更多的资源。
                  快速射击对 间谍卫星: 5
                  快速射击对 太阳能卫星: 5
                  死星 对这种船舰的快速射击: 250 
                  战斗巡洋舰 对这种船舰的快速射击：3'`,
    image: '',
    requeriments: {
      building_hangar: 4,
      research_combustion_tech: 6
    },
    pricelist: {
      metal: 6000,
      crystal: 6000,
      deuterium: 0,
      energy: 0,
      factor: 1
    },
    combatcaps: {
      consumption: 50,
      consumption2: 50,
      speed: 7500,
      speed2: 7500,
      capacity: 25000,
      shield: 25,
      attack: 5,
      sd: {
        ..._sd,
        fleet_solar_satelit: 5,
        fleet_spy_sonde: 5
      }
    }
  },
  fleet_light_hunter: {
    name: '轻型战斗机',
    about: '当脉冲引擎研发到5级时,小型运输舰将会换装此型引擎,并增加速度',
    description: `与它薄弱的装甲和火力相比，轻型战斗机在战争中扮演著一种支援性的角色。凭着它们的灵活度，速度以及数量，轻型战斗机常被用来保护那些较大而笨重的船舰。
                  死星 对这种船舰的快速射击：200
                  快速射击对 探测器：5
                  快速射击对 太阳能卫星：5
                  巡洋舰 对这种船舰的快速射击：6`,
    image: '',
    requeriments: {
      building_hangar: 1,
      research_combustion_tech: 1
    },
    pricelist: {
      metal: 3000,
      crystal: 1000,
      deuterium: 0,
      energy: 0,
      factor: 1
    },
    combatcaps: {
      consumption: 20,
      consumption2: 20,
      speed: 12500,
      speed2: 12500,
      capacity: 50,
      shield: 10,
      attack: 50,
      sd: {
        ..._sd,
        fleet_solar_satelit: 5,
        fleet_spy_sonde: 5
      }
    }
  },
  fleet_heavy_hunter: {
    name: '重型战斗机',
    about: '当脉冲引擎研发到5级时,小型运输舰将会换装此型引擎,并增加速度',
    description: `在轻型战斗机的改进研究中，研究人员发现用传统的推动技术已经不能满足要求。为了提供新型的战斗机更好的灵活度，脉冲引擎第一次被使用。使用了高价值的材料，虽然提高了费用和复杂度，却也提供更多的可能性。使用脉冲引擎，可以提供武器和防护盾系统更多的能量。强化过的机身结构和更强悍的火力，使得这种战斗机比它的前辈更有威胁性。 
                  快速射击对 间谍卫星: 5
                  快速射击对 太阳能卫星: 5
                  快速射击对 小型运输舰: 3
                  死星 对这种船舰的快速射击: 100 
                  战斗巡洋舰 对这种船舰的快速射击：4`,
    image: '',
    requeriments: {
      building_hangar: 1,
      research_shield_tech: 2,
      research_impulse_motor_tech: 2
    },
    pricelist: {
      metal: 6000,
      crystal: 4000,
      deuterium: 0,
      energy: 0,
      factor: 1
    },
    combatcaps: {
      consumption: 75,
      consumption2: 75,
      speed: 10000,
      speed2: 15000,
      capacity: 100,
      shield: 25,
      attack: 150,
      sd: {
        ..._sd,
        fleet_solar_satelit: 5,
        fleet_spy_sonde: 5,
        fleet_metal_mine: 3
      }
    }
  },
  fleet_crusher: {
    name: '巡洋舰',
    about: '当脉冲引擎研发到5级时,小型运输舰将会换装此型引擎,并增加速度',
    description: `随著重型激光炮和离子加农炮被运用在战场上，战斗机陷入了一个困境。在这些新型的防御系统前，无论怎么提升武器强度和装甲，战斗机依旧无法与其对抗。 因此人们决定发展一种新的船舰，它要有更高的火力和防护。巡洋舰就此诞生了。战斗巡洋舰的装甲大约是重型战斗机的3倍，火力强2倍。它的速度也是所有船舰中最快的。对于中度的防御没有比他更好的武器了。巡洋舰几乎统治了整个宇宙有100年。不幸的是，随著高斯加农炮和等离子发射器等新型防御设施被开发出来,战斗巡洋舰结束了它的辉煌历史。由于武器系统效能适合，现在巡洋舰仍被用来对抗大量的战斗机中队。
                  快速射击对 间谍卫星: 5
                  快速射击对 太阳能卫星: 5
                  快速射击对 轻型战斗机: 6
                  快速射击对 火箭发射装置: 10
                  死星 对这种船舰的快速射击: 33 
                  战斗巡洋舰 对这种船舰的快速射击：4
                  这是你第一台可以称为真正的武力的船，他对飞弹发射器跟轻型战斗机的高抵抗性，很适合用来辗级数比你低的人，后期也可以用他对抗轻型战斗机海。 你能建造的第一个”大”船。因为有快速射击的能力，非常适合拿来消灭炮灰部队，例如轻型战斗机和导弹。拥有最高的基本速度。在后期的游戏中可以拿来对抗敌人的炮灰。不擅长对付毁灭者和战列`,
    image: '',
    requeriments: {
      building_hangar: 5,
      research_impulse_motor_tech: 4,
      research_ionic_tech: 2
    },
    pricelist: {
      metal: 20000,
      crystal: 7000,
      deuterium: 2000,
      energy: 0,
      factor: 1
    },
    combatcaps: {
      consumption: 300,
      consumption2: 300,
      speed: 15000,
      speed2: 15000,
      capacity: 800,
      shield: 50,
      attack: 400,
      sd: {
        ..._sd,
        fleet_solar_satelit: 5,
        fleet_spy_sonde: 5,
        fleet_light_hunter: 6,
        defense_misil_launcher: 10
      }
    }
  },
  fleet_battle_ship: {
    name: '战列舰',
    about: '当脉冲引擎研发到5级时,小型运输舰将会换装此型引擎,并增加速度',
    description: `战列舰是舰队的脊梁。它的重型防护，高速，超大的装载空间使得这种船舰被公认为是最优秀的船舰。巨大的货物仓也使得战列舰适于进行掠夺任务。
                  快速射击对 间谍卫星: 5
                  快速射击对 太阳能卫星: 5
                  死星 对这种船舰的快速射击: 30 
                  战斗巡洋舰 对这种船舰的快速射击：7
                  真正的攻击火力，他的防护，装载量与攻击力，是武装舰队不可或缺的，而且他不用重氢就能量产，常跟轻型战斗机一起搭档。 
                  Ogame中最常用到的船舰。快速、便宜（就他的战斗能力来说）、威力强大。对抗炮灰的时候没有快速射击能力是它的唯一缺点。所以需要建立一支混编的舰队，以战列舰为战斗基础。当你攻击大目标的时候，最佳的使用方法是放在炮灰后面。不需要重氢就能建造，掠夺战法的完美选择`,
    image: '',
    requeriments: {
      building_hangar: 7,
      research_hyperspace_motor_tech: 4
    },
    pricelist: {
      metal: 45000,
      crystal: 15000,
      deuterium: 0,
      energy: 0,
      factor: 1
    },
    combatcaps: {
      consumption: 500,
      consumption2: 500,
      speed: 10000,
      speed2: 10000,
      capacity: 1500,
      shield: 200,
      attack: 1000,
      sd: {
        ..._sd,
        fleet_solar_satelit: 5,
        fleet_spy_sonde: 5
      }
    }
  },
  fleet_colonizer: {
    name: '殖民舰',
    about: '当脉冲引擎研发到5级时,小型运输舰将会换装此型引擎,并增加速度',
    description: `殖民船是特殊设计过的船只，拥有厚重的装甲，允许帝国开拓并殖民到新天地。它将用来对新的星球资源的提供，能整个被分拆然后被重新利用，以建造一个全新的世界。每个帝国能殖民包括主行星在内最多9个星球。
                  快速射击对 间谍卫星: 5
                  快速射击对 太阳能卫星: 5
                  死星 对这种船舰的快速射击: 250`,
    image: '',
    requeriments: {
      building_hangar: 4,
      research_impulse_motor_tech: 3
    },
    pricelist: {
      metal: 10000,
      crystal: 20000,
      deuterium: 10000,
      energy: 0,
      factor: 1
    },
    combatcaps: {
      consumption: 1000,
      consumption2: 1000,
      speed: 2500,
      speed2: 2500,
      capacity: 7500,
      shield: 100,
      attack: 50,
      sd: {
        ..._sd,
        fleet_solar_satelit: 5,
        fleet_spy_sonde: 5
      }
    }
  },
  fleet_recycler: {
    name: '回收舰',
    about: '当脉冲引擎研发到5级时,小型运输舰将会换装此型引擎,并增加速度',
    description: `太空战斗的规模越来越庞大，在单一次战斗中总有著成千上万的船舰被摧毁，产生的船舰残骸却白白被放弃。普通的运输舰无法收集这些珍贵的资源，甚至于无法接近。通过防护技术的发展，产生了一个新的舰艇种类，有了它的帮助能把巨大的流失的资源回收。 回收船的大小与大型运输舰相仿，但额外搭载的防护装备占据了一些可用空间。因此，回收船的可用储存空间被限制为20,000。
                  快速射击对 间谍卫星: 5
                  快速射击对 太阳能卫星: 5
                  死星 对这种船舰的快速射击: 250`,
    image: '',
    requeriments: {
      building_hangar: 4,
      research_combustion_tech: 6,
      research_defence_tech: 2
    },
    pricelist: {
      metal: 10000,
      crystal: 6000,
      deuterium: 2000,
      energy: 0,
      factor: 1
    },
    combatcaps: {
      consumption: 300,
      consumption2: 300,
      speed: 2000,
      speed2: 2000,
      capacity: 20000,
      shield: 10,
      attack: 1,
      sd: {
        ..._sd,
        fleet_solar_satelit: 5,
        fleet_spy_sonde: 5
      }
    }
  },
  fleet_spy_sonde: {
    name: '探测器',
    about: '当脉冲引擎研发到5级时,小型运输舰将会换装此型引擎,并增加速度',
    description: `小巧灵活的探测器，搭载高效能的推进机构，它能够提供遥远的星球上的信息。使用先进的通讯系统，这些探测器可以从极为遥远的地方回传搜集到的情报，在抵达目标行星的绕地轨道后，探测器会运行轨道一周以搜集情报，此时它们很容易被发现。为了节省空间缩小体积，防护盾和武器被放弃了。只要一被发现，探测器通常会因为薄弱的结构而被摧毁。
                  小型运输舰 对这种船舰的快速射击: 5
                  大型运输舰 对这种船舰的快速射击: 5
                  轻型战斗机 对这种船舰的快速射击: 5
                  重型战斗机 对这种船舰的快速射击: 5
                  巡洋舰 对这种船舰的快速射击: 5
                  战列舰 对这种船舰的快速射击: 5
                  殖民船 对这种船舰的快速射击: 5
                  回收船 对这种船舰的快速射击: 5
                  导弹舰 对这种船舰的快速射击: 5
                  毁灭者 对这种船舰的快速射击: 5
                  死星 对这种船舰的快速射击: 1250
                  战斗巡洋舰 对这种船舰的快速射击: 5
                  探查对方用，任务请用「间谍」，为消耗品，遇到有船舰停留的星球很容易变成战场废墟，有资源的话多弄几颗备用。 
                  能获得的信息跟你派的间谍数量及你的间谍技术相关，你能获得的谍报信息程度=X^2+Y=Z (X是双方间谍技术的差 Y是你发射间谍卫星数量) 
                  Z>=1 获得目标资源情报 
                  Z>=2 获得目标舰队情报 
                  Z>=3 获得目标防御情报 
                  Z>=5 获得目标建筑情报 
                  Z>=7 获得目标技术情报 
                  防御间谍比率是说，你间谍人或被人间谍时，卫星被打下的机率，该机率跟目标的驻守舰队数量成正比，跟派出的间谍卫星数成正比，以及你跟对方的间谍技术差成正比，详细的公式还没有发现。 `,
    image: '',
    requeriments: {
      building_hangar: 3,
      research_combustion_tech: 4,
      research_spy_tech: 2
    },
    pricelist: {
      metal: 0,
      crystal: 1000,
      deuterium: 0,
      energy: 0,
      factor: 1
    },
    combatcaps: {
      consumption: 0,
      consumption2: 0,
      speed: 100000000,
      speed2: 100000000,
      capacity: 5,
      shield: 10,
      attack: 5,
      sd: {
        fleet_metal_mine: 0,
        fleet_big_ship_cargo: 0,
        fleet_light_hunter: 0,
        fleet_heavy_hunter: 0,
        fleet_crusher: 0,
        fleet_battle_ship: 0,
        fleet_colonizer: 0,
        fleet_recycler: 0,
        fleet_spy_sonde: 0,
        fleet_bomber_ship: 0,
        fleet_solar_satelit: 0,
        fleet_destructor: 0,
        fleet_dearth_star: 0,
        fleet_battleship: 0,
        defense_misil_launcher: 0,
        defense_small_laser: 0,
        defense_big_laser: 0,
        defense_gauss_canyon: 0,
        defense_ionic_canyon: 0,
        defense_buster_canyon: 0,
        defense_small_protection_shield: 0,
        defense_big_protection_shield: 0
      }
    }
  },
  fleet_bomber_ship: {
    name: '轰炸机',
    about: '当脉冲引擎研发到5级时,小型运输舰将会换装此型引擎,并增加速度',
    description: `轰炸机专门用来摧毁星球上的重型防御装置。拜激光引导系统之赐，等离子炸弹被精确的投掷到它们的目标上，对行星的防御系统造成毁灭性的伤害。当超空间引擎提升到等级8时，轰炸机将可以换装成该型引擎并且提升速度。
                  快速射击对 间谍卫星: 5
                  快速射击对 太阳能卫星: 5
                  快速射击对 火箭发射装置: 20
                  快速射击对 轻型激光炮: 20
                  快速射击对 重型激光炮: 10
                  快速射击对 中子炮: 10
                  死星 对这种船舰的快速射击: 25 
                  终极制压用攻城兵器，对大部分炮台都有相当高的射速，但是其短航程，低速度及相当高的燃料费，令人诟病，所以目的偏向是制压玩家的防御用，而不是抢人。即使能换装引擎，航程还是受到相当限制。 
                  用来消灭防御的大家伙，是这玩意设计时的主要概念。但是并不真的是这样。不是说它没办法消灭防御建筑，而是因为它太慢，消耗太多重氢在飞行和建造上，也不适合用在掠夺战术，只有在压制玩家的时候才有用。你需要一大票的导弹舰才能消灭一整群的防御建筑，如果使用和那些防御总合造价相同的战列来攻击会比较划算。导弹舰也只对小型的防御有效（因为有快速射击），中子炮，导弹发射器，轻雷重雷。对抗高斯炮和离子炮的时候没有快速射击`,
    image: '',
    requeriments: {
      building_hangar: 8,
      research_impulse_motor_tech: 6,
      research_buster_tech: 5
    },
    pricelist: {
      metal: 50000,
      crystal: 25000,
      deuterium: 15000,
      energy: 0,
      factor: 1
    },
    combatcaps: {
      consumption: 1000,
      consumption2: 1000,
      speed: 4000,
      speed2: 5000,
      capacity: 500,
      shield: 500,
      attack: 1000,
      sd: {
        ..._sd,
        fleet_solar_satelit: 5,
        fleet_spy_sonde: 5,
        defense_misil_launcher: 20,
        defense_small_laser: 20,
        defense_big_laser: 10,
        defense_ionic_canyon: 10
      }
    }
  },
  fleet_solar_satelit: {
    name: '太阳能卫星',
    about: '当脉冲引擎研发到5级时,小型运输舰将会换装此型引擎,并增加速度',
    description: `太阳能卫星装备了太阳能电池，是构造简单的轨道卫星，它会把搜集到的能量传回到星球的地表上。这些能量使用特殊的雷射光来传输。太阳能卫星的效率取决于太阳光线的强弱。它的价格低廉，安装简单，这些卫星因为提供了地面建筑所需的电力而广为人知。不幸的是，这些卫星在战斗时极易被摧毁。
                  小型运输舰 对这种船舰的快速射击：5
                  死星 对这种船舰的快速射击：1250
                  大型运输舰 对这种船舰的快速射击：5
                  轻型战斗机 对这种船舰的快速射击：5
                  重型战斗机 对这种船舰的快速射击：5
                  巡洋舰 对这种船舰的快速射击：5
                  战列舰 对这种船舰的快速射击：5
                  殖民船 对这种船舰的快速射击：5
                  回收船 对这种船舰的快速射击：5
                  轰炸机 对这种船舰的快速射击：5
                  毁灭者 对这种船舰的快速射击：5
                  战斗巡洋舰 对这种船舰的快速射击：5`,
    image: '',
    requeriments: {
      building_hangar: 1,
    },
    pricelist: {
      metal: 0,
      crystal: 2000,
      deuterium: 500,
      energy: 0,
      factor: 1
    },
    combatcaps: {
      consumption: 0,
      consumption2: 0,
      speed: 0,
      speed2: 0,
      capacity: 0,
      shield: 10,
      attack: 1,
      sd: {
        ..._sd,
        fleet_solar_satelit: 0
      }
    },
    formulas: {
      energy: (BuildLevel, BuildLevelFactor, BuildTemp) => ((BuildTemp / 4) + 20) * BuildLevel * (0.1 * BuildLevelFactor)
    }
  },
  fleet_destructor: {
    name: '毁灭者',
    about: '当脉冲引擎研发到5级时,小型运输舰将会换装此型引擎,并增加速度',
    description: `毁灭者是战斗船舰中的王者。由离子-等离子及高斯加农炮构筑而成的多重武器方阵搭载在能快速反应的炮台上，使它击中战机的机率高达99%。因为毁灭者巨大的体积限制了活动能力，使得它跟战斗舰艇比较起来更像是移动式的堡垒。由于火力惊人，它所消耗的重氢也同样巨大...对轻型雷射炮有快速射击(10)。
                  快速射击对 间谍卫星: 5
                  快速射击对 太阳能卫星: 5
                  快速射击对 轻型激光炮: 10
                  快速射击对 战斗巡洋舰: 2
                  死星 对这种船舰的快速射击: 5 
                  唯一能与死星抗衡的船只，也是除死星外能抵抗等离子炮那一击必杀的船，对轻雷的高射速也很可怕，不过航程跟航速似乎也不甚理想`,
    image: '',
    requeriments: {
      building_hangar: 9,
      research_hyperspace_motor_tech: 6,
      research_hyperspace_tech: 5
    },
    pricelist: {
      metal: 60000,
      crystal: 50000,
      deuterium: 15000,
      energy: 0,
      factor: 1
    },
    combatcaps: {
      consumption: 1000,
      consumption2: 1000,
      speed: 5000,
      speed2: 5000,
      capacity: 2000,
      shield: 500,
      attack: 2000,
      sd: {
        ..._sd,
        fleet_solar_satelit: 5,
        fleet_spy_sonde: 5,
        defense_small_laser: 10,
        fleet_battleship: 2
      }
    }
  },
  fleet_dearth_star: {
    name: '死星',
    about: '当脉冲引擎研发到5级时,小型运输舰将会换装此型引擎,并增加速度',
    description: `死星装备了一门巨大的重力粒子炮，只需要一击就能够摧毁几乎任何东西，甚至是月球。它需要无比巨大的能量，以致于它几乎是由能量产生器组成的。死星的大小限制了它的航行速度，使得它无比缓慢。有些时候，其他舰船会被要求在死星后面推它一把。只有强大且先进的星际帝国才有足够的人力，资源与知识去建造这种几乎有月球大小的太空船。
                  快速射击对 间谍卫星: 1250
                  快速射击对 太阳能卫星: 1250
                  快速射击对 小型运输舰: 250
                  快速射击对 大型运输舰: 250
                  快速射击对 轻型战斗机: 200
                  快速射击对 重型战斗机: 100
                  快速射击对 巡洋舰: 33
                  快速射击对 战列舰: 30
                  快速射击对 殖民船: 250
                  快速射击对 回收船: 250
                  快速射击对 导弹舰: 25
                  快速射击对 毁灭者: 5
                  快速射击对 飞弹发射器: 200
                  快速射击对 轻型雷射炮: 200
                  快速射击对 重型雷射炮: 100
                  快速射击对 高斯炮: 50
                  快速射击对 中子炮: 100
                  快速射击对 战斗巡洋舰: 15
                  正如星战里的死星一样，终极毁灭兵器，可是他可不会被一台战机用原力锁定投弹就灭了，其超高的防护与攻击力还有对抗各种船舰与炮台的优越性能，堪称OGAME之王，不过速度慢到爆，而且造价奇高就是。 终极的船舰！ 但是在最新版中被削弱很多。 
                  原文笔者不会在此时建造它们。死星只有在至少集结10台以上的时候才会强大。当躲在炮灰后面的时候能发挥最大威力。对抗每样东西都有快速射击能力，除了离子炮`,
    image: '',
    requeriments: {
      building_hangar: 12,
      research_hyperspace_motor_tech: 7,
      research_hyperspace_tech: 6,
      research_graviton_tech: 1
    },
    pricelist: {
      metal: 5000000,
      crystal: 4000000,
      deuterium: 1000000,
      energy: 0,
      factor: 1
    },
    combatcaps: {
      consumption: 1,
      consumption2: 1,
      speed: 100,
      speed2: 100,
      capacity: 1000000,
      shield: 50000,
      attack: 200000,
      sd: {
        fleet_metal_mine: 250,
        fleet_big_ship_cargo: 250,
        fleet_light_hunter: 200,
        fleet_heavy_hunter: 100,
        fleet_crusher: 33,
        fleet_battle_ship: 30,
        fleet_colonizer: 250,
        fleet_recycler: 250,
        fleet_spy_sonde: 1250,
        fleet_bomber_ship: 25,
        fleet_solar_satelit: 1250,
        fleet_destructor: 5,
        fleet_dearth_star: 1,
        fleet_battleship: 15,
        defense_misil_launcher: 200,
        defense_small_laser: 200,
        defense_big_laser: 100,
        defense_gauss_canyon: 50,
        defense_ionic_canyon: 100,
        defense_buster_canyon: 1,
        defense_small_protection_shield: 1,
        defense_big_protection_shield: 1
      }
    }
  },
  fleet_battleship: {
    name: '战斗巡洋舰',
    about: '当脉冲引擎研发到5级时,小型运输舰将会换装此型引擎,并增加速度',
    description: `这艘舰艇对敌方重型舰艇来说是死亡舰艇。由于他的小型化设计跟精密的武器设计,使得他只能拥有最小型的货舱，相对的他可以使用燃料消耗较少的超空间引擎，以及使得它可以在一瞬间摧毁大量的重型舰艇而在战斗中占有一定的优势地位.
                  快速射击对 间谍卫星: 5
                  快速射击对 太阳能卫星: 5
                  快速射击对 小型运输舰: 3
                  快速射击对 大型运输舰: 3
                  快速射击对 重型战斗机: 4
                  快速射击对 巡洋舰: 4
                  快速射击对 战列舰: 7
                  毁灭者 对这种船舰的快速射击: 2 
                  死星 对这种船舰的快速射击: 15 `,
    image: '',
    requeriments: {
      building_hangar: 8,
      research_hyperspace_motor_tech: 5,
      research_hyperspace_tech: 5,
      research_laser_tech: 12
    },
    pricelist: {
      metal: 30000,
      crystal: 40000,
      deuterium: 15000,
      energy: 0,
      factor: 1
    },
    combatcaps: {
      consumption: 250,
      consumption2: 250,
      speed: 10000,
      speed2: 10000,
      capacity: 750,
      shield: 400,
      attack: 7000,
      sd: {
        ..._sd,
        fleet_spy_sonde: 5,
        fleet_solar_satelit: 5,
        fleet_metal_mine: 3,
        fleet_big_ship_cargo: 3,
        fleet_heavy_hunter: 4,
        fleet_crusher: 4,
        fleet_battle_ship: 7
      }
    }
  }
}

const fleet = deepFreeze(fleets);
export {
  fleet
}