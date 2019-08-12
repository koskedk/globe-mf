import React, {Component} from "react";
import {AgencyList} from "./AgencyList";
import axios from "axios";
import {Agency} from "../../models/agency";
import {AgencyForm} from "./AgencyForm";

interface Props {

}

interface State {
    agencies: []
    showForm: boolean;
    actionLabel: string;
    activeAgency: Agency;
}

export class AgencyHome extends Component<Props, State> {

    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            agencies: [],
            showForm: false,
            actionLabel: '+',
            activeAgency: {
                id: '00000000-0000-0000-0000-000000000000',
                name: '',
                display: ''
            }
        };
    }

    loadData = async () => {
        let res = await axios.get("http://localhost:3001/practices");
        let data = res.data;
        this.setState({agencies: data});
    }

    componentDidMount() {
        this.loadData()
    }

    showForm = (event: any) => {
        event.preventDefault();
        this.setState({
            showForm: !this.state.showForm,
            actionLabel: this.state.actionLabel === '+' ? 'X' : '+'
        })
    }

    saveAgency = async (data: any) => {
        if (!data) {
            data = this.state.activeAgency;
        }
        console.log('post>', data);
        this.setState({
            showForm: false,
            actionLabel: 'saving...'
        })

        let res = await axios.post("http://localhost:3001/practices", data);
        let savedAgency = res.data;
        console.log(`saved ${savedAgency}`);

        this.loadData();

        this.setState({
            showForm: false,
            actionLabel: '+'
        })
    }

    editAgency = async (data: any) => {
        console.log('editing... >', data);
        this.setState({
            showForm: true,
            actionLabel: 'X',
            activeAgency: data
        })
    }

    deleteAgency = async (data: any) => {
        console.log('deleting... >', data);
        let res = await axios.delete(`http://localhost:3001/practices/${data.id}`);
        this.loadData();
    }


    render() {
        return (
            <div>
                Agency Home <button onClick={this.showForm}>{this.state.actionLabel}</button>
                <hr/>
                {this.state.showForm ?
                    <AgencyForm onFormSubmitted={this.saveAgency} agency={this.state.activeAgency}/> :
                    <div></div>}
                {this.state.agencies ?
                    <AgencyList agencies={this.state.agencies} onDelete={this.deleteAgency} onEdit={this.editAgency}/> :
                    <div>xxx</div>}
            </div>);
    }
}
