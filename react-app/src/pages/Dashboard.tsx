import React, {useEffect} from 'react';
import Nav from "../components/Nav";
import Wrapper from "../components/Wrapper";
import * as c3 from 'c3';
import axios from 'axios';

const Dashboard = () => {
    useEffect(() => {
        const chart = c3.generate({
            bindto: '#chart',
            data: {
                x: 'x',
                columns: [
                    ['x'],
                    ['Sales']
                ],
                type: 'bar'
            },
            bar: {
                width: {
                    ratio: 0.1 // this makes bar width 50% of length between ticks
                }
                // or
                //width: 100 // this makes bar width 100px
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: "%b-%d"
                    }
                },

            }
        });


        (
            async () => {
                const {data} = await axios.get('chart');
                chart.load({
                    columns: [
                        ['x', ...data.map((d: any) => d.date)],
                        ['Sales', ...data.map((d: any) => d.sale)]
                    ]
                });
            }
        )();
    }, []);
    return (
        <div>
            <Wrapper>
                {/*<Nav/>*/}
                <h2>Daily Sales</h2>
                <div id="chart"></div>
            </Wrapper>
        </div>
    );
}

export default Dashboard;