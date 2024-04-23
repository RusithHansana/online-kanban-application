import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Menu, XSquare } from 'react-feather';
import { motion } from 'framer-motion';

import './Sidemenu.scss';
import { setActiveBoardId } from '../../../slices/state/boardSlice';

const Sidemenu = ({ boards, }) => {
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false);

    const handleBtnClick = (boardId) => {
        dispatch(setActiveBoardId(boardId));
    }

    return (
        <div className="app__sidebar-menu">
            <Menu onClick={() => setToggle(true)} />
            {
                toggle && (
                    <motion.div
                        whileInView={{ x: [-10, 0] }}
                        transition={{ duration: 0.85, ease: 'easeOut' }}
                    >
                        <XSquare onClick={() => setToggle(false)} />
                        <h1 className="app__sidebar-menu title">Your Boards</h1>
                        <ul className="boards">
                            {
                                boards.length !== 0 ? (
                                    boards.map(board => {
                                        return (
                                            <li
                                                key={board._id}
                                                style={{ borderLeft: `4px solid var(${board.color})` }}
                                                onClick={handleBtnClick(board._id)}
                                            >
                                                {board.boardName}
                                            </li>
                                        )
                                    }
                                    )
                                ) : <p>You don't have any projects yet...</p>
                            }
                        </ul>
                    </motion.div>
                )
            }
        </div >
    )
}

export default Sidemenu