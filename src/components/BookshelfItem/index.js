import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import './index.css'

const BookshelfItem = ({details}) => {
  const {id, title, coverPic, authorName, rating, readStatus} = details
  return (
    <Link to={`/books/${id}`} className="shelf-link">
      <li className="bookshelf-item">
        <img src={coverPic} alt="" className="cover-img" />
        <div className="details-container">
          <h1 className="book-name">{title}</h1>
          <p className="book-author">{authorName}</p>
          <div className="container">
            <p className="rating">Avg Rating</p>
            <FaStar className="star-icon" />
            <p className="book-author">{rating}</p>
          </div>
          <div className="container">
            <p className="rating">Status: </p>
            <p className="status">{readStatus}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default BookshelfItem
