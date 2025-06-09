import styles from './Dropdown.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  formats: string[];
  name: string;
};

export function Dropdown({ formats, name }: Props) {
  const { register, setValue, watch } = useFormContext();
  const selectedFormat = watch(name);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelect(format: string) {
    setValue(name, format, { shouldValidate: true });
    console.log('User selected format:', format);
    setOpen(false);
  }

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <input
        type="hidden"
        {...register(name, { required: 'Please choose format' })}
      />

      <button
        type="button"
        className={styles.dropdownToggle}
        onClick={() => setOpen((prev) => !prev)}
      >
        {selectedFormat || 'Select format'}
        <span className={styles.arrow}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <ul className={styles.dropdownMenu}>
          {formats.map((format) => (
            <li
              key={format}
              className={selectedFormat === format ? styles.selectedOption : ''}
              onClick={() => handleSelect(format)}
            >
              {format}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
