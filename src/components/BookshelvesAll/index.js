import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import './index.css'
import Navbar from '../Navbar'
import BookshelfItem from '../BookshelfItem'
import ContactUs from '../ContactUs'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const TabItem = ({details, changeTab, same}) => {
  const {id, label} = details
  const onclickTab = () => {
    changeTab(id)
  }
  return (
    <li className="tab-item">
      <button
        className={same ? 'tab-btn-active' : 'tab-btn-inactive'}
        onClick={onclickTab}
      >
        {label}
      </button>
    </li>
  )
}

const TabItemLarge = ({details, changeTab, same}) => {
  const {id, label} = details
  const onclickTab = () => {
    changeTab(id)
  }
  return (
    <li>
      <button className="tab-lg-btn" onClick={onclickTab}>
        <p className={same ? 'tab-lg-active' : 'tab-lg-inactive'}>{label}</p>
      </button>
    </li>
  )
}

const BookShelvesAll = props => {
  const [booksList, setBooksList] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [clickSearch, setSearch] = useState(0)
  const [apiStatus, setApiStatus] = useState('inProgress')
  const [tabValue, setTabValue] = useState(bookshelvesList[0].value)

  const onChangeSearchInput = event => {
    if (event.key === 'Enter') {
      setSearch(prevState => prevState + 1)
    } else {
      setSearchInput(event.target.value)
    }
  }

  const changeTab = id => {
    const item = bookshelvesList.find(obj => obj.id === id)
    setTabValue(item.value)
  }

  const onClickSearch = () => {
    setSearch(prevState => prevState + 1)
  }

  const OnClickRetry = () => {
    setApiStatus('inProgress')
    setSearch(prevState => prevState + 1)
  }

  useEffect(() => {
    const getBooks = async () => {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('jwt_token')}`,
        },
      }
      const url = `https://apis.ccbp.in/book-hub/books?shelf=${tabValue}&search=${searchInput}`

      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok) {
        const updatedData = data.books.map(obj => ({
          id: obj.id,
          title: obj.title,
          authorName: obj.author_name,
          coverPic: obj.cover_pic,
          readStatus: obj.read_status,
          rating: obj.rating,
        }))

        setBooksList(updatedData)
        setApiStatus('success')
      } else {
        setApiStatus('failed')
      }
    }
    getBooks()
  }, [clickSearch, tabValue])

  const renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height="50" width="50" />
    </div>
  )

  const renderSuccessView = () => {
    if (booksList.length !== 0) {
      return (
        <>
          <div className="results-container">
            <ul className="all-books-container">
              {booksList.map(obj => (
                <BookshelfItem key={obj.id} details={obj} />
              ))}
            </ul>
          </div>

          <ul className="results-container-lg">
            {booksList.map(obj => (
              <BookshelfItem key={obj.id} details={obj} />
            ))}
          </ul>
        </>
      )
    }

    return (
      <div className="loader-container">
        <img
          src="https://res.cloudinary.com/dh4tso4fh/image/upload/v1723874456/Asset_1_1_iby6dq.png"
          alt=""
          className="search-failure-img"
        />
        <p className="author">
          Your search for {searchInput} didnot find any matches.
        </p>
      </div>
    )
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
    <>
      <Navbar />
      <div className="bookshelf-bg">
        <div className="shelf-container">
          <div className="search-input-container">
            <input
              type="search"
              className="search-input"
              onChange={onChangeSearchInput}
              onKeyDown={onChangeSearchInput}
              value={searchInput}
              placeholder="Search"
            />
            <div className="search-icon-container">
              <button className="search-btn" onClick={onClickSearch}>
                <BsSearch className="search-icon" />
              </button>
            </div>
          </div>
          <h1 className="shelf-heading">Bookshelves</h1>
          <ul className="tabs-container">
            {bookshelvesList.map(obj => (
              <TabItem
                key={obj.id}
                details={obj}
                changeTab={changeTab}
                same={tabValue === obj.value}
                value={obj.value}
              />
            ))}
          </ul>
          {renderTheViews()}
          <ContactUs />
        </div>

        <div className="bookshelf-lg-container">
          <div className="tabs-lg-container">
            <h1 className="shelf-heading">Bookshelves</h1>
            <ul className="tabs-list-lg">
              {bookshelvesList.map(obj => (
                <TabItemLarge
                  key={obj.id}
                  details={obj}
                  changeTab={changeTab}
                  same={tabValue === obj.value}
                  value={obj.value}
                />
              ))}
            </ul>
          </div>
          <div className="books-container-lg">
            <div className="search-container-lg">
              <h1 className="shelf-heading">All Books</h1>
              <div className="search-input-container">
                <input
                  type="search"
                  className="search-input"
                  onChange={onChangeSearchInput}
                  onKeyDown={onChangeSearchInput}
                  value={searchInput}
                  placeholder="Search"
                />
                <div className="search-icon-container">
                  <button className="search-btn" onClick={onClickSearch}>
                    <BsSearch className="search-icon" />
                  </button>
                </div>
              </div>
            </div>
            {renderTheViews()}
            <ContactUs />
          </div>
        </div>
      </div>
    </>
  )
}

export default BookShelvesAll
