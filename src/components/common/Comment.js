import React from 'react'
import Auth from '../../lib/Auth'
import StarRatingComponent from 'react-star-rating-component'


const Comment = ({ user, createdAt, content, _id, handleCommentDelete, rating}) => {
  return (
    <article className="media">
      <div className="media-content">
        <div className="content">
          <div>
            <strong>{user.username}</strong>
            {' '}
            <small>{(new Date(createdAt)).toLocaleDateString()}</small>
            <br />
            <small>Rating:</small>
            <div>
              <StarRatingComponent
                name="rate2"
                editing={false}
                renderStarIcon={() => <span><i className="fas fa-carrot"></i></span>}
                starColor={'rgb(255,140,0)'}
                emptyStarColor={'rgb(192,192,192)'}
                starCount={5}
                value={rating}
              />
            </div>
            <br />
            {content}
          </div>
        </div>
      </div>
      {Auth.isAuthenticated() && <div className="media-right">
        <button className="delete" id={_id} onClick= {handleCommentDelete}></button>
      </div>}
    </article>
  )
}

export default Comment
