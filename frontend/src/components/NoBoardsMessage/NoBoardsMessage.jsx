import React from 'react';

const NoBoardsMessage = ({ toggle }) => {
    const handleCreateBtn = () => {
        toggle(prevState => !prevState);
    }
    return (
        <div className="App__right">
            <div className="App__right create-board">
                <div>
                    <p>
                        It looks like you don't have any projects created yet. Why not
                        try creating one?
                    </p>
                    <div className="btn-create">
                        <button
                            onClick={handleCreateBtn}
                        >
                            Create A Project
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoBoardsMessage;