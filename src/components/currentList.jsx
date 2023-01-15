import { Component } from "react";

export class List extends Component {
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
  }

  deleteItem(e) {
    console.log(e.target);
    this.props.delete(e.target.id);
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
              {/* `${this.props.sectionTitle}${index}` */}
              {item.content}
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
