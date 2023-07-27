interface MediaData {
  type: 'image';
  mediaStage: 'FETCHING';
  size: number;
  loadedSize: number;
  filehash: string;
  mimetype: string;
  mediaBlob: null;
  fullHeight: number;
  fullWidth: number;
  aspectRatio: number;
  animationDuration: number;
  animatedAsNewMsg: boolean;
  isViewOnce: boolean;
  staticUrl: string;
  preview: {
    _retainCount: number;
    _inAutoreleasePool: boolean;
    released: boolean;
    _b64: string;
    _mimetype: string;
  };
  _swStreamingSupported: boolean;
  _listeningToSwSupport: boolean;
  isVcardOverMmsDocument: boolean;
  waveform: null;
}

interface Sender {
  name: string;
  shortName: string;
  pushname: string;
  telephone: string;
}
export interface IMessage {
  type: string;
  from: string;
  to: string;
  isNewMsg: string;
  hasReaction: string;
  chatId: string;
  sender: Sender;
  mediaData: MediaData;
  content: string;
}
