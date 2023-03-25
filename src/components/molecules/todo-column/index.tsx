import { AddIcon } from '@src/assets/icons';
import Badge from '@src/components/atoms/badge';
import { todoTable } from '@src/lib/db';
import { Status, Todo } from '@src/types';
import { Droppable } from 'react-beautiful-dnd';
import classNames from 'classnames';
import TodoItem from '../todo';
import { useModal } from '@src/lib/store';

interface IProps {
  column: Status;
  todos: Todo[];
}

function TodoColumn(props: IProps) {
  const { column, todos } = props;

  const { name, id } = column;

  let badgeClasses = '';
  let columnClasses = '';
  if (id === 1) {
    badgeClasses = 'bg-fc-100 dark:bg-fc-200';
    columnClasses = 'bg-fc-100/25 dark:bg-fc-200/25';
  } else if (id == 2) {
    badgeClasses = 'bg-sc-100 dark:bg-sc-200';
    columnClasses = 'bg-sc-100/25 dark:bg-sc-200/25';
  } else {
    badgeClasses = 'bg-tc-100 dark:bg-tc-200';
    columnClasses = 'bg-tc-100/25 dark:bg-tc-200/25';
  }

  function addTodo() {
    todoTable.add({
      name: 'Untitled',
      statusId: column.id as Todo['statusId'],
      index: todos.length,
    });
  }

  return (
    <div
      className={classNames(
        'rounded p-2 shadow opacity-95 hover:opacity-100 transition-opacity',
        columnClasses
      )}
    >
      <div className="flex items-center justify-between">
        <Badge className={`${badgeClasses} text-slate-900 shadow-sm hover:shadow-md transition`}>
          {name}
        </Badge>
        <button onClick={addTodo} className="p-[2px] dark:hover:bg-slate-400/50">
          <AddIcon size={18} />
        </button>
      </div>

      <Droppable droppableId={`${column.id}`}>
        {({ droppableProps, innerRef, placeholder }) => (
          <div
            ref={innerRef}
            {...droppableProps}
            className={classNames(
              'flex flex-col gap-2 my-2 max-h-[300px] overflow-y-scroll scrollbar-lg'
            )}
          >
            {todos.map((todo) => (
              <TodoItem key={todo?.id} todo={todo} todos={todos} />
            ))}
            {placeholder}
          </div>
        )}
      </Droppable>

      <button
        onClick={addTodo}
        className="p-2 w-full flex gap-2 dark:hover:bg-slate-400/50 hover:bg-slate-100"
      >
        <AddIcon size={18} /> <span>New</span>
      </button>
    </div>
  );
}

export default TodoColumn;
