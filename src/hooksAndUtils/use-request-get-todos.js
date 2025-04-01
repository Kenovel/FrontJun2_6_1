import { useEffect, useState } from 'react';

export const useRequestGetTodos = (isRefreshing) => {
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3001/todos')
            .then((res) => res.json())
            .then((data) => {
                setTodos(data);
            });
    }, [isRefreshing]);

    return {
        todos,
        setTodos,
    };
};
