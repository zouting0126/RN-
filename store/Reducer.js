import { UPDATE_CHAPTER, UPDATE_LINK } from './Actions'

export const reducerChapter = (state, action) => {
  switch (action.type) {
    case UPDATE_CHAPTER:
      return action.chapter
    default:
      return state
  }
}

export const reducerLink = (state, action) => {
  switch (action.type) {
    case UPDATE_LINK:
      return action.link
    default:
      return state
  }
}
