import { useState, useEffect } from 'react';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 800);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

export const shortAddress = (address) => {
  return address.slice(0, 6) + '...' + address.slice(-4)
}

export const getButtImageUrl = (buttId) => {
  return `https://lazybutts.s3.amazonaws.com/public/images/silhouettes/${buttId}.png`
}