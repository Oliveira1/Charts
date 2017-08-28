// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

export interface HelloProps { comp: string;  }

export default class Hello extends React.Component<HelloProps, {}> {
    public render() {
        return <h1>Hello from {this.props.comp} !</h1>;
    }
}
