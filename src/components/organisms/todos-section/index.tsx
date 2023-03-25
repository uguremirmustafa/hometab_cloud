import TodoColumn from '@src/components/molecules/todo-column';
import useTodos from '@src/hooks/api-hooks/useTodos';
import { statusTable, todoTable } from '@src/lib/db';
import { StatusType, Todo } from '@src/types';
import { useLiveQuery } from 'dexie-react-hooks';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

function TodosSection() {
  const columns = useLiveQuery(async () => await statusTable.toArray());
  const { todos, setTodos } = useTodos();

  if (!columns) {
    return <>loading</>;
  }

  if (columns && columns.length !== 3) {
    return <>there must be three columns but got {columns.length}</>;
  }

  function onDragEnd(res: DropResult) {
    const { destination, source, draggableId } = res;

    if (!destination) {
      console.log('you dropped it into a wrong place');
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      console.log('you dropped it back to its original place');
      return;
    }

    const startColumn = todos[source.droppableId as unknown as StatusType];
    const endColumn = todos[destination.droppableId as unknown as StatusType];
    const todo = startColumn.find((x) => `${x.id}` === draggableId) as Todo;

    if (source.droppableId === destination.droppableId) {
      const columnItems = [...startColumn];
      columnItems.splice(source.index, 1);
      columnItems.splice(destination.index, 0, todo);
      const ordered = columnItems.map((x, i) => ({ ...x, index: i }));

      setTodos((old) => {
        return {
          ...old,
          [source.droppableId]: ordered,
        };
      });

      todoTable.bulkPut(ordered);

      return;
    }

    const startColumnItems = [...startColumn];
    startColumnItems.splice(source.index, 1);
    const orderedStart = startColumnItems.map((x, i) => ({ ...x, index: i }));
    const endColumnItems = [...endColumn];
    endColumnItems.splice(destination.index, 0, {
      ...todo,
      statusId: parseInt(destination.droppableId) as StatusType,
    });
    const orderedEnd = endColumnItems.map((x, i) => ({ ...x, index: i }));

    const newTodos = {
      ...todos,
      [source.droppableId]: orderedStart,
      [destination.droppableId]: orderedEnd,
    };
    setTodos(newTodos);

    todoTable.bulkPut([...orderedEnd, ...orderedStart]);
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      <DragDropContext onDragEnd={onDragEnd}>
        {columns?.map((col, i) => {
          return (
            <div className="col-span-4" key={i}>
              <TodoColumn column={col} todos={todos[col.id]} />
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default TodosSection;
