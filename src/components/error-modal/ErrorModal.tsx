import styles from './ErrorModal.module.scss';

type Props = {
  error: string;
  onClose: () => void;
};

export function ErrorModal({ onClose, error }: Props) {
  return (
    <div className={styles.modal}>
      <p>{error}</p>

      <button onClick={() => onClose()} className={styles.button}>
        Close
      </button>
    </div>
  );
}
