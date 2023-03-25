import { useDeletedTodos } from '@src/hooks/api-hooks/useTodos';
import { todoTable } from '@src/lib/db';
import { Todo } from '@src/types';
import { format } from 'date-fns';
import React, { useState } from 'react';

function DeletedTodosModal() {
  const [searchKey, setSearchKey] = useState('');
  const todos = useDeletedTodos(searchKey);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchKey(e.target.value);
  }

  function restoreTodo(todo: Todo) {
    todoTable.update(todo?.id as number, { isDeleted: false });
  }
  return (
    <div className="max-h-[500px] overflow-y-scroll overflow-x-hidden flex flex-col gap-1">
      <input
        className="text-box m-2 text-base font-semibold"
        type="search"
        autoFocus
        value={searchKey}
        onChange={handleSearchChange}
        placeholder="Search..."
      />
      <table className="m-2 mt-0">
        <tbody>
          {todos.map((todo) => {
            return (
              <tr
                tabIndex={0}
                key={todo.id}
                className="paper flex justify-between cursor-pointer"
                onClick={() => restoreTodo(todo)}
              >
                <td className="grow-1">{todo.name}</td>
                <td className="w-[150px]">
                  {todo?.dueDate ? format(todo.dueDate, 'dd MMM yyyy, hh:mm') : '---'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DeletedTodosModal;
