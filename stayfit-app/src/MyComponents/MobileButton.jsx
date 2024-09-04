const MobileButton = ({ type, onClick }) => {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className="flex justify-center items-center w-10 h-10 border border-secondary-green rounded-[30px] bg-secondary-green
          outline-none transition-all duration-300 active:bg-transparent active:border-opacity-70"
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="
          w-6 
          h-6 
          fill-primary-blue
          transition-all 
          duration-300
          active:fill-secondary-green
        "
        >
          <path d="M8.69373 23.8334L6.77081 21.9104L15.6812 13L6.77081 4.0896L8.69373 2.16669L19.5271 13L8.69373 23.8334Z" />
        </svg>
      </button>
    </div>
  );
};

export default MobileButton;
