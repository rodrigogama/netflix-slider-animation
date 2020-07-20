import React from 'react';
import PageSlide from './components/PageSlide';

const slides: string[] = [
  'dark',
  'money-heist',
  'rick-morty',
  'stranger-things',
  'witcher',
];

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = React.useState({
    index: 0,
    direction: 'left',
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      const summedUpCurrent = currentSlide.index + 1;
      const nextIndex =
        summedUpCurrent > slides.length - 1 ? 0 : summedUpCurrent;
      const direction = currentSlide.direction === 'left' ? 'right' : 'left';

      setCurrentSlide({ index: nextIndex, direction });
    }, 8000);

    return () => {
      clearInterval(interval);
    };
  }, [currentSlide]);

  return (
    <PageSlide
      name={slides[currentSlide.index]}
      direction={currentSlide.direction}
    />
  );
};

export default App;
