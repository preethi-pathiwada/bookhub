import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import {FaStar} from 'react-icons/fa'

import './index.css'

import Navbar from '../Navbar'
import ContactUs from '../ContactUs'

const BookDetails = props => {
  const [bookItem, setBookItem] = useState({})

  useEffect(() => {
    const getBook = async () => {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('jwt_token')}`,
        },
      }

      const {match} = props
      const {params} = match
      const {id} = params

      const response = await fetch(
        `https://apis.ccbp.in/book-hub/books/${id}`,
        options,
      )
      if (response.ok) {
        const data = await response.json()
        const obj = data.book_details
        const updatedData = {
          id: obj.id,
          title: obj.title,
          coverPic: obj.cover_pic,
          rating: obj.rating,
          readStatus: obj.read_status,
          aboutAuthor: obj.about_author,
          aboutBook: obj.about_book,
          authorName: obj.author_name,
        }
        setBookItem(updatedData)
      }
    }

    getBook()
  }, [])

  return (
    <div className="book-item-container">
      <Navbar />

      <div className="top-container">
        <div className="about-book-con">
          <img src={bookItem.coverPic} alt="" className="book-detail-img" />
          <div className="details-con">
            <h1 className="book-name">{bookItem.title}</h1>
            <p className="book-author">{bookItem.authorName}</p>
            <div className="container">
              <p className="rating">Avg Rating</p>
              <FaStar className="star-icon" />
              <p className="book-author">{bookItem.rating}</p>
            </div>
            <div className="container">
              <p className="rating">Status: </p>
              <p className="status">{bookItem.readStatus}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="con">
        <div className="bottom-container">
          <h1 className="about-heading">About Book</h1>
          <p className="about-para">{bookItem.aboutBook}</p>

          <h1 className="about-heading">About Author</h1>
          <p className="about-para">{bookItem.aboutAuthor}</p>
        </div>
      </div>
      <ContactUs />
    </div>
  )
}

export default BookDetails
