export const requestDeleteTodo = (id, refreshTodoList) => {
    fetch(`http://localhost:3001/todos/${id}`, { method: 'DELETE' })
        .then((rawResponse) => rawResponse.json())
        .then((response) => {
            console.log('Фен удален, ответ сервера:', response);
            refreshTodoList();
        });
};
