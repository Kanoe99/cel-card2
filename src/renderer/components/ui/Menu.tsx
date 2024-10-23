import { Frame } from './Frame';
import { Card } from './Card';

interface Format {
  key: string;
}

interface Card {
  key: string;
  value: string;
}

interface MenuProps {
  formats: Format[];
  cards: Card[];
  isPickedCard: string | null;
  isPickedFormat: string | null;
  handleIsPickedFormat: (format: string) => void;
  handleIsPickedCard: (card: string) => void;
}

const Menu: React.FC<MenuProps> = ({
  formats,
  cards,
  isPickedCard,
  isPickedFormat,
  handleIsPickedFormat,
  handleIsPickedCard,
}) => {
  console.log(isPickedCard);
  return (
    <div className="h-fit flex flex-1 flex-col gap-10 text-lg font-medium shadow px-10 py-5">
      <h2 className="border-b px-2">Выберите формат</h2>
      <div className="flex justify-start gap-10">
        {formats.map((format) => (
          <Frame
            key={format.key}
            type={format.key}
            isPicked={format.key === isPickedFormat}
            handleClick={() => handleIsPickedFormat(format.key)}
          />
        ))}
      </div>

      <h2 className="border-b px-2">Выберите поздравление</h2>
      <div className="flex justify-start gap-10">
        {cards.map((card) => (
          <Card
            styles="text-sm"
            key={card.key}
            type={card.key}
            isPicked={card.key === isPickedCard}
            handleClick={() => handleIsPickedCard(card.key)}
          />
        ))}
      </div>
    </div>
  );
};

export { Menu };
