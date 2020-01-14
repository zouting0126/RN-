import { UPDATE_CHAPTER, UPDATE_LINK, UPDATE_INFO } from './actionType'

// 默认数据
const defaultValue = {
  chapter: [],
  link: '',
  info: {}
}

// Reducer里只能接收state，不能改变state
const reducer = (state = defaultValue, action) => { // 就是一个方法函数
  /**
   * state: 指的是原始仓库里的状态
   * action: 指的是action新传递的状态
   */
  if (action.type === UPDATE_CHAPTER) {
    let newState = JSON.parse(JSON.stringify(state))
    newState.chapter = action.chapter
    return newState
  }
  if (action.type === UPDATE_LINK) {
    let newState = JSON.parse(JSON.stringify(state))
    newState.link = action.link
    return newState
  }
  if (action.type === UPDATE_INFO) {
    let newState = JSON.parse(JSON.stringify(state))
    newState.info = action.info
    return newState
  }
  return state
}

export default reducer