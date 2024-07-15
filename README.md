# MedAlert


## Med prob? Im here!

- It helps to manage patient records.
- It helps to call for emergency, talking as a real human using Twilio automation api.
- It helps to automatically allocate rules, automate alerts/notifications based on the sent ones manually, and the ones sent using AI AND MACHINE LEARNING MODEL THAT IS USED TO DETECT if the person is on a stretcher or a wheelchair, that can also help in already telling if a room is available or not, to NOT , NOT AT ALL put any delays, and that can potentially save a life.
- It also allows the people to put their medical info, that can be downloaded as csv, and used to train a model for prediction/research purposes.
- It uses Twilio API, and firebase.

<br/>

**MODEL LINK:** https://teachablemachine.withgoogle.com/models/IMbZYBBnc/

<br/>

**accuracy is less because of less dataset**.

<br/>

## try this: 

<br/>

https://medalert-app.vercel.app

<br/>

## How to run locally:

<br/>

1.) `` git clone https://github.com/0Armaan025/medalert``.

<br/>

2.) `` cd medalert ``.

<br/>

3.) open the folder in an editor or terminal, and `` npm install ``.

<br/>

4.) create ``.env.local`` file, you need to add all those env variables used with your own stuff, that includes google teachable machine learning model metadata and model url, firebase config, and twilio phone number, in ``NEXT_PUBLIC_x`` format.

<br/>

5.) ``npm run dev``.

<br/>

🥳 Lets go its ready now and running at ``http://localhost:3000``!

<br/>

Thanks!
 - Make sure to leave a ⭐
