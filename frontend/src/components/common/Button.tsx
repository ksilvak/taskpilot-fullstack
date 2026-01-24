import styles from '@/styles/components/Button.module.scss';

type ButtonProps = {
  buttonName: string;
  buttonType?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
};

function Button({ buttonName, buttonType, disabled, onClick }: ButtonProps) {
  return (
    <button
      type={buttonType}
      disabled={disabled}
      onClick={onClick}
      className={styles.btn}
    >
      {buttonName}
    </button>
  );
}

export default Button;
