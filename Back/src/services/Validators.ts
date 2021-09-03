import { Message } from '../models/Message';

class Validators {
    static isMessageValid(message: Message): boolean {
        if (!message || message.text.trim() === '') {
            return false;
        }
        return true;
    }
}

export default Validators;
