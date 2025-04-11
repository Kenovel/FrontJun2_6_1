import styles from './todoPreview.module.css';
import todoStyles from '../../../../commonTodoStyles.module.css';
import { requestUpdateTodo } from '../../../../hooksAndUtils';
import { Link } from 'react-router-dom';

export const TodoPreview = ({ id, title, completed, refreshTodoList }) => {
    const handleToggleComplete = async () => {
        try {
            await requestUpdateTodo(id, { completed: !completed });
            refreshTodoList();
        } catch (error) {
            console.error('Ошибка при обновлении задачи:', error);
        }
    };

    return (
        <div className={styles.todo}>
            <Link className={styles.todoTitle} to={`task/${id}`}>
                <span>{title || ''}</span>
            </Link>
            <input
                className={todoStyles.checkbox}
                type="checkbox"
                checked={completed}
                onChange={handleToggleComplete}
            />
        </div>
    );
};
