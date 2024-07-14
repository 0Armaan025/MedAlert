const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = 3001; // or any port you prefer

// Twilio credentials
const accountSid = 'your_twilio_account_sid';
const authToken = 'your_twilio_auth_token';
const twilioNumber = 'your_twilio_phone_number';

const client = twilio(accountSid, authToken);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Endpoint to make an emergency call
app.post('/makeEmergencyCall', async (req, res) => {
  try {
    const { to } = req.body; // phone number to call

    const call = await client.calls.create({
      url: 'http://demo.twilio.com/docs/voice.xml', // URL that Twilio will call
      to,
      from: twilioNumber,
    });

    console.log(call.sid); // Log the call SID for reference
    res.status(200).json({ message: 'Call initiated successfully.' });
  } catch (error) {
    console.error('Error making Twilio call:', error);
    res.status(500).json({ error: 'Error making Twilio call.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
