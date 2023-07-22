import UssdMenu from 'ussd-menu-builder';
import _ from 'lodash';
import sessionConfig from '../utils/sessionConfig';
import login from './login';
import signup from './signUp';
import { Request, Response } from 'express';
import { sendSMS } from './sms/smsServices';


// Create a new instance of the UssdMenu
const menu = new UssdMenu();
menu.sessionConfig(sessionConfig)
// Register USSD menu states and handlers
menu.startState({
  run: () => {
    menu.con('Welcome to your USSD application.\n1. Create an account\n2. Sign in');
    },
       next: {
        '1': 'signup',
        '2': 'login' 
      },
    defaultNext: "invalidOption",
  });

  menu.state("invalidOption", {
    run: () => {
      menu.end(`Invalid option`);
    },
  });
  
 _.over([signup,login])(menu)

async function handleUSSD(req: Request, res: Response) {
  // Process the USSD request
  menu.run(req.body, async (ussdResult: any) => {
    console.log(req.body);
    // Send the USSD response
    res.send(ussdResult);
    const userPhoneNumber = req.body.phoneNumber; // Get the user's phone number from the request body
    if (ussdResult.includes('login successful')) {
      await sendSMS(userPhoneNumber, 'Login successful!'); // Use the user's phone number from the parameter
    }
  });
}


export { handleUSSD };
