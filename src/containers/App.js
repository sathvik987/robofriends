import React, { useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
/* import { robots } from './robots'; */
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';

import { connect } from 'react-redux';
import { setSearchField, requestRobots } from '../store/actions';

import './App.css';

const mapStateToProps = (state) => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDisptachToProps = (dispatch) => {
    return {
        onSearchChange: (event) => {
            dispatch(setSearchField(event.target.value))
        },
        onRequestRobot: () => dispatch(requestRobots())
    }
}

function App(props) {
    /*     constructor() {
            super()
            this.state = {
                robots: [],
                searchfield: ''
            }
        }
     */

    /*    const [searchfield, setSearchfield] = useState("") */
    const { searchField, onSearchChange, robots, isPending } = props

    /*     componentDidMount() {
            fetch('https://jsonplaceholder.typicode.com/users')
                .then(response => response.json())
                .then(users => this.setState({ robots: users }));
    
            console.log("React version - ", React.version);
        } */

    useEffect(() => {
        props.onRequestRobot()
        console.log("React version - ", React.version);
        console.log("Using hooks");
    }, [])

    /*     const onSearchChange = (event) => {
            setSearchfield(event.target.value)
        } */

    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase())
    })

    if (isPending) {
        return <h1>Loading</h1>
    }
    else {
        return (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundary>
                </Scroll>
            </div>
        );
    }

}
export default connect(mapStateToProps, mapDisptachToProps)(App);