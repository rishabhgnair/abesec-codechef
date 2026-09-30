import { useState, useEffect } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
];

export default function useKonamiCode(onSuccess) {
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

      setKeys((prevKeys) => {
        const nextKeys = [...prevKeys, key].slice(-KONAMI_CODE.length);

        const match = nextKeys.every(
          (k, idx) => k.toLowerCase() === KONAMI_CODE[idx].toLowerCase()
        );

        if (match && onSuccess) {
          onSuccess();
          return [];
        }

        return nextKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSuccess]);
}
