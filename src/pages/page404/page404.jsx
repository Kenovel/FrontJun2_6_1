import { useNavigate } from 'react-router-dom';
import styles from './page404.module.css';

export const Page404 = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.notExist}>
            <div>Данной страницы не существует</div>
            <button onClick={() => navigate(-1)}>{'<- Вернуться назад'}</button>
        </div>
    );
};
