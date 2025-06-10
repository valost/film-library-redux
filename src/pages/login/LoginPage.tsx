import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.scss';
import { useForm } from 'react-hook-form';
import { EMAIL_REGEX } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loginUser } from '../../features/auth/authActions';
import Loader from '../../components/loader/Loader';
import { ErrorModal } from '../../components/error-modal/ErrorModal';

type FormValues = {
  email: string;
  password: string;
};

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { loading, error, success } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errorModal, setErrorModal] = useState(false);

  useEffect(() => {
    if (error) {
      setErrorModal(true);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      navigate('/');
    }
  });

  useEffect(() => {
    if (errorModal) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
    }
  }, [errorModal]);

  const submitForm = (data: FormValues) => {
    dispatch(loginUser(data));
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
          <div className={styles.inputContainer}>
            <label className={styles.inputLabel} htmlFor="email">
              Your email:
            </label>
            <input
              className={styles.input}
              type="text"
              id="email"
              {...register('email', {
                required: 'Please enter your email',
                validate: (value) =>
                  EMAIL_REGEX.test(value) || 'Please enter valid email',
              })}
            />

            {errors.email && (
              <span className={styles.errorMessage}>
                {errors.email.message}
              </span>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.inputLabel} htmlFor="password">
              Your password:
            </label>
            <input
              className={styles.input}
              type="password"
              id="password"
              {...register('password', {
                required: 'Please enter your password',
              })}
            />

            {errorModal && error && typeof error === 'string' && (
              <div className={styles.modalOverlay}>
                <ErrorModal
                  error={error}
                  onClose={() => setErrorModal(false)}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className={`${styles.button} ${loading ? styles.isLoading : ''}`}
          >
            {loading ? <Loader /> : 'Log in'}
          </button>
        </form>

        <p>{`Don't have account?`}</p>

        <Link className={styles.buttonWhite} to="/register">
          Register
        </Link>

        <Link className={styles.buttonWhite} to="/">
          Back to home page
        </Link>
      </div>
    </div>
  );
}
