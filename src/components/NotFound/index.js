import './index.css'

const NotFound = props => {
  const gotoHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <div className="notfound-con">
        <img
          src="https://res.cloudinary.com/dh4tso4fh/image/upload/v1723884882/Group_7484_zjifyn.png"
          alt="not found"
          className="not-found-img"
        />
        <h1 className="about-heading heading2">Page Not Found</h1>
        <p className="about-para para2">
          We are sorry, the page you requested could not be found. Please go
          back to the homepage.
        </p>
        <button className="find-btn btn" onClick={gotoHome}>
          Go to HomePage
        </button>
      </div>
    </div>
  )
}

export default NotFound
