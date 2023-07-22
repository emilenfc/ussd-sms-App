import axios from 'axios';

export default function signup(menu:any) {
  menu.state('signup', {
    run: () => {
      menu.con('Enter your first name:');
    },
       next: {
    '*[a-zA-Z]+': 'signup.firstName'
  },
  });

  menu.state('signup.firstName', {
    run: () => {
      const firstName = menu.val;
      menu.session.set('firstName', firstName);
      menu.con('Enter your last name:');
    },
    next: {
    '*[a-zA-Z]+': 'signup.lastname'
  },  });

  menu.state('signup.lastname', {
    run: () => {
      const lastName = menu.val;
      menu.session.set('lastName', lastName);
      menu.con('Enter your email:');
    },
  next: {
    '*\\w+@\\w+\\.\\w+': 'signup.email'
  },  });

  menu.state('signup.email', {
    run: () => {
      const email = menu.val;
      menu.session.set('email', email);
      menu.con('Enter your password:');
    },
   next: {
    '*[a-zA-Z]+': 'signup.password'
      },
  });

  menu.state('signup.password', {
    run: () => {
      const password = menu.val;
      menu.session.set('password', password);
      menu.con('Enter your ID number:');
    },
     next: {
    '*\\d+': 'signup.address'
      },
  });

  menu.state('signup.address', {
    run: async() => {
      const address_ = menu.val;
      menu.session.set('address', address_);
      // Access the collected data
      const firstName = await menu.session.get('firstName');
      const lastName = await menu.session.get('lastName');
      const email = await menu.session.get('email');
      const password = "Test@123"
      const address = "3443434,43434";
      const confirm = "Test@123"
      const phone="+250783544364"
      const dateOfBirth="02-12-2333"

      // Implement NestJS API call to complete the account creation process here

     await axios
        .post('http://localhost:3030/api/v1/auth/signup',
          { email, password, lastName, firstName,confirm,address,phone,dateOfBirth })
        .then((response) => {
         console.log(response)
          if (response.status === 201) {
            menu.con('Signup successful!\n1. login');
          } else {
            menu.end('Signup failed!');
          }
        })
        .catch((error) => {
         console.log(error)
          menu.end('An error occurred during signup');
        });    },
  });

  return menu;
}
