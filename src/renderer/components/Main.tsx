import React, { useState, useEffect } from 'react';
import { Menu } from './ui/Menu';
import { Header } from './ui/Header';
import { Picture } from './ui/Picture';

const Main = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [pickedFormat, setPickedFormat] = useState<string | null>(
    window.electron.store.get('formats')[0].key,
  );
  const [isPickedCard, setIsPickedCard] = useState<string | null>(null);

  const [formats, setFormats] = useState(
    () => window.electron.store.get('formats') || [],
  );
  const [cards, setCards] = useState(
    () => window.electron.store.get('cards') || [],
  );

  const cardText =
    isPickedCard &&
    cards.filter(
      (card: { key: string; value: string }) => card.key === isPickedCard,
    )[0].value;

  function handleIsPickedFormat(item: string) {
    setPickedFormat(item === pickedFormat ? null : item);
  }

  function handleIsPickedCard(item: string) {
    setIsPickedCard(item === isPickedCard ? null : item);
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
          cards={cards}
          isPickedCard={isPickedCard}
          isPickedFormat={pickedFormat}
          handleIsPickedFormat={handleIsPickedFormat}
          handleIsPickedCard={handleIsPickedCard}
        />
        <Picture imageSrc={imageSrc} card={cardText} />
      </section>
    </main>
  );
};

export { Main };
