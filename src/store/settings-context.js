import { createContext } from 'react';

const SettingsContext = createContext({
  temperature: 0.3,
  setTemperature: (temperature = 0) => {},
  maxTokens: 200,
  setMaxTokens: (token = 0) => {},
  topP: 1.0,
  setTopP: (topP = 0) => {},
  frequencyPenalty: 0.0,
  setFrequencyPenalty: (frequencyPenalty = 0) => {},
  presencePenalty: 0.0,
  setPresencePenalty: (presencePenalty = 0) => {},
  stop: [],
  setStop: (prevStop = []) => {},
  reset: () => {},
});

export default SettingsContext;
