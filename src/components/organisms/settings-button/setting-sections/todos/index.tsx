import { useModal } from '@src/lib/store';
import React from 'react';
import DeletedTodosModal from './DeletedTodosModal';

function TodosSettings() {
  const { closeModal, setModal } = useModal();

  function openDeletedTodos() {
    closeModal();
    setModal({
      id: 'trashcan_todos',
      title: 'Restore deleted todos',
      content: <DeletedTodosModal />,
      maxWidth: 'max-w-3xl',
    });
  }

  return (
    <div>
      <button onClick={openDeletedTodos}>Restore deleted todos</button>
    </div>
  );
}

export default TodosSettings;
