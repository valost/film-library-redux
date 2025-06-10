import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './RegisterPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { EMAIL_REGEX } from '../../utils/constants';
import { registerUser } from '../../features/auth/authActions';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import Loader from '../../components/loader/Loader';
import { ErrorModal } from '../../components/error-modal/ErrorModal';

type FormValues = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

export function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
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
    dispatch(registerUser(data));
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
          <div className={styles.inputContainer}>
            <label className={styles.inputLabel} htmlFor="name">
              Name:
            </label>
            <input
              className={styles.input}
              type="text"
              id="name"
              {...register('name', {
                required: 'Please enter your name',
              })}
            />

            {errors.name && (
              <span className={styles.errorMessage}>{errors.name.message}</span>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.inputLabel} htmlFor="email">
              Email:
            </label>
            <input
              className={styles.input}
              type="text"
              id="email"
              {...register('email', {
                required: 'Please enter your password',
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
              Password:
            </label>
            <input
              className={styles.input}
              type="password"
              id="password"
              {...register('password', {
                required: 'Please enter your password',
              })}
            />

            {errors.password && (
              <span className={styles.errorMessage}>
                {errors.password.message}
              </span>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.inputLabel} htmlFor="password">
              Repeat password:
            </label>
            <input
              className={styles.input}
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', {
                required: 'Please repeat your password',
              })}
            />

            {errors.confirmPassword && (
              <span className={styles.errorMessage}>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {errorModal && error && typeof error === 'string' && (
            <div className={styles.modalOverlay}>
              <ErrorModal error={error} onClose={() => setErrorModal(false)} />
            </div>
          )}

          <button
            type="submit"
            className={`${styles.button} ${loading ? styles.isLoading : ''}`}
          >
            {loading ? <Loader /> : 'Register'}
          </button>
        </form>

        <p>Have account?</p>

        <Link className={styles.buttonWhite} to="/login">
          Log in
        </Link>

        <Link className={styles.buttonWhite} to="/">
          Back to home page
        </Link>
      </div>
    </div>
  );
}
