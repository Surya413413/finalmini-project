import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {Link} from 'react-router-dom'

import HeaderRoute from '../HeaderRoute'
import Footer from '../Footer'
import './index.css'

// const settings = {
//   dots: false,
//   infinite: false,
//   autoplay: true,
//   slidesToScroll: 1,
//   slidesToShow: 4,
//   responsive: [
//     {
//       breakpoint: 1024,
//       settings: {
//         slidesToShow: 3,
//         slidesToScroll: 1,

//       },
//     },
//     {
//       breakpoint: 786,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 1,
//       },
//     },
//   ],
// }

// //

const settings = {
  dots: true, // Show dots for better navigation
  infinite: true, // Enable infinite scrolling
  autoplay: true, // Auto slide
  autoplaySpeed: 3000, // 3 seconds for autoplay
  slidesToScroll: 1,
  slidesToShow: 4, // Default number of slides to show
  arrows: true, // Enable navigation arrows
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 786,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480, // Additional breakpoint for smaller screens
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'Failure',
  loading: 'LOADING',
}

class HomeRoute extends Component {
  state = {dataBooks: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getDataTopRated()
  }

  onClickTryAgain = () => {
    this.getDataTopRated()
  }

  getDataTopRated = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }
    const response = await fetch(url, option)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const filteredData = data.books.map(each => ({
        authorName: each.author_name,
        id: each.id,
        coverPic: each.cover_pic,
        title: each.title,
      }))
      this.setState({
        dataBooks: filteredData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderSuccess = () => {
    const {dataBooks} = this.state
    return (
      <ul className="unorderList-container">
        <Slider {...settings}>
          {dataBooks.map(each => {
            return (
              <Link
                className="nav-link"
                to={`/books/${each.id}`}
                key={`book-${each.id}`}
              >
                <li className="list-container">
                  <img src={each.coverPic} alt={each.title} className="img" />
                  <div className="list-inner-items">
                    <h1 className="title">{each.title}</h1>
                    <p className="paragraph">{each.authorName}</p>
                  </div>
                </li>
              </Link>
            )
          })}
        </Slider>
      </ul>
    )
  }

  renderFailure = () => (
    <div className="">
      <img
        src="https://res.cloudinary.com/dwsbjx12w/image/upload/v1694930693/Group_7522failureCase_ydyurk.png"
        alt="failure view"
      />
      <p className="">Something went wrong. Please try again</p>
      <button type="button" onClick={this.onClickTryAgain} className="">
        Try Again
      </button>
    </div>
  )

  renderTopRatedBooksSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.loading:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <HeaderRoute Home />
        <div className="home-container">
          <h1 className="">Find Your Next Favorite Books?</h1>
          <p className="">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <h1>Top Rated Books</h1>
          <Link to="/shelf">
            <button type="button" className="findbook-button">
              Find Books
            </button>
          </Link>
        </div>
        <div className="success-render">{this.renderTopRatedBooksSwitch()}</div>
        <Footer />
      </>
    )
  }
}
export default HomeRoute
