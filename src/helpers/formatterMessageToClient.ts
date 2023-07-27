import constants from '../constants';

function formatterMessageToClient(consultantName: string, messageContent: string): string {
  const { MESSAGE_WITH_NAME_CONSULTANT_AND_CONTENT } = constants.sucess_to_whatsapp;
  return MESSAGE_WITH_NAME_CONSULTANT_AND_CONTENT.replace('{consultantName}', consultantName).replace(
    '{messageContent}',
    messageContent
  );
}

export { formatterMessageToClient };
