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
    console.log("sasf");
    this.props.changeSearchRequest(this.state.searchRequest);
  }

  render() {
    return (
      <div className="search">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="search">{/*loop svg img */}</label>
          <input
            type="search"
            id="search"
            onChange={this.handleChange}
            value={this.searchRequest}
          />
          <button type="submit">search</button>
        </form>

        {this.state.searchRequest ? <h2>{this.state.searchRequest}</h2> : <></>}
      </div>
    );
  }
}
