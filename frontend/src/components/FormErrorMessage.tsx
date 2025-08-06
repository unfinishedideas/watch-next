import "./Form.css";

interface FormErrorMessageProps {
  message: string;
}

const FormErrorMessage: React.FC<FormErrorMessageProps> = ({
  message,
}: FormErrorMessageProps) => {
  if (message) {
    return <p className="error-text">{message}</p>;
  } else {
    return <div />;
  }
};

export default FormErrorMessage;
