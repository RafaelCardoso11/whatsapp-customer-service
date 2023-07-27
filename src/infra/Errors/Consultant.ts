import constants from '../../constants';

const {
  error: {
    consultant: {
      FAILED_TO_CREATE_CONSULTANT,
      FAILED_TO_UPDATED_CONSULTANT,
      FAILED_TO_UPDATED_CLIENT_CURRENT,
      NO_AVAILABLE_CONSULTANT,
      FAILED_TO_FIND_BY_ID,
      FAILED_TO_FIND_BY_TELEPHONE,
      FAILED_TO_FIND_BY_ID_CLIENT,
      FAILED_TO_GET_ALL,
    },
  },
} = constants;

export class ConsultantCreationError extends Error {
  constructor(error?: string) {
    super(FAILED_TO_CREATE_CONSULTANT + error);
    this.name = 'ConsultantCreationError';
  }
}

export class ConsultantUpdateError extends Error {
  constructor(error?: string) {
    super(FAILED_TO_UPDATED_CONSULTANT + error);
    this.name = 'ConsultantUpdateError';
  }
}
export class ConsultantUpdateClientCurrentError extends Error {
  constructor(error?: string) {
    super(FAILED_TO_UPDATED_CLIENT_CURRENT + error);
    this.name = 'ConsultantUpdateClientCurrentError';
  }
}
export class ConsultantFindByIdError extends Error {
  constructor(error?: string) {
    super(FAILED_TO_FIND_BY_ID + error + error);
    this.name = 'ConsultantFindByIdError';
  }
}
export class ConsultantFindByIdClientError extends Error {
  constructor(error?: string) {
    super(FAILED_TO_FIND_BY_ID_CLIENT + error);
    this.name = 'ConsultantFindByIdClientError';
  }
}
export class ConsultantFindByTelephoneError extends Error {
  constructor(error?: string) {
    super(FAILED_TO_FIND_BY_TELEPHONE + error);
    this.name = 'ConsultantFindByTelephoneError';
  }
}
export class ConsultantFindByTelephoneClientError extends Error {
  constructor(error?: string) {
    super(FAILED_TO_UPDATED_CONSULTANT + error);
    this.name = 'ConsultantFindByTelephoneClientError';
  }
}
export class ConsultantFindConsultantAvaiableError extends Error {
  constructor(error?: string) {
    super(NO_AVAILABLE_CONSULTANT + error);
    this.name = 'ConsultantFindConsultantAvaiableError';
  }
}
export class ConsultantGetAllError extends Error {
  constructor(error?: string) {
    super(FAILED_TO_GET_ALL + error);
    this.name = 'ConsultantGetAllError';
  }
}
