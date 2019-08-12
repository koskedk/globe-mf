import React, {Component} from "react";
import {FacilityList} from "./FacilityList";

interface Props {
}

interface State {
}

export class FacilityHome extends Component<Props, State> {
    render() {
        return (
            <div>
                Facility Home
                <FacilityList></FacilityList>
            </div>);
    }
}
