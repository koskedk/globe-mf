import React from "react";
import {Component} from "react";
import {AppHeader} from "../components/AppHeader";
import {AppFooter} from "../components/AppFooter";

export class App extends Component<any,any> {
    render() {
        return (
            <div>
                <AppHeader/>
                <h1>Dashboard</h1>
                <AppFooter/>
            </div>
        );
    }
}
