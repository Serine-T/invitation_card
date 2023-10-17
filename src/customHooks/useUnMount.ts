/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

const useUnMount = (effect: () => void) => useEffect(() => {
  return effect;
}, []);

export default useUnMount;
