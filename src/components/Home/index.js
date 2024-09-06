import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

import TopRatedBookItem from '../TopRatedBookItem'
import Navbar from '../Navbar'
import ContactUs from '../ContactUs'

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
}

const Home = props => {
  const [booksList, setBooksList] = useState([])
  const [apiStatus, setApiStatus] = useState('inProgress')
  const [retry, setRetry] = useState(0)
  useEffect(() => {
    const getTopRatedBooks = async () => {
      console.log('Effect called')
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('jwt_token')}`,
        },
      }
      const response = await fetch(
        'https://apis.ccbp.in/book-hub/top-rated-books',
        options,
      )
      const data = await response.json()
      if (response.ok) {
        const updatedData = data.books.map(obj => ({
          id: obj.id,
          title: obj.title,
          authorName: obj.author_name,
          coverPic: obj.cover_pic,
        }))
        setBooksList(updatedData)
        setApiStatus('success')
      } else {
        setApiStatus('failed')
      }
    }
    getTopRatedBooks()
  }, [retry])

  const renderSuccessView = () => (
    <div className="carousel-container">
      <ul className="top-rated-books">
        <Slider {...settings}>
          {booksList.map(obj => (
            <TopRatedBookItem key={obj.id} details={obj} />
          ))}
        </Slider>
      </ul>
    </div>
  )

  const renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height="50" width="50" />
    </div>
  )

  const OnClickRetry = () => {
    setApiStatus('inProgress')
    setRetry(prevState => prevState + 1)
  }

  const onClickFindBooks = () => {
    const {history} = props
    history.replace('/shelf')
  }

  const renderFailureView = () => (
    <div className="loader-container">
      <img
        src="https://res.cloudinary.com/dh4tso4fh/image/upload/v1723632363/Group_7522_t6xcm0.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="title">Something went wrong. Please try again</p>
      <p className="author">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="find-btn" onClick={OnClickRetry}>
        Try Again
      </button>
    </div>
  )

  const renderTheViews = () => {
    switch (apiStatus) {
      case 'inProgress':
        return renderLoaderView()
      case 'success':
        return renderSuccessView()
      case 'failed':
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <div className="home-bg">
      <Navbar />
      <div className="home-container">
        <div className="container1">
          <h1 className="home-heading">Find Your Next Favorite Books?</h1>
          <p className="description">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <button className="find-btn" onClick={onClickFindBooks}>
            Find Books
          </button>
        </div>

        <div className="container2">
          <h1 className="home-heading2">Top Rated Books</h1>
          {renderTheViews()}
        </div>
        <ContactUs />
      </div>
    </div>
  )
}

export default Home
