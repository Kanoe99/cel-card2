import React, { useState, useEffect } from 'react';
import { Menu } from './ui/Menu';
import { Header } from './ui/Header';
import { Picture } from './ui/Picture';

const Main = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isPickedFormat, setPickedFormat] = useState<string | null>('A5');
  const [isPickedCard, setPickedCard] = useState<string | null>(null);

  const [formats, setFormats] = useState(
    () => window.electron.store.get('formats') || [],
  );
  const [celebrations, setCelebrations] = useState(
    () => window.electron.store.get('celebrations') || [],
  );

  console.log(isPickedCard);
  console.log(
    celebrations.filter(
      (cel: { key: string; value: string }) => cel.key === isPickedCard,
    )[0],
  );

  function handleIsPickedFormat(item: string) {
    setPickedFormat(item === isPickedFormat ? null : item);
  }

  function handleIsPickedCard(item: string) {
    setPickedCard(item === isPickedCard ? null : item);
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
    window.electron.ipcRenderer.sendMessage('print-content', {
      content: `
        <div style="text-align: center; width: 1000px !important;">
          ${imageSrc ? `<img src="${imageSrc}" alt="Image Preview" />` : ''}
        </div>
      `,
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'p') {
        event.preventDefault();
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
      <section className="flex px-14 justify-between py-12 h-fit gap-20">
        <Menu
          formats={formats}
          cards={celebrations}
          isPickedCard={isPickedCard}
          isPickedFormat={isPickedFormat}
          handleIsPickedFormat={handleIsPickedFormat}
          handleIsPickedCard={handleIsPickedCard}
        />
        <Picture
          className="print-area"
          imageSrc={imageSrc}
          cel={
            celebrations.filter(
              (cel: { key: string; value: string }) => cel.key === isPickedCard,
            )[0]
          }
        />
      </section>
    </main>
  );
};

export { Main };
