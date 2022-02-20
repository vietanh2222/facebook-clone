import React from 'react';
import './DeleteConfirm.css';
import CloseIcon from "@mui/icons-material/Close";

function DeleteConfirm({isPost, handleRemovePost, 
    handleCloseDeleteConFirmPost, handleCloseDeleteConfirmComment,
    handleRemoveComment, 
}) {
  return (
    <div className='DeleteConfirm'
        onClick={isPost ? handleCloseDeleteConFirmPost : handleCloseDeleteConfirmComment}
    >
        <div className="DeleteConfirm__wrapper"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="DeleteConfirm__top">
                {isPost ? <h1>DELETE THIS POST?</h1> : <h1>DELETE THIS COMMENT?</h1>}
                <CloseIcon 
                    onClick={isPost ? handleCloseDeleteConFirmPost : handleCloseDeleteConfirmComment}
                />
            </div>
            <div className="DeleteConfirm__body">
                {isPost 
                ? <p>Are you surely want to delete this post ?</p> 
                : <p>Are you surely want to delete this comment ?</p>
                }
                <div className='DeleteConfirm__options'>
                    <button
                        onClick={isPost ? handleCloseDeleteConFirmPost : handleCloseDeleteConfirmComment}
                    >No</button>
                    <button
                        onClick={isPost ? handleRemovePost : handleRemoveComment}
                    >Yes</button>
                </div>
            </div>
        </div>

    </div>
  )
}

export default DeleteConfirm