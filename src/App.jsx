import { Navigate, Route, Routes } from 'react-router-dom';
import { MainPage, Page404, TaskPage,  } from './pages';
import styles from './app.module.css'

export const App = () => {
    return (
        <div className={styles.app}>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/task/:id" element={<TaskPage />} />
                <Route path="/404" element={<Page404 />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
        </div>
    );
};

export default App;
