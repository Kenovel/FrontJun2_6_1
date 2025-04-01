export const requestAddTodo = (newTodo, setNewTodo, refreshTodoList) => {
    if (!newTodo.trim()) return;
    const newTask = { title: newTodo, completed: false };
    fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(newTask),
    })
        .then((rawResponse) => rawResponse.json())
        .then((response) => {
            console.log('Новая задача добавлена, ответ от сервера:', response);
            refreshTodoList();
        })
        .finally(() => setNewTodo(''));
};
