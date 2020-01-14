// 引入createStore方法
import { createStore } from 'redux'
import reducer from './reducer'

// 创建数据存储仓库
const store = createStore(reducer)

export default store
