import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import SettingsIcon from '@mui/icons-material/Settings';

import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import Grow from '@mui/material/Grow';

import SettingsContext from './store/settings-context';
import Message from './components/Message';
import QuestionInput from './components/QuestionInput';
import SettingsModal from './components/Modal/SettingsModal';

const fetchCompletion = async (
  question = '',
  completionSettings = {
    temperature: 0.3,
    maxTokens: 200,
    topP: 1.0,
    frequencyPenalty: 0.0,
    presencePenalty: 0.0,
    stop: [],
  }
) => {
  const response = await fetch('/.netlify/functions/openai-completion', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      question,
      completionSettings,
    }),
  });
  const data = await response.json();

  return data;
};

const App = () => {
  const settingsCtx = useContext(SettingsContext);
  const [dummyData, setDummyData] = useState([]);

  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const chatContainer = useRef();

  const showModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const submitQuestionHandler = async (question) => {
    setDummyData((prevData) => [
      ...prevData,
      { type: 'question', msg: question },
    ]);

    try {
      const answer = await fetchCompletion(question, {
        temperature: settingsCtx.temperature,
        maxTokens: settingsCtx.maxTokens,
        topP: settingsCtx.topP,
        frequencyPenalty: settingsCtx.frequencyPenalty,
        presencePenalty: settingsCtx.presencePenalty,
        stop: settingsCtx.stop,
      });

      setDummyData((prevData) => [
        ...prevData,
        { type: 'answer', msg: answer.completionResponse },
      ]);
    } catch (error) {
      console.log(error);
      console.log(error.message);

      setShowAlert(true);
    }

    // console.log(answer);
  };

  useEffect(() => {
    chatContainer.current.scrollTo(0, chatContainer.current.scrollHeight);
  }, [dummyData]);

  return (
    <Fragment>
      {showAlert &&
        createPortal(
          <Grow in={showAlert}>
            <Alert
              variant='filled'
              severity='error'
              onClose={() => {
                setShowAlert(false);
              }}
            >
              Something went wrong...
            </Alert>
          </Grow>,

          document.querySelector('#alert')
        )}

      <SettingsModal showModal={showModal} onClose={closeModalHandler} />

      <div className='max-w-screen-lg mx-auto p-4 pt-2 flex flex-col justify-between h-screen overflow-y-hidden xs:p-8'>
        <div className='flex flex-row justify-center items-center gap-x-4'>
          <h1 className='font-bold text-2xl'>Chat With OpenAI</h1>
          <Button
            onClick={showModalHandler}
            color='inherit'
            sx={{
              padding: 0,
              minWidth: 0,
            }}
            className='group'
          >
            <SettingsIcon
              fontSize='large'
              className='group-hover:outline-2 group-hover:outline-dotted '
            />
          </Button>
        </div>

        <div className='h-full pb-8 flex flex-col justify-start gap-y-4'>
          <div
            ref={chatContainer}
            className='h-full max-h-[70vh] w-full space-y-4 overflow-y-auto py-4'
          >
            <Message type='answer' msg='Hi!' nolabel />

            {dummyData.map((data, idx) => (
              <Message key={idx + 1} type={data.type} msg={data.msg} />
            ))}
          </div>

          <QuestionInput onSubmitQuestion={submitQuestionHandler} />
        </div>
      </div>
    </Fragment>
  );
};

export default App;
