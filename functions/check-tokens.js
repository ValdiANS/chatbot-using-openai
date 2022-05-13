const { encode } = require('gpt-3-encoder');

exports.handler = async (event, context) => {
  const { question } = JSON.parse(event.body);

  const encodedQuestion = encode(question);

  return {
    statusCode: 200,
    body: JSON.stringify({
      tokens: encodedQuestion,
      tokensLength: encodedQuestion.length,
    }),
  };
};
