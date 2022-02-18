require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const { TOKEN, SERVER_URL } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;
const WEBHOOK_URL = SERVER_URL + URI;

var username, password;
var authentication;

// var users = [{
//     username, password,authentication
// }]
// var i;

const app = express();
app.use(bodyParser.json());

const init = async () => {
  const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
  console.log(res.data);
};

app.post(URI, async (req, res) => {
  console.log(req.body);
    const chatId = req.body.message.chat.id;
  var text = req.body.message.text;
  if (text =='/register') {
    text = 'Registering on Ethiojobs is free and easy. Simply scroll to the top of our homepage and click on the “Register” button. During the registration process you will be requested to provide some information about yourself. Eg. Name, email address, country of residence, etc. Without a valid email address, it will not be possible to register on the Ethiojobs site since your email address is used as an account number with us. You will also be required to create a password for yourself. The email address you use to create your Ethiojobs account and its related password are important to remember, as you will require both, to login to your account and access our members’ section. Registering for an Ethiojobs account enables you: · to create or upload an existing CV making it easy for potential employers to find you; · create alerts for the type of job you want and receive information delivered to your via email, facebook or twitter when the job of your choice becomes available;';
  }
  else if (text == "/forgotpassword") {
    text = 'Can’t remember your password? Need another one? Don’t worry. Resetting your password is a very simple process. On the homepage, click on “Login” which will redirect you to the login box. From there, click on the “Forgot Password?” You will be once again redirected to a password recovery page, which will require you to enter the email address you used to register at Ethiojobs. You will receive an email to the same address instructing you how to reset your password. However, please be aware that we can only send a password reminder to you if you have previously registered an email address and password with us.';
  }
  else if (text == "/searchjobs") {
    text =
      "To search for jobs all you have to do is simply type in the job you want in the search bar located at the top of the webpage. Alternatively, if you want a more refined search you can browse the different catagories of jobs (Accounting and Finance jobs, Advertising and Media jobs…) located just below the search bar.";
  } else if (text == "/guestalert") {
    text =
      "The guest alert service allow you to get job alerts without registering on Ethiojobs.net. To get this service, while searching for jobs you will get a blue icon that reads “email me jobs like this” click on it and subscribe for the service. . Do remember that to apply for most jobs you will have to register on Ethiojobs.net.";
  } else {
    text = "/register -  How do i register on EthioJobs?\n/forgotpassword - I have forgotten my password. How can i access my account?\n/searchjobs - How do i search for jobs?\n/guestalert - What is Guest Alert ?";
  }
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: text,
    });
  res.send();

  // return res.send("Sorry! the bot is still in development")
});

app.listen(process.env.PORT || 5000, async () => {
  console.log("App running on port", process.env.PORT || 5000);
  await init();
});

//console.log("Hey node is running")
