// Menu.tsx
import React, { useState } from 'react';
import { Button } from './ui/Button';

const Main = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="h-full">
      <header className="flex justify-end w-full gap-10 px-10 py-5 text-lg font-extrabold">
        <Button>
          <label htmlFor="picker" className="cursor-pointer">
            Выбрать
          </label>
          <input
            id="picker"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>
        <Button>Удалить</Button>
        <Button>Печать</Button>
      </header>
      <section className="flex px-14 justify-between py-12 h-full">
        <div className="bg-red-500 h-full">тут будут рамки</div>
        <div>
          {imageSrc && (
            <div>
              <img
                src={imageSrc}
                alt="Uploaded"
                style={{ maxWidth: '100%', maxHeight: '400px' }}
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export { Main };
