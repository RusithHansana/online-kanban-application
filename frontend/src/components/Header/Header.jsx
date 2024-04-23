import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useLogoutMutation } from "../../slices/api/usersApiSlice.js";
import { useUpdateBoardMutation, useDeleteBoardMutation } from "../../slices/api/boardsApiSlice.js";
import { delBoard, update, setActiveBoardId } from "../../slices/state/boardSlice.js";

import { logout } from "../../slices/state/authSlice.js";
import { LogOut, Plus, Trash2 } from "react-feather";
import { toast } from "react-toastify";

import './Header.scss';

const Header = ({ userName, toggle }) => {
    const userInfo = useSelector((state) => state.auth.userInfo);
    const boardList = useSelector((state) => state.boards.boardList);
    const activeBoardId = useSelector((state) => state.boards.activeBoardId);

    const inputRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [boardName, setBoardName] = useState('');

    const activeBoard = boardList.find(board => board._id === activeBoardId);

    const [logoutApiCall] = useLogoutMutation();
    const [updateBoard] = useUpdateBoardMutation();
    const [deleteBoard] = useDeleteBoardMutation();

    const handleModal = () => {
        toggle(prevState => !prevState);
    }

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }

    const handleDeleteBoard = async () => {
        try {
            const response = await deleteBoard({ boardId: activeBoard._id, userId: userInfo._id }).unwrap();
            response && dispatch(delBoard({ boardId: activeBoard._id }));
        } catch (error) {
            toast.error("Failed to delete project");
        }
    };

    const handleBtnDelete = () => {
        handleDeleteBoard();
    }

    const updateBoardData = async (boardName) => {
        try {
            const response = await updateBoard({ boardId: activeBoard._id, boardName }).unwrap();
            if (response) {
                dispatch(update({ boardId: activeBoard._id, data: response }));
                dispatch(setActiveBoardId(response._id));
            }
        } catch (error) {
            toast.error("Failed to update project");
        }
    }

    const handleInputChange = (e) => {
        //onKeyDown identifies keyboard events
        if (e.key === 'Enter') {
            setBoardName(e.target.value);
            //update the boardname in the backend
            updateBoardData(e.target.value);
            //clearing the input field after entering the value
            inputRef.current.value = '';
        }
    }

    useEffect(() => {
        activeBoard ? setBoardName(activeBoard.boardName) : setBoardName('Your Project');
    }, [activeBoard]);

    return (
        <div className="app__navbar">
            <div className="app__navbar-left">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder={boardName}
                    onKeyDown={handleInputChange} />
                <div className="btn-header" onClick={handleModal}>
                    <Plus /> <p>Create</p>
                </div>
                <div className="btn-header" onClick={handleBtnDelete}>
                    <Trash2 /> <p>Delete</p>
                </div>
            </div>
            <div className="app__navbar-right">
                <div className="userinfo">
                    {userName}
                </div>
                <div className="btn-logout" onClick={logoutHandler}>
                    <LogOut />
                </div>
            </div>
        </div>
    );
}

export default Header;