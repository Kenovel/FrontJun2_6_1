import { useState } from 'react';
import styles from './app.module.css';
import { ControlPanel, TodoList } from './components';

export const App = () => {
    const [isRefreshing, setisRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSorted, setIsSorted] = useState(false);

    const refreshTodoList = () => setisRefreshing(!isRefreshing);
    return (
        <div className={styles.app}>
            <h1>Список задач</h1>
            <ControlPanel
                isSorted={isSorted}
                setIsSorted={setIsSorted}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                refreshTodoList={refreshTodoList}
            />
            <TodoList
                isRefreshing={isRefreshing}
                searchQuery={searchQuery}
                isSorted={isSorted}
                setIsSorted={setIsSorted}
                refreshTodoList={refreshTodoList}
            />
        </div>
    );
};

export default App;
