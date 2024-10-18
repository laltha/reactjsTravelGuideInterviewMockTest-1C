// Home.js
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Location from '../Location'
import './index.css'

class Home extends Component {
  state = {locationList: [], isLoading: false}

  componentDidMount() {
    this.apiUrlFetch() // Call the API when the component mounts
  }

  // Fetch data from the API
  apiUrlFetch = async () => {
    this.setState({isLoading: true}) // Start the loader
    const url = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const fetchedData = await response.json()

      // Mapping the API response to a simplified structure
      const responseData = fetchedData.packages.map(location => ({
        id: location.id,
        name: location.name,
        imageUrl: location.image_url,
        description: location.description,
      }))

      this.setState({
        locationList: responseData,
        isLoading: false, // Stop the loader once data is fetched
      })
    }
  }

  // Render the list of locations
  renderLocationList = () => {
    const {locationList} = this.state
    return (
      <ul className="ul-container">
        {locationList.map(location => (
          <Location key={location.id} locationData={location} />
        ))}
      </ul>
    )
  }

  // Render the loading spinner
  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  // Main render method
  render() {
    const {isLoading} = this.state
    return (
      <div className="app-container">
        <h1 className="travel-heading">Travel Guide</h1>
        <hr className="horizontal-line" />
        <div className="locations-container">
          {isLoading ? this.renderLoader() : this.renderLocationList()}
        </div>
      </div>
    )
  }
}

export default Home
