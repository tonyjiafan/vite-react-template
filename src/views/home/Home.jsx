import { useState } from 'react'
import styles from './Home.module.css'


function Home () {
  const [count, setCount] = useState(0)
  return (
    <div className={styles.home}>
    <p>Hello Vite + React!</p>
    <p>This Page of Home</p>
      <div>
        <button className={styles.button} type="button" onClick={() => setCount((count) => count + 1)}>
          count is: {count}
        </button>
      </div>
    </div>
  ) 
}

export default Home
