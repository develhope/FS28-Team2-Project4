const Button = ({ type, onClick, text }) => {
  return (
    <div className="flex justify-center md:justify-start items-center">
      <button
        type={type}
        onClick={onClick}
        className="w-[300px] h-10 border-2 rounded-[6px] outline-none border-secondary-green text-primary-blue font-bold
                bg-secondary-green glow-button transition-all duration-300 ease-in-out active:bg-transparent
                active:text-secondary-green active:border-opacity-60"
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
