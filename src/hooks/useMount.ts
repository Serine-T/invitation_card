import { useEffect } from 'react';

// eslint-disable-next-line
const useMount = (effect: () => void) => useEffect(effect, []);

export default useMount;
