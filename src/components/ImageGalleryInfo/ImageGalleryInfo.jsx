import { Component } from "react";

// const Status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };

export default class ImageGalleryInfo extends Component {
  state = {
    // searchWord: null,
    searchedImages: [],
    status: 'idle',
    loading: false,
    error: null,
  }

  async componentDidUpdate(prevProps, prevState) {
    if(prevProps.searchWord !== this.props.wordSearch) {
      this.setState({loading: true, error: null});
      await fetch(`https://pixabay.com/api/?q=${this.props.wordSearch}&page=1&key=29091734-9e049dbec053396241aa2e5c2&image_type=photo&orientation=horizontal&per_page=20`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`Немає зображення за пошуковим словом ${this.props.wordSearch}`)
          )
        })
        .then(searchedImages => this.setState({searchedImages}))
        .catch(error => this.setState({error}))
        .finally(() => this.setState({loading: false}));
      }
      if(prevState.searchedImages !== this.state.searchedImages) {
        this.props.qqq(this.state.searchedImages);
      }
    }
    
    // this.props.qqq(this.state.searchedImages);
    render() {
    return (
      <div>
        {this.state.error && <h1>{this.state.error.message}</h1>}
        {this.state.error && <h1>Халепа, за пошуком {this.props.pokemonName} нічого не знайдено.</h1>}
        {this.state.loading && <h2>Loading...</h2>}
        {!this.props.searchWord && <div>Введіть слово для пошуку.</div>}
        {
        <div>
          <h2>Result:</h2>
          <h3>{this.state.searchedImages.id}</h3>
          <img
            src={this.state.searchedImages.webformatURL}
            alt={this.state.searchedImages.tags}
            width="240"
          />
        </div>}
      </div>
    )
  }
}