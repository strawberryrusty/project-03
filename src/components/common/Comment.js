import React from 'react'
import Auth from '../../lib/Auth'
import StarRatingComponent from 'react-star-rating-component'


const Comment = ({ user, createdAt, content, _id, handleCommentDelete, rating}) => {
  return (

    <div className="content table tableBorder">
      <table className="">
        <tbody>
          <tr>
            <td><span className="commentUser">User: {user.username}</span>
              {' '}<br />
              <small>Date: {(new Date(createdAt)).toLocaleDateString()}</small>
            </td>
            <td>
              {Auth.isAuthenticated() && <div className="deleteContainer">
                <button className="delete" id={_id} onClick= {handleCommentDelete}></button>
              </div>}
            </td>
          </tr>
          <tr>
            <td colSpan="2">Comment: <br />{content}
            </td>
          </tr>
          <tr>
            <td>
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
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  )
}

export default Comment
