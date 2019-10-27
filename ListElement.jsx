import React, { Component } from "react";

export default class ListElement extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <div className="col-md-6 offset-md-2">{this.props.task}</div>
        <div className="col-md-2">
          <button
            onClick={() => this.props.deleteTask(this.props.currentIndex)}
            className="btn btn-info btn-lg w-100"
          >
            {" "}
            REMOVE
          </button>
        </div>
      </>
    );
  }
}
