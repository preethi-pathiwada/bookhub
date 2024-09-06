import {Link} from 'react-router-dom'

import './index.css'

const TopRatedBookItem = ({details}) => {
  const {id, title, coverPic, authorName} = details

  return (
    <Link to={`/books/${id}`} className="link">
      <li className="top-rated-book">
        <img src={coverPic} className="cover-pic" alt={title} />
        <h1 className="title">{title}</h1>
        <p className="author">{authorName}</p>
      </li>
    </Link>
  )
}

export default TopRatedBookItem
