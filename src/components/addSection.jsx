import { Component } from "react";

export class AddSection extends Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({ ...this.state, input: e.target.value });
  }

  handleClick() {
    this.props.saveSection(this.state.input);
    this.setState({ input: "" });
  }

  render() {
    return (
      <div className="addSection input-group input-group-lg">
        <input
          type="text"
          className="form-control"
          placeholder="New section name"
          value={this.state.input}
          onChange={this.handleChange}
          maxLength={50}
        />
        <span
          className="input-group-text"
          id="inputGroup-sizing-lg"
          onClick={this.handleClick}
        >
          save
        </span>
      </div>
    );
  }
}
