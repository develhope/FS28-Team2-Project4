const Button = ({ type, onClick, text, color, txtcolor, disabled }) => {
  return (
    <div className="flex justify-center items-center">
      <button
        type={type}
        onClick={onClick}
        className={`w-fit px-3 py-2 h-fit border-0 rounded-[6px] outline-none font-bold
                glow-button transition-all duration-300 ease-in-out active:bg-transparent
                active:text-secondary-green active:border-opacity-60`}
        style={{
          backgroundColor: color || '#C1FF72',
          color: txtcolor || '#001E23'
        }}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
