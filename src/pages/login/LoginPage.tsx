import { Link } from 'react-router-dom';
import styles from './LoginPage.module.scss';
import { useForm } from 'react-hook-form';

type FormValues = {
  email: string;
  password: string;
};

export function LoginPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <form className={styles.form}>
          <div className={styles.inputContainer}>
            <label className={styles.inputLabel} htmlFor="email">
              Your email:
            </label>
            <input
              className={styles.input}
              type="text"
              id="email"
              {...register('email', {
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

            {errors.password && (
              <span className={styles.errorMessage}>
                {errors.password.message}
              </span>
            )}
          </div>

          <button className={styles.button} type="submit">Log in</button>
        </form>

        <p>Don't have account?</p>

        <Link className={styles.buttonWhite} to="/register">Register</Link>

        <Link className={styles.buttonWhite} to="/">Back to home page</Link>
      </div>
    </div>
  )
}