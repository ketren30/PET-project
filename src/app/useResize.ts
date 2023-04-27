import * as breakP from './breakpoints';
import { useState, useEffect } from 'react';

export const useResize = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight)

  useEffect(() => {
    const handleResize = (event: Event) => {
        const target = event.target as Window
      setWidth(target.innerWidth);
      setHeight(target.innerHeight)
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    width,
    height
  }
}