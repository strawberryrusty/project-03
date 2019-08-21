import React from 'react'
import Auth from '../../lib/Auth'
import StarRatingComponent from 'react-star-rating-component'


const Comment = ({ user, createdAt, content, _id, handleCommentDelete, rating}) => {
  return (

    <div className="content">
      <div>
        <table className="table">
          <tbody>
            <tr>
              <td><span className="commentUser">{user.username}</span>
                {' '}
                <small>{(new Date(createdAt)).toLocaleDateString()}</small>
              </td>

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

              <td>
                {Auth.isAuthenticated() && <div className="deleteContainer">
                  <button className="delete" id={_id} onClick= {handleCommentDelete}></button>
                </div>}
              </td>

            </tr>
            <tr>
              <td colSpan="3">{content}
              </td>
            </tr>
          </tbody>
        </table>

        <hr />

      </div>
    </div>

  )
}

export default Comment
