import React from "react";
import { v4 as uuid } from "uuid";
import Styles from "./all.module.css"
import axios from "axios"

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      alert: false,
    };
  }


  handleSubmit = async () => {

    if(this.state.value !== ""){
      let payload = {
        id: uuid(),
        title: this.state.value,
        status: false,
      };
  
      await axios.post("https://todo-app-json-server.herokuapp.com/task", {...payload})
      .then((res)=>  {
          this.setState({
            alert:true,
            value: ""
          })
          this.timerId = setTimeout(() => {
            this.setState({
              alert:false
            })
          },2500)
        })
      .catch((error) => alert(error));
    }
    else{
      alert("Please Enter some value")
    }
    
  }



  

  render() {
    return (
      <div>
        <div className={Styles.todo_input_div}>
          <input
            className={Styles.todo_input}
            placeholder="Add a to-do here"
            value={this.state.value}
            onChange={(e) => this.setState({ value: e.target.value })}
            spellCheck="false"
          />
          <button className={Styles.todo_add} onClick={this.handleSubmit}>+</button>
          </div>
          {this.state.alert ? <h1 className={Styles.alert}>Task Added</h1> : null}
      </div>
      
    );
  }
}
