import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useAddCardsMutation } from '../../slices/api/cardsApiSlice.js';
import { useDeleteCardMutation } from '../../slices/api/cardsApiSlice.js';
import { useMoveTasksMutation, useSwapTasksMutation } from '../../slices/api/tasksApiSlice.js';
import Card from './Card/Card';

import { Plus } from 'react-feather';
import { ToastContainer, toast } from 'react-toastify';
import './TaskBoard.scss';



const TaskBoard = ({ cards, activeBoardId }) => {
  const [enabled, setEnabled] = useState(false);
  const [cardList, setCardList] = useState([]);
  const [newCard, setNewCard] = useState("");

  const [addCards] = useAddCardsMutation();
  const [deleteCard] = useDeleteCardMutation();
  const [swapTasks] = useSwapTasksMutation();
  const [moveTasks] = useMoveTasksMutation();

  const handleCardInput = (e) => {
    setNewCard(e.target.value);
  }

  const handleAddCard = async (e) => {
    if (newCard === "") return;

    if (e.key === 'Enter' || e.type === 'click') {
      try {
        const response = await addCards({ cardName: e.target.value, boardId: activeBoardId }).unwrap();
        setCardList([...cardList, response]);
        e.target.value = "";
        toast.success('Card added successfully');
      } catch (error) {
        toast.error("Failed to add card");
      }
    }
  }

  const handleCardDelete = async (cardId) => {
    try {
      await deleteCard({ cardId: cardId, boardId: activeBoardId }).unwrap();
      setCardList(cardList.filter(card => card._id !== cardId));
      toast.success('Card deleted successfully');
    } catch (error) {
      toast.error('Failed to delete card');
    }
  }

  const handleSwap = async (taskList, cardId) => {
    await swapTasks({ swappedTasks: taskList, cardId: cardId }).unwrap();
  }

  const handleMove = async (dragId, dropId, task) => {
    await moveTasks({ dragCardId: dragId, dropCardId: dropId, task: task }).unwrap();
  }

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    const card = cardList.find(card => card._id === source.droppableId);
    const taskList = [...card.tasks];
    const dragTask = card.tasks[source.index];

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      taskList.splice(source.index, 1);
      taskList.splice(destination.index, 0, dragTask);

      handleSwap(taskList, card._id);

    } else {
      const task = taskList.find(task => task._id === draggableId);
      handleMove(source.droppableId, destination.droppableId, task);

    }
  }

  useEffect(() => {
    //react-beautiful-dnd does not work with strict mode
    //this is the way to bypass it
    const animation = requestAnimationFrame(() => setEnabled(true));
    setCardList(cards);
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, [cards]);

  if (!enabled) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="app__taskboard">
        <ul className="app__taskboard-cards">
          {
            cardList ? (

              cardList.map((card, index) => (
                <li key={card._id}>

                  <Card card={card} handleCardDelete={handleCardDelete} />
                </li>
              ))
            ) : <p>You have no cards yet...</p>
          }

          <div className='addtask card'>
            <Plus className='addbtn' onClick={handleAddCard} />
            <input
              type='text'
              placeholder='Add new Card'
              onChange={handleCardInput}
              onKeyDown={handleAddCard}
            />
          </div>
        </ul>
        <ToastContainer />
      </div>
    </DragDropContext>
  )
}


export default TaskBoard;