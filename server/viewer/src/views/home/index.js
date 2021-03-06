import React from 'react';
import socket from '../../socket';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.setSites = this.setSites.bind(this);
  }

  componentDidMount() {
    socket.on('sites', this.setSites);
  }

  setSites(sites) {
    this.setState({ sites });
  }

  componentWillUnmount() {
    socket.removeListener('sites', this.setSites);
  }
  render() {
    let { sites = [] } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <ul>
          {sites.map(site => (
            <li key={site}>
              <Link to={`/view/site/${encodeURIComponent(site)}`}>{site}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
