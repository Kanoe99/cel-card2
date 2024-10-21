import React, { useState, useEffect } from 'react';
import { Menu } from './ui/Menu';
import { Header } from './ui/Header';
import { Picture } from './ui/Picture';
import { Test } from './ui/Test';

const Main = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [pickedFormat, setPickedFormat] = useState<string | null>(null);
  const [pickedCel, setPickedCel] = useState<string | null>(null);

  const [formats, setFormats] = useState(
    () => window.electron.store.get('formats') || [],
  );

  const cards = ['Новый Год', '8 Марта', '23 Февраля'];

  function handleIsPickedFormat(item: string) {
    setPickedFormat(item === pickedFormat ? null : item);
  }

  function handleIsPickedCel(item: string) {
    setPickedCel(item === pickedCel ? null : item);
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImageSrc(e.target?.result as string);
      reader.readAsDataURL(file);
    }
    event.target.value = '';
  };

  const handleSave = () => {
    if (imageSrc) {
      console.log('Saving image:', imageSrc);
    }
  };

  const handleDelete = () => {
    setImageSrc(null);
  };

  const handlePrint = () => {
    window.print();
  };

  // Hook to listen for Ctrl + P and trigger handlePrint
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'p') {
        event.preventDefault(); // Prevent browser's default print dialog
        handlePrint();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <main className="h-screen overflow-auto">
      <Header
        handleFileChange={handleFileChange}
        handleSave={handleSave}
        handleDelete={handleDelete}
        handlePrint={handlePrint}
      />
      <button
        className="bg-red-500"
        onClick={() => {
          // Retrieve existing formats
          const existingFormats = window.electron.store.get('formats') || [];

          // Add a new format
          const newFormat = { key: 'A8' };
          existingFormats.push(newFormat);

          // Store the updated formats array
          window.electron.store.set('formats', existingFormats);

          // Log the updated formats to check
          console.log(window.electron.store.get('formats'));
        }}
      >
        Click Me!
      </button>

      <section className="flex px-14 justify-between py-12 h-fit gap-20">
        <Menu
          formats={formats}
          cards={cards}
          isPickedCel={pickedCel}
          isPickedFormat={pickedFormat}
          handleIsPickedFormat={handleIsPickedFormat}
          handleIsPickedCel={handleIsPickedCel}
        />
        <Picture imageSrc={imageSrc} cel={pickedCel} />
      </section>
      <Test />
    </main>
  );
};

export { Main };
