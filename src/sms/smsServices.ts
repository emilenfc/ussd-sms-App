// smsService.ts
import { Client } from 'africastalking-ts';
import dotenv from 'dotenv';
import axios from 'axios';


dotenv.config();

const apiKey = process.env.API_KEY
const username = process.env.USER_NAME
console.log(username, apiKey)
if (!apiKey || !username) {
  throw new Error("invalid env data")
}
    
const africasTalking = new Client({
  apiKey:apiKey,
  username:username,
});
// smsService.ts

dotenv.config();
export async function sendSMS(phoneNumber: string, message: string): Promise<void> {
  try {
    await africasTalking.sendSms({
      from:process.env.ALPHANUMERIC,
      to: [phoneNumber], // Your user's phone number
      message: message, // The message to send
    });
    console.log('Message sent successfully');
  } catch (error) {
    console.error('Error sending message:', error);
  }
}