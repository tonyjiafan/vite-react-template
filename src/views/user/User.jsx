import { Counter } from '../../features/counter/Counter'
import styles from './User.module.less'


function User() {
  return (
    <div className={styles.user}>
      <Counter></Counter>
    </div>
  )
}

export default User