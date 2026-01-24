import styles from '@/styles/components/FormCheckboxInput.module.scss';

type FormCheckboxProps = {
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
};

function FormCheckbox({ checked, disabled, onChange }: FormCheckboxProps) {
  return (
    <label className={styles.checkbox}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={styles.box} />
    </label>
  );
}

export default FormCheckbox;
