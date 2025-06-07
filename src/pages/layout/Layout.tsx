import { Outlet } from "react-router-dom";
import { Header } from "../../components/header/Header";
import styles from './Layout.module.scss';

export function Layout() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  )
}