import { UPDATE_CHAPTER, UPDATE_LINK, UPDATE_INFO } from './actionType'

export const changeChapterAction = (chapter) => ({
  type: UPDATE_CHAPTER,
  chapter
})

export const changeLinkAction = (link) => ({
  type: UPDATE_LINK,
  link
})

export const changeBookInfoAction = (info) => ({
  type: UPDATE_INFO,
  info
})