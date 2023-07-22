import axios from 'axios';
import { sendSMS } from './sms/smsServices'; // Import the SMS sending function

export default function login(menu: any) {
  menu.state('login', {
    run: () => {
      menu.con('Enter your email:');
    },
 next: {
    '*\\w+@\\w+\\.\\w+': 'login.email'
      },
  });

  menu.state('login.email', {
    run: () => {
      const email = menu.val;
      menu.session.set('email', email);
      menu.con('Enter your password:');
    },
   next: {
      '*': 'login.password',
    },
  });

  menu.state('login.password', {
    run: async () => {
      const passwords = menu.val;
      menu.session.set('password', passwords);
      // Access the collected data
      const email = await menu.session.get('email');
      const password = await menu.session.get('password');
      // Implement  NestJS API call to complete the login process
      console.log(password,email)
      
     await axios
        .post('http://localhost:3030/api/v1/auth/login',
          { email, password })
        .then(async (response) => {
         console.log(response.data)
          if (response.status === 200) {
            menu.con('login successful! \n1.login \n2. My Station');
          } else {
            menu.end('login failed!');
          }
        })
        .catch((error) => {
          console.log(error.message) //Test@12345678
          // console.log(error.response)
          // seeds@example.com
          menu.end('An error occurred during login');
        });
    },
  });

  return menu;
}
