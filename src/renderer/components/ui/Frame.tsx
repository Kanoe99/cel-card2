interface FrameProps {
  type: string;
  isPicked: boolean;
  handleClick: () => void;
}

const Frame: React.FC<FrameProps> = ({ type, isPicked, handleClick }) => {
  const handleClickPD = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleClick();
  };

  return (
    <button
      className={`${isPicked && 'shadow-inner-md hover:shadow-inner-lg'} px-3 py-5 cursor-pointer text-center text-6xl shadow-md transition duration-300 hover:shadow-lg`}
      onClick={handleClickPD}
    >
      {type}
    </button>
  );
};

export { Frame };
