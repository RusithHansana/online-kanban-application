import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveBoardId } from "../../../slices/state/boardSlice.js";
import './BoardItem.scss';

const BoardItem = ({ board }) => {
    const dispatch = useDispatch();
    const activeId = useSelector((state) => state.boards.activeBoardId);

    const [isHovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    const handleBtnClick = () => {
        dispatch(setActiveBoardId(board._id));
    }

    let style = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: `var(${board.color})`,
        color: 'var(--secondary-color)',
        borderRadius: '10px',
        padding: '1rem',
    };

    return (
        <div className="board-items" style={{ borderLeft: `4px solid var(${board.color})` }}>
            <button onClick={handleBtnClick}>
                <li
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={isHovered || (activeId === board._id) ? style : null}
                >
                    {board.boardName}
                </li>
            </button>
        </div>
    );
}

export default BoardItem;