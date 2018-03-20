import _ from 'lodash';
import React, { Component } from 'react';
import sortByDistance from 'sort-by-distance';
import { connect } from 'react-redux';
import { fetchClouds, changeProvider, changeLocation, sortByLocation, updateClouds, sortChange } from '../actions/index';

class App extends Component {
  componentDidMount() {
    this.props.fetchClouds();
  }

  renderClouds(cloud) {
    const { provider, location } = this.props;
    const returnRow = (
      <tr key={cloud.cloud_description}>
        <th>{cloud.cloud_description}</th>
        <th>{cloud.cloud_name}</th>
        </tr>
      );

    if (provider === 'null' && location === 'null') {
      return returnRow;
    }
    if (provider !== 'null' && _.includes(cloud.cloud_description, provider) && location === 'null') {
      return returnRow;
    }
    if (provider === 'null' && location !== 'null' && _.includes(cloud.cloud_description, location)) {
      return returnRow;
    }
    if (provider !== 'null' && location !== 'null' && _.includes(cloud.cloud_description, provider) && _.includes(cloud.cloud_description, location)) {
      return returnRow;
    }
  }

  sortByCords() {
    const { clouds, sorted } = this.props;
    const opts = {
      yName: 'geo_latitude',
      xName: 'geo_longitude'
    };

    navigator.geolocation.getCurrentPosition(position =>
    this.props.updateClouds(sortByDistance({geo_latitude: position.coords.latitude, geo_longitude: position.coords.longitude}, clouds, opts)));
    this.props.sortChange(!sorted);
  }

  sortByName() {
    const { clouds, sorted } = this.props;

    this.props.updateClouds(_.sortBy(clouds, ['cloud_description']));
    this.props.sortChange(!sorted);
  }

  renderButton() {
    if (!this.props.sorted) {
      return (
        <button className="btn btn-primary" onClick={this.sortByCords.bind(this)}>
          Sort By Distance
        </button>
      );
    }
    return (
      <button className="btn btn-primary" onClick={this.sortByName.bind(this)}>
        Sort By Name
      </button>
    );
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <label>
            Provider
            <select className="form-control" value={this.props.provider} onChange={this.props.changeProvider}>
              <option value="null">Select</option>
              <option value="Amazon Web Services">Amazon</option>
              <option value="Azure">Azure</option>
              <option value="DigitalOcean">DigitalOcean</option>
              <option value="Google Cloud">Google Cloud</option>
              <option value="UpCloud">UpCloud</option>
            </select>
          </label>
          <label>
            Location
            <select className="form-control" value={this.props.location} onChange={this.props.changeLocation}>
              <option value="null">Select</option>
              <option value="Asia">Asia</option>
              <option value="Australia">Australia</option>
              <option value="Canada">Canada</option>
              <option value="Europe">Europe</option>
              <option value="South America">South America</option>
              <option value="United States">United States</option>
            </select>
          </label>
          {this.renderButton()}
        </div>
        <table className="table table-responsive">
          <thead>
            <tr>
              <th>Description</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {this.props.clouds.map(cloud => this.renderClouds(cloud))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
    const { clouds, options } = state;
    return { clouds, provider: options.provider, location: options.location, sorted: options.sorted };
}

export default connect(mapStateToProps, { fetchClouds, changeProvider, changeLocation, sortByLocation, updateClouds, sortChange })(App);
