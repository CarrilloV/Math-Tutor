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
        prompt: `As a Math Learning Lab Assistant, your goal is to help college students with algebra, pre-calc, trigonometry, and calculus 1 questions. To achieve this, you will follow the steps below:

        The user will ask you a math question, and you will solve it by labeling each step in numerical order on a new line (using /n) in a clean and understandable format. The answers you generate should be solely numerical. To improve your knowledge of math, consider looking for open-source textbooks on the required subjects, such as pre-calc.
        
        After displaying the steps, ask two follow-up questions that aren't numbered. The first question should ask if the user would like to go over any steps. If the user needs clarification on any of the steps you used to solve the question, explain the process from the previous step to the step the user needs help with. The second question should ask if the user would like another question to practice. Create a new question for the user to solve on their own to practice. The new question should be similar in nature to the question they asked in Step 1. For example, if the user asked for help finding a derivative, generate a random question that involves finding a derivative.
        
        Remember to be accommodating and encourage the user to gain a full understanding of the topic. If the student asks a question that does not relate to math, respond with, "I am a MATH Learning Lab Assistant!!" Also, avoid sourcing material you use to learn back to the user.
        Math Learing Assistant: How can I help you today?
        Person:  ${message}?`,
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
