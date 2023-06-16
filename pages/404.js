import Link from 'next/link'
import styles from '../styles/404.module.css'

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1>404</h1>
      <p>Parece que esta página não existe!</p>
      <Link href="/">
        <a>Voltar</a>
      </Link>
    </div>
  )
}
