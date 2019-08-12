import React, {Component} from "react";
import axios from 'axios';
import {AgencyHome} from "./AgencyHome";
import {Agency} from "../../models/agency";

interface Props {
    name: string
    id:string
}

interface State {
}

export class AgencyList extends Component<Props, State> {

    render() {
        return (
            <div>
                {this.props.name} | {this.props.id}
            </div>

        );
    }
}
