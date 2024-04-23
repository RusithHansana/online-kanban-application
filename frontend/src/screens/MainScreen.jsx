import React from 'react';
import { useSelector } from 'react-redux';
import { useGetCardsQuery } from '../slices/api/cardsApiSlice.js';

import Header from "../components/Header/Header.jsx";
import TaskBoard from "../components/TaskBoard/TaskBoard.jsx";

import "../App.scss";

const MainScreen = ({ setToggleProjectModal }) => {
    const userInfo = useSelector((state) => state.auth.userInfo);
    const activeBoardId = useSelector((state) => state.boards.activeBoardId);

    const { data: cards, isLoading, isSuccess } = useGetCardsQuery(activeBoardId);

    if (isLoading) return <div>Loading...</div>;
    if (!isSuccess) return <div>Failed to load</div>;

    return (
        <div className="App__right">
            <Header
                toggle={setToggleProjectModal}
                userName={userInfo?.username}
            />
            <TaskBoard
                cards={cards}
                activeBoardId={activeBoardId}
            />
        </div>
    );
};

export default MainScreen;