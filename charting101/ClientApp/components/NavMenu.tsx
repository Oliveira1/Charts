import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div className='main-nav'>
                <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={ '/' }>charting101</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink exact to={ '/' } activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/counter' } activeClassName='active'>
                                <span className='glyphicon glyphicon-education'></span> Counter
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/fetchdata' } activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Fetch data
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/fetchtransaction'} activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Fetch Transaction entries
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to={'/helloWorld'} activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> My Hello World
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/chart'} activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Chart
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/buttons'} activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Chart
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}
