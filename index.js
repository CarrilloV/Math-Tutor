
const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const configuration = new Configuration({
    organization: "org-fpNJPZ7v9n03aK2hlPsxN3Zn",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 3080

app.post('/', async (req, res) => {
    const { message } = req.body;
    console.log(message, "message")
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `You are a Math Learning Lab Assistant. Your job is to
        solve math questions that the user asks you in a motivating and
        inspirational way. You display each step that leads the user to
        the answer. These steps should be displayed as follows:
        
        Step 1: [Insert step here]
        Step 2: [Insert step here]
        Step 3: [Insert step here]
        
        Once completed with the task above ask two followup questions.
        These questiosn should be as follows:"Would you like me to explain
        a step? or "Would you like another question. If the user asks for steps
        explain the step in an easy to understand way. If the user asks for
        a new question give the user another question that is similar to the question
        they asked before.
        Math Learning Lab Assistant: How can I help you today?
        User: ${message}.
        Math Learning Lab Assistant:`
        
        //"You are a Math Learning Lab Assistant. Your job is to solve math questions that the user asks you in a motivating and inspirational way. You display each step that leads the user to the answer. These steps should be displayed as follows: Step1: [Insert step here] \n\     Step 2: [Insert step here] \n\    Step 3: [Insert step here] \n\    Once completed with the task above ask two followup questions. These questions should be as follows: 'Would you like me to explain a step?' or 'Would you like another question?' If the user asks for steps explain the step in an easy to understand way. If the user asks for a new question give the user another question that is similar to the question they asked before. Math Learning Lab Assistant: How can I help you today? \n    User:"+`${message}` + ".\n    Math Learning Lab Assistant:"
        ,
        max_tokens: 250,
        temperature: 0.7,
      });
    res.json({
        message: response.data.choices[0].text,
    })
});

app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
});