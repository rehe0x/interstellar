import { deepFreeze } from '../../lib/utils.js'

const ResearchMap = {
  researchSpy: {
    name: '空间探测技术',
    about: '',
    description: `星球探测技术主要是研究资料感应器和智慧型装置与知识，以供探测资料并防止外来的探测器进行探测。这项技术的等级越高，就能从其他帝国的行星获得更多资料。探测器探测资料的多寡，主要取决于自己和对手的探测技术的差距。自己的技术等级越高，就能获得更多资料且被发现的机率也越低。发送的探测器越多，就能回传更多讯息－但此举也大大提高了被发现的机率。提升空间探测技术也可以得知关于接近自己星球的舰队资料
    － 等级2可以看到舰队总数；
    － 等级4可以区分出舰队内有哪些种类的船舰；
    － 等级8可以分辨各种船舰各有几艘。
    一般来说，无论是侵略性的或爱好和平的，空间探测技术对每个星际帝国都很重要。最好在小型运输舰研究好之后就对它进行发展。
    `,
    image: '',
    requeriments: {
      buildingLaboratory: 3
    },
    pricelist: {
      metal: 200,
      crystal: 1000,
      deuterium: 200,
      energy: 0,
      factor: 2
    }
  },
  researchComputer: {
    name: '计算机技术',
    about: '',
    description: '计算机技术研究用来提高计算机的计算能力。研究出更高性能更有效的控制系统。每一等级的提升都增强了运算能力和资料的平行处理能力。计算机技术的提升能指挥更多的舰队。每次出发的舰队越多，能攻击的也就越多，带回的资源也越多，当然这项技术也被商人利用，因为他能让更多的商业舰队出发',
    image: '',
    requeriments: {
      buildingLaboratory: 1
    },
    pricelist: {
      metal: 0,
      crystal: 400,
      deuterium: 600,
      energy: 0,
      factor: 2
    }
  },
  researchMilitary: {
    name: '武器技术',
    about: '',
    description: `武器技术研究如何让现有的武器系统产生更大的破坏力。它主要是著重于让武器能更有效的利用能量，发挥更佳的效能。 如此一来每提升一级技术，相同的武器拥有更多能量，攻击力也越强 － 每提升一级，武器攻击力在基础值增加10%。由于武器技术能让你保持和敌人之间的优势，因此你应该在游戏中持续的升级武器技术。
    Ogame 的技术都是提升基础值，也就是一级的时候为 10%，二级的时候为基础值增加20%。`,
    image: '',
    requeriments: {
      buildingLaboratory: 4
    },
    pricelist: {
      metal: 800,
      crystal: 200,
      deuterium: 0,
      energy: 0,
      factor: 2
    }
  },
  researchDefence: {
    name: '防御技术',
    about: '',
    description: `防御盾系统用来在你的船舰周围产生防护性的粒子护盾。每提升一个等级可以为防护盾增加10%的效率。等级提升增加了护盾能量总额，使它在崩溃前能够吸收更多的能量。防御盾装置不仅被使用在船舰上，在行星防御罩上也能见到它的踪影。
    Ogame 的技术都是提升基础值，也就是一级的时候为 10%，二级的时候为基础值增加20%`,
    image: '',
    requeriments: {
      researchEnergy: 3,
      buildingLaboratory: 6
    },
    pricelist: {
      metal: 200,
      crystal: 600,
      deuterium: 0,
      energy: 0,
      factor: 2
    }
  },
  researchShield: {
    name: '装甲技术',
    about: '',
    description: `T特殊的合金使装甲更加强大。一旦一种十分强固的合金被找到，就会被特殊的射线改变船舰壳体的分子结构从而达到合金最好的状态。装甲的效力在每升一级飞船装甲化后在基础值上升10%。
                  Ogame 的技术都是提升基础值，也就是一级的时候为 10%，二级的时候为基础值增加20%。`,
    image: '',
    requeriments: {
      buildingLaboratory: 2
    },
    pricelist: {
      metal: 1000,
      crystal: 0,
      deuterium: 0,
      energy: 0,
      factor: 2
    }
  },
  researchEnergy: {
    name: '能量技术',
    about: '',
    description: '能量技术致力于发展能量系统和能量储存技术的开发和研究：当技术等级提升得越高，你的能源系统便越有效率。从能量技术上获得的知识将成为研究其它特定技术的基础。',
    image: '',
    requeriments: {
      buildingLaboratory: 1
    },
    pricelist: {
      metal: 0,
      crystal: 800,
      deuterium: 400,
      energy: 0,
      factor: 2
    }
  },
  researchHyperspace: {
    name: '超空间技术',
    about: '',
    description: `通过结合四维和五维的推进技术，可以创造出一种新的推进系统－效率更高，更节省燃料。超空间技术提供了大型战舰和空间传送点进行传送所需要的基本技术。这种崭新而复杂的技术需要昂贵的实验设备和测试用的设施。
                  超空间推动的前置作业，一样点基础数值就行了`,
    image: '',
    requeriments: {
      researchEnergy: 5,
      researchDefence: 5,
      buildingLaboratory: 7
    },
    pricelist: {
      metal: 0,
      crystal: 4000,
      deuterium: 2000,
      energy: 0,
      factor: 2
    }
  },
  researchCombustion: {
    name: '燃烧引擎',
    about: '',
    description: `基于反作用原理，燃烧引擎是最古老的引擎类型。高温的粒子被高速的甩出飞船并以此来推动飞船向反方向前进。燃烧引擎效率低下，但是因为它便宜，容易操作，体积小的原因，适合于小型船舰，操作过程中也不需要耗费太多的电脑系统资源。
                  每提升一个等级可以在基础值上增加10%的速度：小型和大型运输舰，轻型战舰，回收舰和探测器`,
    image: '',
    requeriments: {
      researchEnergy: 1,
      buildingLaboratory: 1
    },
    pricelist: {
      metal: 400,
      crystal: 0,
      deuterium: 600,
      energy: 0,
      factor: 2
    },
    speed: 0.1
  },
  researchImpulseMotor: {
    name: '脉冲引擎',
    about: '',
    description: `脉冲引擎基于反作用力的原理而设计。此种推进系统所用的燃料是核融合炉生产能量后产生的垃圾。与简单的燃烧引擎比较之下，脉冲引擎更为先进，可以用较少的燃料消耗量获得较高的速度。每升一级提高速度20%。
                这个技术是连系星际帝国最基本的方式，它应该被尽早研究。
                关系到你的巡洋、重型战斗机、殖民飞船跟导弹舰的速度，每升一级加基本速度的20%，最少点到3(殖民飞船底限)，不过点到的话5，可以让你的小型运输机换引擎(非法改装!?) 速度飙超快，很诱人的一件事`,
    image: '',
    requeriments: {
      researchEnergy: 1,
      buildingLaboratory: 2
    },
    pricelist: {
      metal: 2000,
      crystal: 4000,
      deuterium: 6000,
      energy: 0,
      factor: 2
    },
    speed: 0.2
  },
  researchHyperspaceMotor: {
    name: '超空间引擎',
    about: '',
    description: `通过对时间和空间的弯曲从而使船舰周围的空间进行压缩，从而使飞行的距离减少。这项技术水平越高，空间压缩的也越剧烈，从而达到提高速度的目的。每升一级提高速度30％需求: 超空间技术（等级3）研究实验室 （等级7）。
    关系到你战列、毁灭者、战斗巡洋舰跟死星的速度，每升一级加基本速度的30%，最少点到4，不过点到8可以让你的导弹舰换引擎，速度一样会有所提升`,
    image: '',
    requeriments: {
      researchHyperspace: 3,
      buildingLaboratory: 7
    },
    pricelist: {
      metal: 10000,
      crystal: 20000,
      deuterium: 6000,
      energy: 0,
      factor: 2
    },
    speed: 0.3
  },
  researchLaser: {
    name: '激光技术',
    about: '',
    description: `激光是高能量的光子束,具有指向性和绝佳的聚焦性质。激光装置的用途很广泛：从导航陀螺仪，光学电脑或武器系统，雷射技术对每个帝国来说都是基础知识。
                需求：研究实验室（等级1）能量技术（等级2）`,
    image: '',
    requeriments: {
      buildingLaboratory: 1,
      researchEnergy: 2
    },
    pricelist: {
      metal: 200,
      crystal: 100,
      deuterium: 0,
      energy: 0,
      factor: 2
    }
  },
  researchIonic: {
    name: '中子技术',
    about: '',
    description: `中子武器技术基于将高加速的中子光束投射在目标上，依靠目标物带电荷的本质，可以造成巨大的伤害。中子光束比激光优秀，但需要更多的研究费用。虽然与其他技术相较之下较为简易，在大多数的星球上，被运用到的机会并不大。
                中子技术完全不会影响你的攻击火力，所以不要以为点高会变强，点他的目的，只有巡洋跟导弹舰的前置作业吧，也是够用就好`,
    image: '',
    requeriments: {
      buildingLaboratory: 4,
      researchLaser: 5,
      researchEnergy: 4
    },
    pricelist: {
      metal: 1000,
      crystal: 300,
      deuterium: 100,
      energy: 0,
      factor: 2
    }
  },
  researchBuster: {
    name: '等离子技术',
    about: '',
    description: `由于等离子不友善的性质，等离子武器比任何已知的武器系统都要来得危险。等离子是物质四态的其中之一（固态, 液态, 气态, 等离子[电浆态]），是由带正电荷和带负电荷的离子所组成的流体。只要输入的能量足够，原本为电中性的气体会分离成为各带有正负电荷的离子和电子。利用磁力技术，这些带电的粒子被包裹成“球状”以便发射。
                等离子技术完全不会影响你的攻击火力，所以不要以为点高会变强，用来盖离子炮跟导弹舰的技术，相当诱人而且昂贵，够用就好`,
    image: '',
    requeriments: {
      buildingLaboratory: 5,
      researchEnergy: 8,
      researchLaser: 10,
      researchIonic: 5
    },
    pricelist: {
      metal: 2000,
      crystal: 4000,
      deuterium: 1000,
      energy: 0,
      factor: 2
    }
  },
  researchIntergalactic: {
    name: '跨星系科研网络',
    about: '',
    description: `跨星系科研网络
                你的星球上的科学家可以经由网络互相通信。每提升一个等级，网络会自动将未连线的研究实验室加入网路中。在连线建立后，它们的等级会相加。每个连结中的研究实验室都需要有相应的等级以加入研究。只要等级足够，研究实验室会各自分担工作，效率就像它们被相加一样。
                每增加一级， 就可以把其它殖民星球里，最高级的实验室加入研究网络中，此时他们的研究等级会相加， 但是你要研究的项目， 如果在联机星球的研究所等级太低， 不够达到研究该技术的等级的话， 就没有效果。
                意思是说，你这科技每升一级，你在进行研究时，可以把进行研究的行星之外的星球中，研究所等级最高的那一颗的研究所等级也加上来。但要那行星上的研究所等级也大于该科技要求。 
                例如，你有4个行星有研究所，分别是：10、8、5、4，而你要研究武器技术。 
                当你使用10级的那颗行星进行研究时， 如果你这科技等级是1，那你可以把8级的加上来，等于以10+8 = 18的等级进行研究。 如果你这科技等级是2，那你可以把8级和5级的加上来，等于以10+8+5=23的等级进行研究。 如果你这科技等级是3，那你可以把8级、5级和4级的全加上来，等于以10+8+5+4=27的等级进行研究。
                但是，如果你进行研究的那行星研究所等级不到你要研究科技的要求，就不能研究。 举个例子，如超空间推动要7级研究所才能研究。而你己经有了这个科技一级，而你也有二个行星的研究所等级是6、5，相加是11，超过7级。但你还是不能研究超空间推动。 而当你把6级的升级成7级之后，你就可以研究超空间推动，但是还是以7级研究所等级来研究。 你必需把另一个行星的研究所也升级到7级，这样就会以7+7 = 14级来进行研究。`,
    image: '',
    requeriments: {
      buildingLaboratory: 10,
      researchComputer: 8,
      researchHyperspace: 8
    },
    pricelist: {
      metal: 240000,
      crystal: 400000,
      deuterium: 160000,
      energy: 0,
      factor: 2
    }
  },
  researchExpedition: {
    name: '远征科技',
    about: '',
    description: `远征技术1级，可以发一个远征舰队；远征技术4级，可以发2个远征舰队；远征技术9级，可以发3个远征舰队；远征技术16级，可以发4个远征舰队；
                  远征科技每提升2级该科技，可提供一个额外的行星殖民可能性，初期除母星外可不受远征科技的影响，无限制额外殖民8颗殖民星，殖民第9颗殖民星需将远征科技等级提升至9*2=18级。`,
    image: '',
    requeriments: {
      buildingLaboratory: 3,
      researchComputer: 4,
      researchImpulseMotor: 3

    },
    pricelist: {
      metal: 4000,
      crystal: 8000,
      deuterium: 4000,
      energy: 0,
      factor: 2
    }
  },
  researchGraviton: {
    name: '引力技术',
    about: '',
    description: `重力子是产生重力的基本微粒。它是自己的反粒子，没有质量，不带电荷，自旋数为2。通过发射密集的重力微粒，人工的重力场被制造出来，其能量和吸引力不只可以摧毁船舰，甚至是月球。为了产生足够的重力微粒，需要大量的能量。需求：研究实验室（等级12）
                研发他只有一个目的，就是为了我们的终极目标，死星! 不过所费相当相当高啊... 要价0金属 0晶体 0重氢 还有... 30万能量...
                引力研究的标准配置：最高温度大于120的一号星球、研究实验室(等级 12)、太阳能卫星 6000 枚。研究实验室(等级 12)需要 409,600金属、819,200晶体、409,600重氢。太阳能卫星 6000 枚需要 12,000,000晶体、3,000,000重氢。当达到资源需求的时候，点下去瞬间研究完成`,
    image: '',
    requeriments: {
      buildingLaboratory: 12
    },
    pricelist: {
      metal: 0,
      crystal: 0,
      deuterium: 0,
      energy: 300000,
      factor: 3
    }
  }
}

deepFreeze(ResearchMap)
export {
  ResearchMap
}
