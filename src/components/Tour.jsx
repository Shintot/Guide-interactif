import React, { createContext, useContext, useEffect, useState } from 'react';
import Joyride from 'react-joyride';

const HelpContext = createContext();

export const HelpStep = ({ target, children, childIndex = 0 }) => {
  let childrenArray = React.Children.toArray(children);

  if (childIndex >= 0 && childIndex < childrenArray.length) {
    childrenArray[childIndex] = React.cloneElement(childrenArray[childIndex], {
      className: `${childrenArray[childIndex].props.className ? childrenArray[childIndex].props.className + ' ' : ''}${target}`,
    });
  }

  return <>{childrenArray}</>;
};

export const Help = ({ children, steps }) => {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [tourSteps, setTourSteps] = useState(steps || []);
  const [restartKey, setRestartKey] = useState(0);

  useEffect(() => {
    setTourSteps(steps);
  }, [steps]);

  const startTour = () => {
    setRun(true);
    setStepIndex(0);
    setRestartKey(prev => prev + 1);
  };

  const stopTour = () => {
    setRun(false);
    setStepIndex(0);
    setRestartKey(prev => prev + 1);
  };

  const joyrideStyles = {
    options: { zIndex: 90000, primaryColor: '#007bff', textColor: '#004085' },
    tooltipContainer: { textAlign: 'left' },
    tooltipContent: { maxHeight: '150px', overflowY: 'auto', backgroundColor: 'rgba(171,171,171,0.13)' },
    buttonClose: { display: 'none' },
  };

  const locale = { last: "Terminer", skip: "Terminer", next: "Suivant", back: "Retour" };

  const handleJoyrideCallback = ({ action, index, type }) => {
    if (type === 'step:after') {
      setStepIndex(action === 'next' ? index + 1 : Math.max(index - 1, 0));
    } else if (type === 'tour:end' || type === 'tour:stop' || type === 'tour:skip') {
      stopTour();
    }
  };

  const contextValue = { startTour, stopTour, stepIndex, restartKey };

  return (
    <HelpContext.Provider value={contextValue}>
      <Joyride
        steps={tourSteps}
        run={run}
        stepIndex={stepIndex}
        callback={handleJoyrideCallback}
        showProgress={true}
        showSkipButton={true}
        continuous={true}
        styles={joyrideStyles}
        showCloseButton={false}
        restartKey={restartKey}
        locale={locale}
      />
      {children}
    </HelpContext.Provider>
  );
};

export const useHelp = () => useContext(HelpContext);

export const HelpTrigger = ({ children }) => {
  const { startTour } = useHelp();
  return <button onClick={startTour}>{children}</button>;
};
