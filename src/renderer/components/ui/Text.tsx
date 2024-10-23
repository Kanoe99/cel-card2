import React from 'react';

interface TextProps {
  children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({ children }) => {
  return (
    <h2 className="h-full grid place-items-center absolute z-[100] text-white">
      {children}
    </h2>
  );
};

export { Text };
