import React, {Component} from "react";
import axios from 'axios';
import {AgencyHome} from "./AgencyHome";
import {Agency} from "../../models/agency";

interface Props {
    agencies: Agency[]
    onEdit: any,
    onDelete: any
}

interface State {
}

export class AgencyList extends Component<Props, State> {

    edit = (event: any, data: any) => {
        event.preventDefault();
        this.props.onEdit(data);
    }

    delete = (event: any, data: any) => {
        event.preventDefault();
        this.props.onDelete(data);
    }

    render() {
        const agencyList = this.props.agencies.map(a =>
            <li key={a.id}>{a.name}|{a.id}
                <button onClick={(event) => this.edit(event, a)}>./</button>
                <button onClick={(event) => this.delete(event, a)}>X</button>
            </li>
        );

        return (
            <ul>
                {agencyList}
            </ul>
        );
    }
}
