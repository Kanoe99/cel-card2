import { Frame } from './Frame';
import { Card } from './Card';

interface Format {
  key: string;
}

interface MenuProps {
  formats: Format[];
  cards: string[];
  isPickedCel: string | null;
  isPickedFormat: string | null;
  handleIsPickedFormat: (format: string) => void;
  handleIsPickedCel: (card: string) => void;
}

const Menu: React.FC<MenuProps> = ({
  formats,
  cards,
  isPickedCel,
  isPickedFormat,
  handleIsPickedFormat,
  handleIsPickedCel,
}) => {
  return (
    <div className="h-fit flex flex-1 flex-col gap-10 text-lg font-medium shadow px-10 py-5">
      <h2 className="border-b px-2">Выберите формат</h2>
      <div className="flex justify-start gap-10">
        {formats.map((format) => (
          <Frame
            key={format.key}
            type={format.key}
            isPicked={format.key === isPickedFormat} // Compare the key
            handleClick={() => handleIsPickedFormat(format.key)} // Pass the key
          />
        ))}
      </div>

      <h2 className="border-b px-2">Выберите поздравление</h2>
      <div className="flex justify-start gap-10">
        {cards.map((card) => (
          <Card
            styles="text-sm"
            key={card}
            type={card}
            isPicked={card === isPickedCel} // This part is correct
            handleClick={() => handleIsPickedCel(card)} // Pass the card
          />
        ))}
      </div>
    </div>
  );
};

export { Menu };
