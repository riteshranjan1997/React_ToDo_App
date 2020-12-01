import React from "react";
import Styles from "./all.module.css";
import axios from "axios"
import { Link } from "react-router-dom"

export default class Tasks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            activePage: 1,
            perPage: 5,
        }
    }

    componentDidMount() {
        this.fetchTodo()
    }

    fetchTodo = async () => {
        await axios
            .get("https://todo-app-json-server.herokuapp.com/task")
            .then((res) => {
                this.setState({
                    data: res.data,
                });
            })
            .catch((error) => alert(error));
    };

    handlePageChange = (page) => {
        this.setState({
            activePage: page
        })
    }

    render() {
        const { activePage, perPage, data } = this.state
        const totalPages = Math.ceil(this.state.data.length / perPage)
        const CompletedTask = data.filter(elem => elem.status ).length || 0
        const notCompletedTask = data.filter(elem => !elem.status ).length || 0
        const totalTask = data.length || 0
        return (

            <div className={Styles.all_task_div}>

        <p className={Styles.status_bar}>Completed Tasks:{CompletedTask} || Not Completed Tasks:{notCompletedTask} || Total Task:{totalTask}</p>

                {data && this.state.data.filter((elem, index) => {
                    const offset = (activePage - 1) * perPage
                    const pageCondition = index >= offset && index < offset + perPage
                    return pageCondition
                }).map((item) => (

                    <Link style={{textDecoration: "none", color:"black"}} to={`/tasks/${item.id}`}>
                        <div className={Styles.tasks_div} key={item.id}>
                            <p
                                className={item.status ? `${Styles.done} ${Styles.task}` : Styles.task}
                            >
                                {item.title}
                            </p>

                        </div>
                    </Link>
                ))}
    
                <div className={Styles.page_btn_div}>
                    {
                        new Array(totalPages).fill(0).map((a, i) => <button className={Styles.page_btn} key={i} onClick={() => this.handlePageChange(i + 1)}>{i + 1}</button>)
                    }
                </div>
            </div>
        )
    }

}

