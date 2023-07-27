import constants from '../../constants';

const {
  sender: { FAILED_TO_SENDER_MESSAGE },
} = constants.error;

export class SendMessageError extends Error {
  constructor(error: string) {
    super(FAILED_TO_SENDER_MESSAGE + error);
    this.name = 'SendMessageError';
  }
}
