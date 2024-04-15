const jsonfile = require('jsonfile');
const { writeFile } = require('fs');
const OpenAI = require("openai");
const path = './config.json';
const newPath = './storyResult.json'
const data = {
    desiredString: "Write the text for a picture book for a 6 year old child. \n        Make the story a story that quentin blake.\n         Write it in the style of funny.\n         Include a boy called albert and a avocado.\n         Set the story in playground"
}
const openai = new OpenAI();

async function callChat(data) {

    const completion = await openai.chat.completions.create( {
        messages: [
            {
                "role": "system",
                "content": "You are a children's story writer"
            },
            {
                "role": "user",
                "content": data.desiredString
            },
        ],
        model: "gpt-3.5-turbo",
        temperature: 1,
        max_tokens: 200,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    completion.choices[0].message.content
    console.log(completion.choices[0]);
}

callChat(data);