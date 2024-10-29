import { useState, useRef } from 'react';
import { Menu } from './ui/Menu';
import { Header } from './ui/Header';
import {
  handleIsPickedItem,
  handleFileChange,
  handleSave,
  handleDelete,
  handlePrint,
} from '../utils/handlers';
import { Canvas } from './canvas/Canvas';

const Main = () => {
  const [fontSize, setFontSize] = useState<string>('30px');
  const [fontFamily, setFontFamily] = useState<string>('Arial');

  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [fileName, setFileName] = useState<string | undefined>(undefined);

  const [isPickedFormat, setIsPickedFormat] = useState<string | null>(
    window.electron.store.get('formats')[0].key,
  );
  const [isPickedCard, setIsPickedCard] = useState<string | null>(null);

  const [formats, setFormats] = useState(
    () => window.electron.store.get('formats') || [],
  );
  const [cards, setCards] = useState(
    () => window.electron.store.get('cards') || [],
  );

  const stageRef = useRef(null);

  const cardText =
    isPickedCard &&
    cards.filter(
      (card: { key: string; value: string }) => card.key === isPickedCard,
    )[0].value;

  return (
    <main className="h-screen overflow-auto">
      <Header
        handleFileChange={(event) =>
          handleFileChange(event, setImageSrc, setFileName)
        }
        handleSave={() =>
          handleSave({ uri: imageSrc, fileName: fileName, stageRef: stageRef })
        }
        handleDelete={() => handleDelete(setImageSrc)}
        handlePrint={handlePrint}
      />
      <section className="flex px-14 justify-between py-12 h-fit gap-20">
        <Menu
          formats={formats}
          cards={cards}
          isPickedCard={isPickedCard}
          isPickedFormat={isPickedFormat}
          handleIsPickedFormat={(item) =>
            setIsPickedFormat(
              handleIsPickedItem({ isPickedItem: isPickedFormat, item: item }),
            )
          }
          handleIsPickedCard={(item) =>
            setIsPickedCard(
              handleIsPickedItem({ isPickedItem: isPickedCard, item: item }),
            )
          }
        />
        <Canvas cardText={cardText} imageSrc={imageSrc} stageRef={stageRef} />
      </section>
    </main>
  );
};

export { Main };
