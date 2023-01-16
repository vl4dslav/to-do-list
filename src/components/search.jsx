import { Component } from "react";

export class Search extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      searchRequest: "",
    };
  }

  handleChange(e) {
    const searchRequest = e.target.value;
    this.setState({
      ...this.state,
      searchRequest,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.changeSearchRequest(this.state.searchRequest);
  }

  render() {
    return (
      <div className="search">
        <form onSubmit={this.handleSubmit} className="search-form">
          <input
            type="search"
            maxLength={50}
            onChange={this.handleChange}
            value={this.searchRequest}
            className="input-group mb-3"
          />
          <button type="submit">search</button>
        </form>
      </div>
    );
  }
}
