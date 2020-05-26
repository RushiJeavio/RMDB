import React from 'react';
import './Toolbar.css';
import Searchbar from './Searchbar'

class Toolbar extends React.Component {
	render() {
		return (
			<div className="toolbar">
				<h1 onClick={this.props.openHome} className="home-header">
					RMDB <label className="inline subheader">finest movie database</label>
				</h1>
				<Searchbar className="search" searchMovie = {this.props.searchMovie} showMovieResults={this.props.showMovieResults}/>
			</div>
		);
	}
}

export default Toolbar;
