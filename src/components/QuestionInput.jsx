import { useEffect, useState } from 'react';

import CachedIcon from '@mui/icons-material/Cached';

const checkTokens = async (question = '') => {
  const response = await fetch('/.netlify/functions/check-tokens', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      question,
    }),
  });
  const data = await response.json();

  return data;
};

const QuestionInput = ({ className, onSubmitQuestion }) => {
  const [questionValue, setQuestionValue] = useState('');
  const [questionTokens, setQuestionTokens] = useState(0);

  const [isTokensLoading, setIsTokensLoading] = useState(false);

  const textareaRows =
    questionValue.split('\n').length > 5 ? 5 : questionValue.split('\n').length;

  const textareaChangeHandler = (e) => {
    setQuestionValue(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (questionValue.length === 0) {
      return;
    }

    // console.log(JSON.stringify(questionValue));

    onSubmitQuestion(questionValue);

    setQuestionValue('');
  };

  useEffect(() => {
    setIsTokensLoading(true);

    const timer = setTimeout(async () => {
      const checkQuestionTokens = await checkTokens(questionValue);

      setQuestionTokens(checkQuestionTokens.tokensLength);
      setIsTokensLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [questionValue]);

  return (
    <div className={className}>
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-y-4 items-end xs:flex-row xs:gap-x-4"
      >
        <div className="w-full flex flex-col">
          <div className="flex flex-row justify-between items-end">
            <label htmlFor="questionTextarea" className="text-lg font-bold">
              Question Input
            </label>

            <small className="text-gray-500">
              {!isTokensLoading && `${questionTokens} `}
              {isTokensLoading && (
                <CachedIcon
                  sx={{
                    height: '1rem',
                  }}
                  className="animate-spin"
                />
              )}
              character tokens
            </small>
          </div>

          <textarea
            id="questionTextarea"
            placeholder="Type a question"
            rows={textareaRows}
            value={questionValue}
            onChange={textareaChangeHandler}
            className="w-full py-2 border-b-2 border-solid border-black bg-transparent resize-none placeholder:text-base focus:outline-none"
          ></textarea>
        </div>

        <button className="h-fit w-full bg-sky-200 px-4 py-2 self-end font-medium xs:w-fit">
          send
        </button>
      </form>
    </div>
  );
};

export default QuestionInput;
