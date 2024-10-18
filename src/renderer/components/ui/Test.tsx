// src/renderer/App.tsx
import { useState, useEffect } from 'react';

const Test = () => {
  const [data, setData] = useState<string | null>(null);

  const saveData = async () => {
    await window.electronStore.set('myKey', 'Changed string value!');
    console.log('Data saved!');
  };

  const loadData = async () => {
    const value = await window.electronStore.get('myKey');
    setData(value);
  };

  useEffect(() => {
    loadData(); // Load data when the component mounts
  }, []);

  return (
    <div>
      <h1>Electron Store Example</h1>
      <button
        onClick={saveData}
        className="bg-green-500 text-white text-lg px-2 py-2 rounded-md mx-2"
      >
        Save Data
      </button>
      <button
        onClick={loadData}
        className="bg-green-500 text-white text-lg px-2 py-2 rounded-md mx-2"
      >
        Load Data
      </button>
      <p>Stored Value: {data}</p>
    </div>
  );
};

export { Test };
