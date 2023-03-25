import { CalendarIcon, CloseIcon, LoadingIcon, SaveIcon } from '@src/assets/icons';
import Datepicker from '@src/components/atoms/date-picker';
import useCtrlS from '@src/hooks/useCtrlS';
import { todoTable } from '@src/lib/db';
import { sleep } from '@src/lib/helper-functions';
import { useApp, useModal } from '@src/lib/store';
import { Todo } from '@src/types';
import classNames from 'classnames';
import { useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { useForm } from 'react-hook-form';

interface IProps {
  todo: Todo;
}

function TodoDetails(props: IProps) {
  const { todo: t } = props;
  const { setLoading, modal, loading } = useApp();
  const { closeModal } = useModal();
  const [todo, setTodo] = useState(t);

  const { setValue, getValues, watch } = useForm({
    defaultValues: { name: todo.name, description: todo.description ?? '', dueDate: todo?.dueDate },
  });

  function saveTodo() {
    if (getValues('name') === '') {
      setValue('name', 'Untitled');
    }
    setLoading(true);
    const newTodo = {
      name: getValues('name'),
      description: getValues('description'),
      dueDate: getValues('dueDate'),
    };
    setTodo((old) => ({ ...old, ...newTodo }));
    todoTable.update(todo.id as number, newTodo).finally(async () => {
      await sleep(500);
      setLoading(false);
    });
  }

  useCtrlS(() => {
    if (modal?.title === 'todoDetails') {
      saveTodo();
    }
  });

  const isChanged =
    watch('description') !== todo.description ||
    watch('name') !== todo.name ||
    watch('dueDate')?.toString() !== todo.dueDate?.toString();

  return (
    <div>
      <ContentEditable
        html={getValues('name')}
        onChange={(e) => setValue('name', e.target.value)}
        className={classNames('text-2xl font-bold outline-none p-4')}
        spellCheck={false}
        placeholder="Grab a cup off coffee..."
      />
      <div className="m-4">
        <Datepicker
          val={watch('dueDate')}
          setVal={(e) => {
            if (e) {
              setValue('dueDate', e);
            }
          }}
          minDate={new Date()}
          placeholder={
            <div className="flex items-center gap-1">
              <CalendarIcon size={16} />
              <span>Due date</span>
            </div>
          }
          onBlur={saveTodo}
          showIcon
        />
      </div>
      <ContentEditable
        html={getValues('description')}
        onChange={(e) => setValue('description', e.target.value)}
        spellCheck={false}
        className={classNames(
          'text-base outline-none min-h-[300px] max-h-[550px] overflow-y-scroll mx-4'
        )}
        placeholder="Some cool content goes here..."
      />
      <div className="flex justify-end gap-2 items-center m-4">
        <button className="btn-outlined flex gap-2" onClick={closeModal}>
          Close
        </button>
        <button className="btn flex gap-2" onClick={saveTodo} disabled={!isChanged || loading}>
          {loading ? <LoadingIcon size={16} /> : <SaveIcon size={16} />} Save
        </button>
      </div>
    </div>
  );
}

export default TodoDetails;
