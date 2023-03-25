import { DeleteIcon, EditIcon } from '@src/assets/icons';
import Datepicker from '@src/components/atoms/date-picker';
import { todoTable } from '@src/lib/db';
import { useModal } from '@src/lib/store';
import { Todo } from '@src/types';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import TodoDetails from './TodoDetails';

interface IProps {
  todo: Todo;
  todos: Todo[];
}
function TodoItem(props: IProps) {
  const { todo, todos } = props;
  const { setModal } = useModal();
  const [mode, setMode] = useState<'show' | 'edit'>('show');

  const editableInnerRef = useRef<HTMLElement | null>(null);
  const name = useRef(todo.name);
  const dueDate = useRef(todo.dueDate);

  useEffect(() => {
    name.current = todo.name;
  }, [todo.name]);

  useEffect(() => {
    dueDate.current = todo.dueDate;
  }, [todo.dueDate]);

  function handleNameChange(e: ContentEditableEvent) {
    name.current = e.target.value;
  }

  function handleSaveDate(date: Date) {
    todoTable.update(todo.id as number, { ['dueDate']: date });
  }

  function handleDateChange(date: Date | null | undefined) {
    if (date) {
      dueDate.current = date;
      handleSaveDate(date);
    }
  }

  const enabledEditing = () => {
    setMode('edit');
  };

  const el = editableInnerRef?.current;

  useEffect(() => {
    if (mode === 'edit' && el) {
      el.focus();

      if (typeof window.getSelection != 'undefined' && typeof document.createRange != 'undefined') {
        const range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }
  }, [mode, !!el]);

  function saveTodo(text: string, todo: Todo) {
    todoTable.update(todo.id as number, { ['name']: text.trim() });
  }

  function deleteTodo(todo: Todo) {
    const itemsHasHigherIndex = todos.filter((x) => x.index > todo.index);
    const indexDecreasedItems = itemsHasHigherIndex.map((x) => ({ ...x, index: x.index - 1 }));
    const updatedTodo: Todo = { ...todo, isDeleted: true, index: -1 };
    const allItemsToBeUpdated = [...indexDecreasedItems, updatedTodo];
    todoTable.bulkPut(allItemsToBeUpdated);
  }

  async function openTodoDetails() {
    if (todo) {
      setModal({
        id: 'todoDetails',
        content: <TodoDetails todo={todo} />,
        title: 'Todo Details',
        maxWidth: 'max-w-3xl',
      });
    } else {
      console.error('todo not found');
    }
  }

  const handleModalOpen = () => {
    if (mode === 'show') {
      openTodoDetails();
    }
  };

  const handleBlur = () => {
    setMode('show');
    if (name.current === '') {
      name.current = 'Untitled';
    }
    saveTodo(name.current, todo);
  };

  return (
    <Draggable draggableId={`${todo?.id}`} index={todo.index}>
      {({ draggableProps, dragHandleProps, innerRef }, { isDragging }) => (
        <div {...dragHandleProps} {...draggableProps} ref={innerRef} onClick={handleModalOpen}>
          <div
            className={classNames(
              'relative',
              'bg-white hover:bg-gray-50 text-slate-900 dark:text-white border border-gray-200',
              isDragging && 'dark:bg-pc-500 border z-20 dark:border-pc-300 transition-colors',
              !isDragging && getClassNames(todo),
              'group rounded p-2 text-sm cursor-pointer hover:shadow-sm transition-all'
            )}
          >
            <ContentEditable
              innerRef={editableInnerRef}
              html={name.current}
              onChange={handleNameChange}
              onBlur={handleBlur}
              className={classNames(
                'cursor-pointer focus:cursor-text h-full leading-4',
                mode === 'edit' && '!outline-none focus:!outline-none'
              )}
              placeholder="Text here..."
              disabled={mode === 'show'}
              spellCheck={false}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleBlur();
                }
              }}
            />
            <Datepicker
              val={todo.dueDate}
              setVal={handleDateChange}
              className={classNames(
                'group:focus:hidden !text-xs dark:hover:bg-slate-300/25 -ml-1 mt-1 p-1'
              )}
              dateFormat="dd MMM"
              minDate={new Date()}
              placeholder="Due date"
            />
            {mode !== 'edit' ? (
              <div className="absolute hidden group-hover:flex right-2 top-2 divide-x dark:divide-slate-50 divide-slate-300 rounded overflow-hidden">
                <button
                  className={btnCls}
                  onClick={(e) => {
                    e.stopPropagation();
                    enabledEditing();
                  }}
                >
                  <EditIcon size={16} className="dark:fill-slate-50 fill-slate-900" />
                </button>
                <button
                  className={`${btnCls} group:focus:hidden`}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTodo(todo);
                  }}
                >
                  <DeleteIcon size={16} />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default TodoItem;

export const getClassNames = (todo: Todo) => {
  switch (todo.statusId) {
    case 1:
      return 'dark:bg-fc-300/50 dark:border-fc-200';
    case 2:
      return 'dark:bg-sc-300/50 dark:border-sc-200';
    case 3:
      return 'dark:bg-tc-300/50 dark:border-tc-200';
    default:
      return '';
  }
};
const btnCls =
  'p-[3px] shadow-md overflow-hidden dark:bg-slate-600 dark:hover:bg-slate-600/75 bg-slate-300/50 hover:bg-slate-400/50 transition-all cursor-pointer rounded-none';
