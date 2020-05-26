import React from 'react';
import './Toolbar.css';
import './GenreSearch.css';
import MovieSearchListItem from './MovieSearchListItem';
import ProgressLoader from './Loader';

class GenreSearch extends React.Component {
	getMovieSearchListItems = (movies) => {
		return movies.map((movie) => {
			return <MovieSearchListItem movie={movie} onMovieClick={this.props.showClickedMovieModal} />;
		});
	}

	componentDidMount(){
		window.scrollTo(0,0);
	}

	renderContent() {
		console.log('GenreSearch');
		console.log(this.props);
		if (this.props.searchMovieResults && this.props.searchMovieResults.length > 0) {
			return this.getMovieSearchListItems(this.props.searchMovieResults);
		} else if (this.props.displayGenreMovies && this.props.displayGenreMovies.length > 0) {
			return (
				<div>
					<div>
						<h1 className="genre_header_title">{this.props.genre} Movies </h1>
					</div>
					{this.getMovieSearchListItems(this.props.displayGenreMovies)}
				</div>
			);
		} else {
			return <ProgressLoader message="Searching movies..." />;
		}
	}

	render() {
		return <div>{this.renderContent()}</div>;
	}
}

export default GenreSearch;
