import React from "react"
import axios from "axios"
import Styles from "./all.module.css"


export default class TaskEdit extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:"",
            data:"",
        }

    }

    componentDidMount(){
        this.fetchTask()
    }


    fetchTask = async () => {
        await axios
            .get(`https://todo-app-json-server.herokuapp.com/task?id=${this.props.match.params.id}`)
            .then((res) => {
                this.setState({
                    value: res.data[0].title
                });
            })
            .catch((error) => alert(error));
    };

    handleUpdate = async () => {
        console.log(this.props.match)
       await axios.patch('https://todo-app-json-server.herokuapp.com/task/'+ this.props.match.params.id, { title:this.state.value })
            .then(res =>   this.props.history.goBack() ).catch(err => alert(err))
    }

    render(){
        return(
            <div style={{textAlign:"center", marginTop:"50px"}}>
            <input
            className={Styles.edit_input}
            value={this.state.value}
            onChange={(e) => this.setState({ value: e.target.value })}
            spellCheck="false"
          />
         <button onClick={this.handleUpdate} className={Styles.btn} style={{backgroundColor:"#F1C40F "}}>Update</button>
          </div>
        )
    }
  
}