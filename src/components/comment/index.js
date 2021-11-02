import React from 'react'
import './style.css'

function Comment({ comments }) {
    return comments.map((e) =>
        
            <div className="card commentCard">
                <div className="contentComment">
                    {e.content}
                </div>
                <div className="authorComment">
                    {e.user.firstName + " " + e.user.lastName}
                </div>
            </div>
        

    )
}

export default Comment
