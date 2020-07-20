import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { BackgroundContainer, Picture } from './styles';

interface PageSlideProps {
  name: string;
  direction?: string;
}

interface ImagesProps {
  background?: string;
  logoWebP?: string;
  logoPNG?: string;
}

const backgroundVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

const imageVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const loadImage = (imageName: string): Promise<string> => {
  return import(
    /* webpackChunkName: "lazy-[request]" */ `../assets/images/${imageName}`
  ).then((image) => image.default);
};

const PageSlide: React.FC<PageSlideProps> = ({ name, direction = 'left' }) => {
  const [images, setImages] = React.useState<ImagesProps>({});

  React.useEffect(() => {
    const loadImages = async (): Promise<void> => {
      const promises: Promise<string>[] = [
        loadImage(`${name}-background.jpg`),
        loadImage(`${name}-logo.webp`),
        loadImage(`${name}-logo.png`),
      ];

      const [bg, webp, png] = await Promise.all(promises);
      setImages({
        background: bg,
        logoWebP: webp,
        logoPNG: png,
      });
    };

    loadImages();
  }, [name]);

  return (
    <AnimatePresence initial exitBeforeEnter key={name}>
      <BackgroundContainer
        background={images.background}
        direction={direction}
        variants={backgroundVariants}
        transition={{
          delayChildren: 2,
          opacity: { duration: 2, ease: 'linear' },
        }}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        <Picture variants={imageVariants}>
          <source
            srcSet={images.logoWebP}
            type="image/webp"
            title={`${name} logo`}
          />
          <img src={images.logoPNG} alt={`${name} logo`} />
        </Picture>
      </BackgroundContainer>
    </AnimatePresence>
  );
};

export default PageSlide;
