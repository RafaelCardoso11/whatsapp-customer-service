export enum EMessageType {
  VOICE = 'ptt',
  TEXT = 'chat',
  IMAGE = 'image',
  STICKER = 'sticker',
}

interface MediaData {
  type: 'image'
  mediaStage: 'FETCHING'
  size: number
  loadedSize: number
  filehash: string
  mimetype: string
  mediaBlob: null
  fullHeight: number
  fullWidth: number
  aspectRatio: number
  animationDuration: number
  animatedAsNewMsg: boolean
  isViewOnce: boolean
  staticUrl: string
  preview: {
    _retainCount: number
    _inAutoreleasePool: boolean
    released: boolean
    _b64: string
    _mimetype: string
  }
  _swStreamingSupported: boolean
  _listeningToSwSupport: boolean
  isVcardOverMmsDocument: boolean
  waveform: null
}

export interface Sender {
  id: string
  name: string
  shortName: string
  pushname: string
}
export interface IMessage {
  id: string
  type: string
  from: string
  to: string
  isNewMsg: string
  hasReaction: string
  chatId: string
  sender: Sender
  mediaData: MediaData
  content: string
}
