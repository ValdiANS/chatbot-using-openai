import { useContext } from 'react';

import CloseIcon from '@mui/icons-material/Close';

import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';

import Modal from './Modal';
import SettingsContext from '../../store/settings-context';

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 0.1,
  },
  {
    value: 0.2,
  },
  {
    value: 0.3,
  },
  {
    value: 0.4,
  },
  {
    value: 0.5,
  },
  {
    value: 0.6,
  },
  {
    value: 0.7,
  },
  {
    value: 0.8,
  },
  {
    value: 0.9,
  },
  {
    value: 1,
    label: '1',
  },
];

const tokenMarks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 50,
  },
  {
    value: 100,
  },
  {
    value: 150,
  },
  {
    value: 200,
  },
  {
    value: 250,
  },
  {
    value: 300,
  },
  {
    value: 350,
  },
  {
    value: 400,
  },
  {
    value: 450,
  },
  {
    value: 500,
    label: '500',
  },
];

const SettingsModal = ({ showModal, onClose }) => {
  const {
    temperature,
    setTemperature,
    maxTokens,
    setMaxTokens,
    topP,
    setTopP,
    frequencyPenalty,
    setFrequencyPenalty,
    presencePenalty,
    setPresencePenalty,
    stop,
    setStop,
    reset,
  } = useContext(SettingsContext);

  const maxTokensChangeHandler = (e) => {
    setMaxTokens(e.target.value);
  };

  const temperatureChangeHandler = (e) => {
    setTemperature(e.target.value);
  };

  const topPChangeHandler = (e) => {
    setTopP(e.target.value);
  };

  const frequencyPenaltyChangeHandler = (e) => {
    setFrequencyPenalty(e.target.value);
  };

  const presencePenaltyChangeHandler = (e) => {
    setPresencePenalty(e.target.value);
  };

  const stopChangeHandler = (e) => {
    console.log(e.target.value);
    // setStop(e.target.value);
  };

  return (
    <Modal showModal={showModal} onClose={onClose}>
      <section className="bg-bgPrimary w-full h-fit max-h-full py-4 px-4 overflow-y-auto overflow-x-hidden sm:px-8">
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-bold text-xl">Settings</h1>

          <Button
            color="inherit"
            sx={{
              padding: 0,
              minWidth: 0,
            }}
            onClick={onClose}
            className="group"
          >
            <CloseIcon
              fontSize="large"
              className="hover:outline-dotted hover:outline-2"
            />
          </Button>
        </div>

        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col">
            <label>Maximum Tokens:</label>
            <Slider
              defaultValue={200}
              value={maxTokens}
              valueLabelDisplay="auto"
              step={1}
              min={0}
              max={500}
              marks={tokenMarks}
              sx={{
                width: '100%',
              }}
              onChange={maxTokensChangeHandler}
            ></Slider>
          </div>

          <div className="flex flex-col">
            <label>Temperature:</label>
            <Slider
              defaultValue={0.3}
              value={temperature}
              valueLabelDisplay="auto"
              step={0.01}
              min={0}
              max={1}
              marks={marks}
              sx={{
                width: '100%',
              }}
              onChange={temperatureChangeHandler}
            ></Slider>
          </div>

          <div className="flex flex-col">
            <label>Top P:</label>
            <Slider
              defaultValue={1}
              value={topP}
              valueLabelDisplay="auto"
              step={0.01}
              min={0}
              max={1}
              marks={marks}
              sx={{
                width: '100%',
              }}
              onChange={topPChangeHandler}
            ></Slider>
          </div>

          <div className="flex flex-col">
            <label>Frequency penalty:</label>
            <Slider
              defaultValue={0}
              value={frequencyPenalty}
              valueLabelDisplay="auto"
              step={0.01}
              min={0}
              max={1}
              marks={marks}
              sx={{
                width: '100%',
              }}
              onChange={frequencyPenaltyChangeHandler}
            ></Slider>
          </div>

          <div className="flex flex-col">
            <label>Presence penalty:</label>
            <Slider
              defaultValue={0}
              value={presencePenalty}
              valueLabelDisplay="auto"
              step={0.01}
              min={0}
              max={1}
              marks={marks}
              sx={{
                width: '100%',
              }}
              onChange={presencePenaltyChangeHandler}
            ></Slider>
          </div>
        </div>

        <div className="w-full mt-4 flex flex-row justify-end items-center gap-x-4">
          <Link
            href="https://beta.openai.com/examples"
            underline="hover"
            target="_blank"
            rel="noopener"
            className="text-lg"
          >
            Example Questions
          </Link>

          <Link
            href="https://beta.openai.com/docs/api-reference/completions/create#completions/create-max_tokens"
            underline="hover"
            target="_blank"
            rel="noopener"
            className="text-lg"
          >
            Docs
          </Link>

          <Button variant="contained" color="error" onClick={reset}>
            Reset
          </Button>
        </div>
      </section>
    </Modal>
  );
};

export default SettingsModal;
