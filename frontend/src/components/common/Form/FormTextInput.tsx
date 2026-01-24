import styles from '@/styles/components/FormTextInput.module.scss';

type FormTextInputProps = {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  type?: 'text' | 'password' | 'email';
  onChange: (value: string) => void;
};

function FormTextInput({
  value,
  placeholder,
  disabled,
  type = 'text',
  onChange,
}: FormTextInputProps) {
  return (
    <input
      className={styles.cutomTextInput}
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default FormTextInput;
