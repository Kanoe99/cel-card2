// width: '550px',
//         height: `${550 * 1.414}px`, // A3 ratio

import React, { useRef, useEffect } from 'react';
import Textarea from '../canvas/Canvas';

interface PictureProps {
  imageSrc: string | null;
  width: number;
  height: number;
  fontSize: string;
  fontFamily: string;
  card: string;
}

const Picture: React.FC<PictureProps> = ({
  imageSrc,
  width,
  height,
  fontSize,
  fontFamily,
  card,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const draw = (ctx: CanvasRenderingContext2D) => {
    const img = new Image();
    if (imageSrc) {
      img.src = imageSrc;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);

        ctx.font = `${fontSize} ${fontFamily}`;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.fillText(card, width / 2, height / 2);
      };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = width;
        canvas.height = height;
        draw(context);
      }
    }
  }, [imageSrc, width, height, card]);

  return (
    <div
      className={`${canvasRef && 'bg-green-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'} relative border-8`}
      style={{
        width: '550px',
        height: `${550 * 1.414}px`,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: `${width}px`, height: `${height}px` }}
      />
      <Textarea card={card} />
    </div>
  );
};

export { Picture };
