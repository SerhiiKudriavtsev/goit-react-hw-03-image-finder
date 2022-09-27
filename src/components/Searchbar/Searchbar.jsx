import propTypes from 'prop-types';
import { Component } from "react";
import {
  Header,
  SearchForm,
  Input,
  Button,
  SearchIcon,
  Label,
  Select,
} from "./Searchbar.styled";
// import PrePage from "components/PrePage/PrePage";

export default class Searchbar extends Component {
  state = {
    wordSearch: '',
    prePage: 20,
  }

  handleSubmit = event => {
    event.preventDefault();

    if(this.state.wordSearch.trim() === '') {
      alert("Введіть слово для пошуку")
      return;
    }

    this.props.onSearchWord(this.state.wordSearch);
    this.props.onPrePage(this.state.prePage);
    this.setState({ wordSearch: '' });
  };

  handleWordChange = event => {
    this.setState({wordSearch: event.currentTarget.value.toLowerCase(),});    
  };

  handleChange = event => {
    if(this.state.wordSearch !== ''){
    this.setState({ prePage: event.currentTarget.value });
  }};


  render() {

return (
  <div>
    <Header>
      <SearchForm  onSubmit={this.handleSubmit}>
        <Button  type="submit" className="button">
          <span ><SearchIcon /></span>
        </Button>

        <Input
          className="input"
          type="text"
          name="wordSearch"
          value={this.state.wordSearch}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={this.handleWordChange}
        />
        <Label>
            <Select value={this.state.prePage} name="prP" onChange={this.handleChange}>
              <option value="20">20</option>
              <option value="40">40</option>
              <option value="60">60</option>
              <option value="80">80</option>
              <option value="100">100</option>
          </Select>
          on page
          </Label>
      </SearchForm>
      {/* <PrePage onPrePage={this.prePage} /> */}
    </Header>
  </div>
  )}
}
  
Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};