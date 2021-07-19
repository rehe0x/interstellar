import { deepFreeze } from '../lib/utils.js'

const OfficierMap = {
  officierRpgGeologue: {
    name: '地质学者',
    about: '+5% 资源产量.最大等级: 20 (每一等级增加3天的使用期限) 每提升一级消耗100单位暗物质',
    description: '地质学者是太空矿物学及结晶学的专家。他在化学以及冶金方面协助他的团队并且改善了星际间的通讯以及将帝国内的矿物做更有效的提炼运用',
    image: '',
    max: 20,
    factor: 0.05,
    expendPoints: 100
  }
}
deepFreeze(OfficierMap)
export {
  OfficierMap
}
