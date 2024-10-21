interface TextProps {
  text: string;
}

const Text: React.FC<TextProps> = ({ text }) => {
  const congratulations = text;

  return (
    <h2 className="absolute grid place-items-center h-full w-full z-[100] text-white">
      {congratulations}
    </h2>
  );
};

export { Text };
