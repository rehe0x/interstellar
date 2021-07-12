module.exports = {
  defense_misil_launcher: {
    name: '火箭发射装置',
    about: '',
    description: `火箭发射装置是一种造价低廉，构造简单的防御系统。源自简单的弹道武器，它不需要特别的研究就可以建造。低廉的造价让它适于对抗小型舰队，但是随著时间的消逝它也慢慢失去了作用。在后期它只能扮演为更强大的防御系统拦截火力的角色。一般来说，防御工事在系统状况接近崩溃时会自动关闭，以便有修复的机会。在战斗结束后,被摧毁的防御设施有70%的机会被修好。
    死星 对这种船舰的快速射击：200
    巡洋舰 对这种船舰的快速射击：10
    轰炸机 对这种船舰的快速射击：20`,
    image: '',
    requeriments: {
      building_hangar: 1,
    },
    pricelist: {
      metal: 2000,
      crystal: 0,
      deuterium: 0,
      energy: 0,
      factor: 1
    },
    attribute: {
      shield: 20,
      attack: 10
    },
    sd: {
      spy_sonde: 5,
      solar_satelit: 5
    }
  },
  defense_small_laser: {
    name: '轻型激光炮',
    about: '',
    description: `为了对抗在造船技术领域的巨大进步，科学家必须发展出一种新的防御装置，以便对抗装备完善的船舰和舰队。很快轻型激光炮诞生了, 通过光子集中射击能造成比弹道武器更大的伤害。另一方面，它的防护能力也被提升以对抗现代船舰的火力。为了不让生产成本大幅上升，它的基本结构和火箭发射装置相比没什么太大的不同。因为它的性能价格比极高，从刚起步的帝国到强大的星际帝国，到处都能见到它的身影。
                  轰炸机 对这种船舰的快速射击: 20
                  毁灭者 对这种船舰的快速射击: 10
                  死星 对这种船舰的快速射击: 200`,
    image: '',
    requeriments: {
      building_hangar: 2,
      research_energy_tech: 1,
      research_laser_tech: 3
    },
    pricelist: {
      metal: 2000,
      crystal: 0,
      deuterium: 0,
      energy: 0,
      factor: 1
    },
    attribute: {
      shield: 20,
      attack: 10
    },
    sd: {
      spy_sonde: 5,
      solar_satelit: 5
    }
  },
  defense_big_laser: {
    name: '重型激光炮',
    about: '',
    description: `重型激光炮是轻型激光炮必然的发展结果，它的结构被加强了。由于加入了新的材料，它的外壳被改造得具有了真正的抵抗力。同时它的能量系统和射控电脑也被改进，能在一个目标上释放更多的能量，造成更大的伤害。
                  轰炸机 对这种船舰的快速射击: 10
                  死星 对这种船舰的快速射击: 200`,
    image: '',
    requeriments: {
      building_hangar: 4,
      research_energy_tech: 3,
      research_laser_tech: 6
    },
    pricelist: {
      metal: 2000,
      crystal: 0,
      deuterium: 0,
      energy: 0,
      factor: 1
    },
    attribute: {
      shield: 20,
      attack: 10
    },
    sd: {
      spy_sonde: 5,
      solar_satelit: 5
    }
  },
  defense_gauss_canyon: {
    name: '磁能炮',
    about: '',
    description: `和先进的核聚变技术，新型能量来源，超空间技术和进步的合金治炼技术相比，投射武器简直就是快报废的老古董。但也因为能量技术的进步，让它找回自己在新世纪中的定位：它的原理早在20和21世纪就被熟知：粒子加速。磁能炮就是一座大型的粒子加速器，成吨重的炮弹被巨大的电磁场加速，这些炮弹的出膛速度是如此之高，它燃尽了周遭空气中的尘埃，后座力撼动大地。它的破坏力足以击穿任何现代的装甲，防护盾被击穿也不是少数例子。有时甚至能把目标直接打个对穿。
                  死星 对这种船舰的快速射击: 50
                  你可以造的第一管大炮。对抗巡洋舰和重型战斗机很有效，如果要对付战舰和毁灭者你应该使用离子炮。 对付炮灰部队几乎是无用的。当你有炮灰支持的时候才使用磁能炮`,
    image: '',
    requeriments: {
      building_hangar: 6, 
      research_energy_tech: 6,
      research_military_tech: 3,
      research_defence_tech: 1
    },
    pricelist: {
      metal: 2000,
      crystal: 0,
      deuterium: 0,
      energy: 0,
      factor: 1
    },
    attribute: {
      shield: 20,
      attack: 10
    },
    sd: {
      spy_sonde: 5,
      solar_satelit: 5
    }
  },
  defense_ionic_canyon: {
    name: '中子炮',
    about: '',
    description: `这种技术在21世纪时就已存在，当时称为EMP，也就是电磁脉冲。它有一个特性，脉冲能量会造成瞬间的突波，对电子设备造成严重的干扰，并把那些灵敏的电子设备摧毁。往日这类武器被搭载在炸弹或是火箭飞弹上，但随著EMP领域研究发展的结果，现在这类武器可以被很简单地改装成火炮。中子炮是这类武器中的佼佼者。密集的中子束可以破坏目标上任何未加防护的电子系统，并使得船舰上的防护盾产生器不稳定，并不会造成实质上的伤害。各式舰艇中只有巡洋舰搭载了中子炮，因为中子炮的能量消耗非常的巨大，在战斗中通常都是直接毁灭目标船舰，而不是瘫痪它的行动能力。
                  轰炸机 对这种船舰的快速射击: 10
                  死星 对这种船舰的快速射击: 100
                  通常大部分的玩家都会忽略这项设施，因为它的火力不够强。但是它的护盾是它的最大优势。对于轻型战斗机、重型战斗机的攻击几乎是免疫，可以吸收许多伤害，让你的其它更大管的炮有更多时间对付敌人`,
    image: '',
    requeriments: {
      building_hangar: 6,
      research_ionic_tech: 4
    },
    pricelist: {
      metal: 2000,
      crystal: 0,
      deuterium: 0,
      energy: 0,
      factor: 1
    },
    attribute: {
      shield: 20,
      attack: 10
    },
    sd: {
      spy_sonde: 5,
      solar_satelit: 5
    }
  },
  defense_buster_canyon: {
    name: '等离子塔',
    about: '',
    description: `激光技术目前已经趋向完美，离子技术也将到达它的终点站，这些现存的武器系统似乎再也没有改进的余地。但是人们想到了一个主意：也就是把两种系统合而为一。激光被用来把重氢加热到百万度的高温，再利用研发离子技术所获得的电磁场知识，来包裹这团可怕的等离子团。这青蓝色的等离子球在飞往目标的途中看起来是如此的赏心悦目，但是在太空船上的船员看来，这看来温和的等离子团代表的是毁灭与死亡。等离子武器被看作是最可怕的武器，当然这项技术的代价也是高昂的。
                  相对于死星的终极防御兵器，不过需要大量的轻雷掩护。
                  是的，这就是天杀的大肥枪。对付所有大船都很有用。巡洋舰？一发就可以炸成碎片。战列舰？一发让它就蒸发成怡人的气体。毁灭者？ 好吧，它可以活过一发因为毁灭者看起来令人愉快。当你要对抗大船的时候就使用离子炮，对付小船可以说是没用的。如果离子炮没有躲在一些导弹或是轻雷后面，那只要几台轻型战斗机就可以搞定他`,
    image: '',
    requeriments: {
      building_hangar: 8,
      research_buster_tech: 7
    },
    pricelist: {
      metal: 2000,
      crystal: 0,
      deuterium: 0,
      energy: 0,
      factor: 1
    },
    attribute: {
      shield: 20,
      attack: 10
    },
    sd: {
      spy_sonde: 5,
      solar_satelit: 5
    }
  },
  defense_small_protection_shield: {
    name: '小型防护罩',
    about: '',
    description: `在防护盾发生器足够小到能装备到飞船上以前，早就存在一种在星球表面装备的大型的防护盾发生器。它把整个星球都罩了起来，并产生出一种力场，能在能量爆发以前把它们大量的吸收。小型的舰队常常对这种小型防护罩束手无策。随著技术上的不断发展，防护盾也被不断的强化。
                  在后期人们还能将造大型的防护罩，它更加的强大。每种防护罩，在星球上只能各设置一个。在战斗结束后,被摧毁的防御设施有70%的机会被修好`,
    image: '',
    requeriments: {
      building_hangar: 1,
      research_defence_tech: 2
    },
    pricelist: {
      metal: 2000,
      crystal: 0,
      deuterium: 0,
      energy: 0,
      factor: 1
    },
    attribute: {
      shield: 20,
      attack: 10
    },
    sd: {
      spy_sonde: 5,
      solar_satelit: 5
    }
  },
  defense_big_protection_shield: {
    name: '大型防护罩',
    about: '',
    description: `小型防护罩的改进。它们使用相同的技术，但大型防护罩却可以抵挡多得多的进攻能量。大型防护罩的力场产生器在运转时也比较安静。
                  在战斗结束后,被摧毁的防御设施有70%的机会被修好`,
    image: '',
    requeriments: {
      building_hangar: 6,
      research_defence_tech: 6
    },
    pricelist: {
      metal: 2000,
      crystal: 0,
      deuterium: 0,
      energy: 0,
      factor: 1
    },
    attribute: {
      shield: 20,
      attack: 10
    },
    sd: {
      spy_sonde: 5,
      solar_satelit: 5
    }
  },
  defense_interceptor_misil: {
    name: '拦截导弹',
    about: '',
    description: `拦截导弹能拦截并摧毁进攻的星际导弹。每一枚拦截导弹可以摧毁一枚星际导弹。
    用来拦截敌人的星际导弹，自动会发射，它会是唯一防御星际导弹的东西，以1:1击落星际导弹`,
    image: '',
    requeriments: {
      building_silo: 2
    },
    pricelist: {
      metal: 2000,
      crystal: 0,
      deuterium: 0,
      energy: 0,
      factor: 1
    },
    attribute: {
      shield: 20,
      attack: 10
    },
    sd: {
      spy_sonde: 5,
      solar_satelit: 5
    }
  },
  defense_interplanetary_misil: {
    name: '星际导弹',
    about: '',
    description: `星际导弹能摧毁敌方的防御设施。被星际导弹摧毁的防御设施不会被重建。
                  射程：(脉冲引擎等级)*2-1(每太阳系)
                  攻击力：12000+(武器技术等级*1200)
                  时间：对同一太阳系发射需要30秒，之后每跨一个太阳系，飞行时间增加60秒不能发射飞弹到射程之外。星际导弹可以催毁目标星球的炮台，而不会有70%的修复`,
    image: '',
    requeriments: {
      building_silo: 4
    },
    pricelist: {
      metal: 2000,
      crystal: 0,
      deuterium: 0,
      energy: 0,
      factor: 1
    },
    attribute: {
      shield: 20,
      attack: 10
    },
    sd: {
      spy_sonde: 5,
      solar_satelit: 5
    }
  }
}
