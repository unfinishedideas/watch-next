interface FormErrorTextProps {
  message: string;
}

const FormErrorText: React.FC<FormErrorTextProps> = ({
  message,
}: FormErrorTextProps) => {
  if (message) {
    return (
      <div>
        <p className="text-sm text-error">{message}</p>
      </div>
    );
  } else {
    return <></>;
  }
};

export default FormErrorText;
