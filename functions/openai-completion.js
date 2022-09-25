require('dotenv').config();

const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.handler = async (event, context) => {
  const { question, completionSettings } = JSON.parse(event.body);

  const {
    temperature,
    maxTokens,
    topP,
    frequencyPenalty,
    presencePenalty,
    stop,
  } = completionSettings || {};

  const openaiResponse = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: question,
    temperature: temperature || 0.3,
    max_tokens: maxTokens || 200,
    top_p: topP || 1.0,
    frequency_penalty: frequencyPenalty || 0.0,
    presence_penalty: presencePenalty || 0.0,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      completionResponse: openaiResponse.data.choices[0].text.trim(),
    }),
  };
};
