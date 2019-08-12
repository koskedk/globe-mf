import React, {Component} from "react";
import {AgencyList} from "./AgencyList";
import axios from "axios";
import {Agency} from "../../models/agency";

interface Props {
}

interface State {
    agencies: []
}

export class AgencyHome extends Component<Props, State> {

    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            agencies: []
        };
    }

    async componentDidMount() {
        let res = await axios.get("http://localhost:3001/practices");
        let data = res.data;
        this.setState({agencies: data});
    }

    render() {
        return (
            <div>
                Agency Home
                <hr/>
                {this.state.agencies?this.state.agencies.map(({id,name})=><AgencyList key={id} name={name} id={id}/>):<div>xxx</div>}
            </div>);
    }
}
