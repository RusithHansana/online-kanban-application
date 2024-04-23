import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveBoardId } from '../../slices/state/boardSlice.js';

import BoardItem from "./BoardItems/BoardItem.jsx";
import Sidemenu from './SideMenu/Sidemenu.jsx';

import './Sidebar.scss';

const Sidebar = () => {
    const dispatch = useDispatch();
    const boards = useSelector(state => state.boards.boardList);

    useEffect(() => {
        if (boards && boards.length !== 0) {
            dispatch(setActiveBoardId(boards[0]?._id));
        }
    }, [boards]);

    return (
        <div className="app__sidebar">
            <div className="app__sidebar-bar">
                <h1 className="app__sidebar-title">Your Projects</h1>
                <div className="app__sidebar-scroll">
                    <ul className="boards">
                        {
                            boards.map(board => {
                                if (board) {
                                    return <BoardItem
                                        board={board}
                                        key={board._id}
                                    />
                                }
                                return null;
                            })
                        }
                    </ul>
                </div>
            </div>
            <Sidemenu boards={boards} />
        </div>
    );
}

export default Sidebar;