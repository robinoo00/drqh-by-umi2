import styles from '../styles/nav.less'

const Nav = ({tab}) => (
        <div className={tab.choose ? tab.sort === 'asc' ? styles["nav-item-asc"] : styles["nav-item-desc"] :''}>
            <div className={styles["nav-item"]}>
                {tab.title}
            </div>
        </div>
)

export default Nav
