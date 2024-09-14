const Button = ({ type, onClick, text }) => {
    return (
      <div className="w-[300px] h-15">
        <button
          type={type}
          onClick={onClick}
          className="w-[300px] h-10 border-2 rounded-[6px] outline-none border-custom-green text-primary-blue font-bold
                  bg-custom-green glow-button transition-all duration-300 ease-in-out active:bg-transparent
                  active:text-custom-green active:border-opacity-60"
        >
          {text}
        </button>
      </div>
    );
  };

  export default Button;
