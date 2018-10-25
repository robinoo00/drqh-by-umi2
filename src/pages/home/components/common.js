import styles from '../styles/common.less'

export const TitleLine = ({text,arrow = true}) => (
    <div className={styles.titleLine}>
        <em className={styles.titleName}>{text}</em>
        {arrow ? <img
            className={styles.icon}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAWCAYAAAD0OH0aAAAAh0lEQVQ4T63TzQmAMAwF4FfP7uXFOUIRcRbxZjuIczlAqVRQsP4kUXstXyC8PAPlM9baKoRQeO8niTVENAMoATTOuZFDCbQABgBRgkyaSEQdgF6CVqBBO5CiA5CgE+DQJXhCtyBHMcY6hfsfuMvm+9Jc6u+D4yZvJ6Q/PvV5qwukrihXyfx/ASkxfhc5tMaZAAAAAElFTkSuQmCC"
            alt=""/> : ''}
    </div>
)
