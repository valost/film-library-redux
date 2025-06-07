import { useForm } from 'react-hook-form';
import styles from './RegisterPage.module.scss';
import { Link } from 'react-router-dom';

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
              Email:
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

            {errors.password && (
              <span className={styles.errorMessage}>
                {errors.password.message}
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
              id="password"
              {...register('password', {
                required: 'Please repeat your password',
              })}
            />

            {errors.password && (
              <span className={styles.errorMessage}>
                {errors.password.message}
              </span>
            )}
          </div>

          <button className={styles.button} type="submit">Register</button>
        </form>

        <p>Have account?</p>

        <Link className={styles.buttonWhite} to="/register">Log in</Link>

        <Link className={styles.buttonWhite} to="/">Back to home page</Link>
      </div>
    </div>
  )
}