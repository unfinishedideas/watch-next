import "./Button.css";

interface ButtonProps {
  btnText: string;
  btnCallback: () => void;
}

const Button: React.FC<ButtonProps> = ({
  btnText,
  btnCallback,
}: ButtonProps) => {
  return (
    <button onClick={btnCallback} className="button_class">
      <p className="button_text">{btnText}</p>
    </button>
  );
};

export default Button;
