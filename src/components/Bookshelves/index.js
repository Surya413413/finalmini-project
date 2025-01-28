import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import ShelfItems from '../ShelfItems'
import HeaderRoute from '../HeaderRoute'
import Footer from '../Footer'

import './index.css'

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

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Bookshelves extends Component {
  state = {
    shelfData: {},
    apistatus: apiStatusConstants.initial,
    activeValue: bookshelvesList[0].value,
    activeLabel: bookshelvesList[0].label,
    searchInput: '',
    search: '',
  }

  componentDidMount() {
    this.getShelfData()
  }

  onChnageSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearchBooks = () => {
    this.setState(privous => ({search: privous.searchInput}), this.getShelfData)
  }

  onClickTryAgain = () => {
    this.getShelfData()
  }

  filterData = books =>
    books.map(each => ({
      id: each.id,
      authorName: each.author_name,
      coverPic: each.cover_pic,
      rating: each.rating,
      readStatus: each.read_status,
      title: each.title,
    }))

  getShelfData = async () => {
    this.setState({apistatus: apiStatusConstants.loading})
    const {activeValue, search} = this.state
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${activeValue}&search=${search}`
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
      const filteredShelfData = {
        books: this.filterData(data.books),
        total: data.total,
      }

      this.setState({
        apistatus: apiStatusConstants.success,
        shelfData: filteredShelfData,
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

  renderListBooks = () => {
    const {shelfData} = this.state
    const {books} = shelfData
    return (
      <ul className="unorder-items">
        {books.map(each => (
          <ShelfItems bookItems={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderNoBooks = () => {
    const {searchInput} = this.state
    return (
      <div>
        <img
          src="https://res.cloudinary.com/dkxxgpzd8/image/upload/v1647250727/Screenshot_30_uavmge.png"
          alt="no books"
        />
        <p>Your search for {searchInput} did not find any matchess.</p>
      </div>
    )
  }

  renderSuccess = () => {
    const {shelfData} = this.state
    const {total} = shelfData
    if (total !== 0) {
      return this.renderListBooks()
    }
    return this.renderNoBooks()
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
    const {activeValue, searchInput, activeLabel} = this.state
    return (
      <>
        <HeaderRoute />
        <div className="Bookshelves-container">
          <h1>Bookshelves</h1>

          <ul className="unorder-labels">
            {bookshelvesList.map(each => {
              const onclickActive = () => {
                this.setState(
                  {
                    activeLabel: each.label,
                    activeValue: each.value,
                  },
                  this.getShelfData,
                )
              }
              return (
                <li key={each.label} className="list-container-items">
                  <button
                    type="button"
                    onClick={onclickActive}
                    className="shelf-buttons"
                  >
                    {each.label}
                  </button>
                </li>
              )
            })}
          </ul>

          <div>
            <div>
              <h1>{activeLabel} books</h1>
            </div>
            <div style={{position: 'relative', width: '100%'}}>
              <input
                type="search"
                placeholder="Search"
                onChange={this.onChnageSearch}
                value={searchInput}
                style={{
                  padding: '10px 40px 10px 10px',
                  width: '100%',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                }}
              />
              <BsSearch
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '10px',
                  transform: 'translateY(-50%)',
                  color: '#aaa',
                  cursor: 'pointer',
                }}
                onClick={this.onSearchBooks}
              />
            </div>
          </div>
          {this.finalRender()}
        </div>
        <Footer />
      </>
    )
  }
}

export default Bookshelves
