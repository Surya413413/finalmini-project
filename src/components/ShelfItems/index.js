import {BsFillStarFill} from 'react-icons/bs'
import './index.css'
const ShelfItems = props => {
  const {bookItems} = props
  const {id, title, readStatus, rating, authorName, coverPic} = bookItems
  return (
    <li className="list-container">
      <img src={coverPic} alt={title} className="piccover" />
      <h1 className="title">{title}</h1>
      <p>{authorName}</p>
      <BsFillStarFill />
      <p>Avg Rating</p>
      <p>{rating}</p>
      <p>
        Status <span>{readStatus}</span>
      </p>
    </li>
  )
}
export default ShelfItems
