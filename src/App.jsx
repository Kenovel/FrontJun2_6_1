import { Route, Routes } from 'react-router-dom';
import { MainPage, Page404, TaskPage,  } from './pages';
import styles from './app.module.css'

export const App = () => {
    return (
        <div className={styles.app}>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/task/:id" element={<TaskPage />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
};

export default App;
