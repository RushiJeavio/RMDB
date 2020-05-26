import React from 'react';
import { Search } from 'semantic-ui-react';
import _ from 'lodash';

const initialState = { isLoading: false, results: [], value: '' };

class Searchbar extends React.Component {
	state = initialState;
	handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			this.props.showMovieResults(this.state.value);
			this.setState({results: []});
		}
	};

	handleResultSelect = (e, { result }) => {
        this.props.showMovieResults(result.original_title);
		this.setState({ value: result.original_title, results: [] });
	};

	handleSearchChange = (e, { value }) => {
		this.setState({ isLoading: true, value });

		setTimeout(async () => {
			if (this.state.value.length < 1) return this.setState(initialState);

			let movies = await this.props.searchMovie(this.state.value);
			if (movies.length > 3) {
				movies = movies.slice(0, 3);
			}

			const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
			const isMatch = (result) => re.test(result.original_title);

			this.setState({
				isLoading: false,
				results: _.filter(movies, isMatch)
			});
		}, 300);
	};

	render() {
		const { isLoading, value, results } = this.state;

		return (
			<Search
				loading={isLoading}
				onResultSelect={this.handleResultSelect}
				onSearchChange={_.debounce(this.handleSearchChange, 500, {
					leading: true
				})}
				onKeyPress={this.handleKeyPress}
				results={results}
				value={value}
				open={results.length>0}
				placeholder="Search Movies..."
			/>
		);
	}
}

export default Searchbar;
