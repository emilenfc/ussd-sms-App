import express,{Application,Request,Response} from 'express';
import { Client } from 'africastalking-ts';
import dotenv from 'dotenv'
import { handleUSSD } from './ussd';


dotenv.config();


const africasTalking = new Client({
    apiKey:"efd658bcd1d1eff7fe5f677a6bd0da68267de5aec44da66a056cd501121ca95a",
    username:"sandbox"
});

const app:Application = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// app.get('/send-a-message', async (req:Request, res:Response) => {
//     try{
//         await africasTalking.sendSms({
//             to:["+250783544364"], // Your phone number
//             message:"Hello, We are on sandbox", // Your message
//             from:process.env.ALPHANUMERIC // Your shortcode or alphanumeric
//         });
//         return res.status(200).json({message:"Well done message sent"}); // Success message
//     }catch(error){
//         return res.status(500).json({message:"An error occurred"}); // Error message
//     }
// })

// app.post('/incoming-messages', (req:Request,res:Response) => {
//     const data = req.body;
//     console.log(`Received message \n`,data);
//     res.sendStatus(200);
// });

// Handle the USSD endpoint
app.post('/ussd', handleUSSD);

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})