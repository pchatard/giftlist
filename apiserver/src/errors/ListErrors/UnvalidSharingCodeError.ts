import APIError from '../APIError';

class UnvalidSharingCodeError extends APIError {
    constructor() {
        super('UnvalidSharingCodeError', 'Code de partage invalide');
    }
}

export default UnvalidSharingCodeError;
