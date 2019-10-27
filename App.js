import "./App.css";
import React, { Component } from "react";
import ListElement from "./components/ListElement";

//trasformare function component in un class component
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: "", //7
      tasklist: [] //[1,2,3] => [[1,2,3],5]  => ["fare la spesa", "task 2"] // [1,2] dopo il filter
    };
  }

  handleChange = event => {
    this.setState({
      task: event.target.value
    });
  };

  handleAddTask = () => {
    if (this.state.task.length >= 4)
      this.setState({
        tasklist: [this.state.task, ...this.state.tasklist], //this.state.tasklist.concat(this.state.task)
        task: ""
      });
    //DA NON FARE MAI NELLA VITA
    //[this.state.tasklist, this.state.task], //[[1,2,3],5] => [[[1,2,3],5],7]
    //CORRETTO
    //[...this.state.tasklist, this.state.task] => [1,2,3,7]
  };

  handleDelete = index => {
    //CON TASK
    //BUG 2 NOMI UGUALI
    //["fare la spesa","fare la spesa","spazzatura","altro"]
    //dopo il filter ["spazzatura", "altro"]
    /*  this.setState({
      tasklist: this.state.tasklist.filter(current => current !== task) //[1] => [1,2] => [1,2]
    }); */

    //CON INDEX
    //["fare la spesa", "task 2", "TASK 3", "task 4"] => voglio eleminare indice 1
    //...this.state.tasklist.slice(0, index) => ["fare la spesa"]
    //...this.state.tasklist.slice(index+1) => ["TASK 3", "task 4"]
    //["fare la spesa","TASK 3", "task 4"]
    this.setState({
      tasklist: [
        ...this.state.tasklist.slice(0, index),
        ...this.state.tasklist.slice(index + 1)
      ]
    });
  };

  render() {
    return (
      <div className="App-header">
        <div className="container" style={{ marginTop: "20vh" }}>
          <div className="row no-gutters">
            <div className="col-md-6 offset-md-2">
              <input
                className="py-1 w-100 px-2"
                type="text"
                value={this.state.task}
                //document.querySelector("input").addEventLister("change", myFunc)
                onChange={this.handleChange}
                name="task"
                label="task"
                placeholder="Insert a task"
              />
            </div>
            <div className="col-md-2">
              <button
                //docount.getElemetById("mioId").addEventLister("click", myFunc)
                onClick={this.handleAddTask}
                className="btn btn-info btn-lg w-100"
              >
                ADD A TASK
              </button>
            </div>
          </div>
          {this.state.tasklist.length > 0 && (
            <div className="row no-gutters">
              {this.state.tasklist.map((current, index) => (
                <ListElement
                  key={index}
                  deleteTask={this.handleDelete}
                  task={current}
                  currentIndex={index}
                />
                //APP.JS passa delle props al figlio
                //dal figlio passo delle props al padre
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}
