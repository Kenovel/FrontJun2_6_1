export const requestUpdateTodo = (id, updatedFields, refreshTodoList) => {
    fetch(`http://localhost:3001/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(updatedFields),
    })
        .then((rawResponse) => rawResponse.json())
        .then((response) => {
            console.log('Задача обновлена, ответ сервера: ', response);
            refreshTodoList();
        })
        .catch((error) => {
            console.error('Ошибка обновления задачи:', error);
        });
};
