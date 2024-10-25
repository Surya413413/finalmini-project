import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'

import HeaderRoute from '../HeaderRoute'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class BookDetails extends Component {
  state = {
    bookDetailsData: [],
    apistatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getShelfData()
  }

  onClickTryAgain = () => {
    this.getShelfData()
  }

  getShelfData = async () => {
    this.setState({apistatus: apiStatusConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const filteredBookdData = {
        id: data.book_details.id,
        aboutAuthor: data.book_details.about_author,
        aboutBook: data.book_details.about_book,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        rating: data.book_details.rating,
        readStatus: data.book_details.read_status,
        title: data.book_details.title,
      }

      this.setState({
        apistatus: apiStatusConstants.success,
        bookDetailsData: filteredBookdData,
      })
    } else {
      this.setState({apistatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

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

  renderSuccess = () => {
    const {bookDetailsData} = this.state
    const {
      id,
      authorName,
      aboutAuthor,
      aboutBook,
      coverPic,
      rating,
      readStatus,
      title,
    } = bookDetailsData
    return (
      <div className="success-container">
        <h1>{title}</h1>
        <img src={coverPic} alt={title} />
        <p>{authorName}</p>
        <h1>About Author</h1>
        <p>{aboutAuthor}</p>
        <h1>About Book</h1>
        <p>{aboutBook}</p>
        <p>Avg Rating</p>
        <BsFillStarFill />
        <p>{rating}</p>
        <p>Status: {readStatus}</p>
      </div>
    )
  }

  finalRender = () => {
    const {apistatus} = this.state
    switch (apistatus) {
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
      <div>
        <HeaderRoute />

        <div className="bookdetails-container">{this.finalRender()}</div>
        <Footer />
      </div>
    )
  }
}

export default BookDetails
