interface FrameProps {
  type: string;
  isPicked: boolean;
  handleClick: () => void;
  styles?: string;
}

const Card: React.FC<FrameProps> = ({
  type,
  isPicked,
  handleClick,
  styles,
}) => {
  const handleClickPD = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleClick();
  };

  return (
    <button
      className={`${isPicked && 'shadow-inner-md hover:shadow-inner-lg'} px-3 py-5 cursor-pointer text-center shadow-md transition duration-300 hover:shadow-lg ${styles}`}
      onClick={handleClickPD}
    >
      {type}
    </button>
  );
};

export { Card };
