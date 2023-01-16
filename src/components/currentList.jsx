import { Component } from "react";

export class List extends Component {
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
    this.changeDone = this.changeDone.bind(this);
  }

  deleteItem(e) {
    this.props.delete(e.target.id);
  }

  changeDone(e) {
    this.props.toggleDone(e.target.value);
  }

  render() {
    return (
      <ul className="list-group">
        {this.props.items.map((item, index) => {
          return (
            <li
              className={`list-group-item ${
                item.done ? "list-group-item-light" : "list-group-item-dark"
              }
               d-flex justify-content-between`}
              key={index}
            >
              <input
                className="form-check-input me-1"
                type="checkbox"
                value={index}
                id="firstCheckbox"
                onClick={this.changeDone}
              />
              <div>{item.content}</div>
              <button
                className="btn btn-outline-danger"
                id={index}
                onClick={this.deleteItem}
              >
                x
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}
