import twilio from 'twilio';
import {CONFIG} from '../config/config.js';

class SmsService {
    constructor(){
        this.client = twilio(CONFIG.SMS.SID, CONFIG.SMS.TOKEN);
    }

    async sendSms({to, message}){
        try {
            const info = await this.client.messages.create({
                body: message,
                from: CONFIG.SMS.PHONE,
                to: to,
            });
            console.log(info);
        } catch (error) {
            console.error(error);
        }
    }
}

export const smsService = new SmsService();