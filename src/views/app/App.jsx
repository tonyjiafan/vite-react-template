import { Link } from "react-router-dom"
import { renderRoutes } from "react-router-config"
import routes from "@/routes"
import styles from './App.module.less'


function App () {
  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <Link className={styles.navLink} to="/">首页</Link>
        <Link className={styles.navLink} to="/user">User</Link>
        <Link className={styles.navLink} to="/vector">VectorEdit</Link>
      </header>
      <div className={styles.appView}>
        {renderRoutes(routes)}
      </div>
    </div>
  ) 
}

export default App
