import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
/* import { robots } from './robots'; */
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';


function App() {
    /*     constructor() {
            super()
            this.state = {
                robots: [],
                searchfield: ''
            }
        }
     */

    const [robots, setRobots] = useState([])
    const [searchfield, setSearchfield] = useState("")

    /*     componentDidMount() {
            fetch('https://jsonplaceholder.typicode.com/users')
                .then(response => response.json())
                .then(users => this.setState({ robots: users }));
    
            console.log("React version - ", React.version);
        } */

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => setRobots(users));

        console.log("React version - ", React.version);
        console.log("Using hooks");
    }, [])

    const onSearchChange = (event) => {
        /*     this.setState({ searchfield: event.target.value }) */
        setSearchfield(event.target.value)
    }

    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase())
    })

    if (robots.length === 0) {
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
export default App;