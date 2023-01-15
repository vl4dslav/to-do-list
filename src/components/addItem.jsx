import { Component } from "react";

export class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      content: "",
    };
    this.openInput = this.openInput.bind(this);
    this.addNewContent = this.addNewContent.bind(this);
  }

  openInput() {
    this.setState({
      ...this.state,
      visible: !this.state.visible,
    });
  }

  addNewContent() {
    this.props.addContent(this.state.content);
    this.setState({
      visible: false,
      content: "",
    });
  }

  render() {
    return (
      <div className="addItem">
        <div className="d-flex justify-content-between">
          <div>{this.props.sectionName}</div>
          <button className="btn btn-light" onClick={this.openInput}>
            +
          </button>
        </div>
        {this.state.visible ? (
          <div class="input-group mb-3">
            <span
              class="input-group-text"
              id="inputGroup-sizing-default"
              onClick={this.addNewContent}
            >
              save
            </span>
            <input
              type="text"
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              value={this.state.content}
              onChange={(e) => {
                this.setState({
                  ...this.state,
                  content: e.target.value,
                });
              }}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}
