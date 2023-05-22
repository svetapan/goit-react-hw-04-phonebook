import {useState, useEffect} from 'react';

export const useLocalStorage = (key, initialState) => {
  const [state, setState] = useState(() => JSON.parse(localStorage.getItem(key)) ?? initialState);
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState]
}

