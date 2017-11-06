// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as Highcharts from "highcharts";
import { withHighcharts, HighchartsChart, Chart, Title, Subtitle, Legend, XAxis, YAxis, LineSeries } from 'react-jsx-highcharts';

class Chartline extends React.Component {
    public render() {
        return (
            <HighchartsChart>
                <Chart />

                <Title>Solar Employment Growth by Sector, 2010-2016</Title>

                <Subtitle>Source: thesolarfoundation.com</Subtitle>

                <Legend layout="vertical" align="right" verticalAlign="middle" />

                <XAxis>
                    <XAxis.Title>Time</XAxis.Title>
                </XAxis>

                <YAxis id="number">
                    <YAxis.Title>Number of employees</YAxis.Title>
                    <LineSeries id="installation" name="Installation" data={[43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]} />
                    <LineSeries id="manufacturing" name="Manufacturing" data={[24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]} />
                    <LineSeries id="sales-distribution" name="Sales & Distribution" data={[11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]} />
                    <LineSeries id="project-development" name="Project Development" data={[null, null, 7988, 12169, 15112, 22452, 34400, 34227]} />
                    <LineSeries id="other" name="Other" data={[12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]} />
                </YAxis>
            </HighchartsChart>
        );
    }
}

    // Provide Highcharts object for library to interact with
    export default withHighcharts(Chartline, Highcharts);