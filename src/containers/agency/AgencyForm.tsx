import React, {Component} from 'react';
import * as uuid from "uuid";
import {Agency} from "../../models/agency";

interface Props {
    onFormSubmitted: any;
    agency: any
}

interface State {
    id: string,
    name: string,
    display: string
}

export class AgencyForm extends Component<Props, State> {


    componentDidMount(): void {
        const {id, name, display} = this.props.agency
        this.setState({
            id, name, display
        })
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        this.props.onFormSubmitted(this.state);
    }

    render() {
        return (
            <div>
                {this.state ?
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Id:<input type="text" value={this.state.id} name="id" readOnly
                                      onChange={event => this.setState({id: event.target.value})}/>
                        </label>
                        <label>
                            Name:<input type="text" value={this.state.name} name="name"
                                        onChange={event => this.setState({name: event.target.value})}/>
                        </label>
                        <label>
                            Display:<input type="text" value={this.state.display} name="display"
                                           onChange={event => this.setState({display: event.target.value})}/>
                        </label>

                        <button type="submit">Save</button>
                    </form> :
                    <div></div>
                }
            </div>);
    }

}
