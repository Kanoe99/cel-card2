interface ButtonProps {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  const classes =
    'text-xl font-bold px-2 py-1 border-2 rounded-md text-blue-500 bg-white cursor-pointer hover:text-white hover:bg-transparent transition duration-300';

  return <button className={classes}>{children}</button>;
};
export { Button };
