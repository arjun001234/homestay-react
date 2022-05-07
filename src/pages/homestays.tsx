import SearchForm from '../components/forms/searchForm'
import Homestays from '../components/homestay/homestays'

const HomestaysPage = () => {

  return (
    <div className="homestay-container">
       <SearchForm />
       <Homestays />
    </div>
  )
}

export default HomestaysPage