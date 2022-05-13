import { useState } from 'react';

import SettingsContext from './settings-context';

const SettingsProvider = ({ children }) => {
  const [temperature, setTemperature] = useState(0.3);
  const [maxTokens, setMaxTokens] = useState(200);
  const [topP, setTopP] = useState(1);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0);
  const [presencePenalty, setPresencePenalty] = useState(0);
  const [stop, setStop] = useState([]);

  const reset = () => {
    setTemperature(0.3);
    setMaxTokens(200);
    setTopP(1);
    setFrequencyPenalty(0);
    setPresencePenalty(0);
    setStop([]);
  };

  const settingsContext = {
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
  };

  return (
    <SettingsContext.Provider value={settingsContext}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
