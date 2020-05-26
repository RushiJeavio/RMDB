import Toolbar from './Toolbar';
import { TMDB_BASE_AXIOS_INSTANCE, API_DEFAULT_PARAMS } from '../api/tmdb';
import React from 'react';
import MovieModal from './MovieModal';
import MoviesByGenre from './MoviesByGenre';
import GenreSearch from './GenreSearch';
import OutsideAlerter from './OutsideAlerter';

class App extends React.Component {
	state = {
		movieGenres: [],
		movieClicked: false,
		clickedMovie: null,
		displaySearchGenre: false,
		searchMovieResults: [],
		genreId: -1,
		genre: ''
	};

	openHome = () => {
		window.location.reload();
	};

	showMovieResults = async (searchTerm) => {
		this.setState({ displaySearchGenre: true });
		const moviesFound = await this.searchMovie(searchTerm);
		this.setState({ searchMovieResults: moviesFound, displayGenreMovies:[] });
	};

	searchMovie = async (searchTerm) => {
		const response = await TMDB_BASE_AXIOS_INSTANCE.get('/search/movie', {
			params: {
				...API_DEFAULT_PARAMS,
				query: searchTerm,
				include_adult: 'false'
			}
		});
		return response.data.results;
	};

	getGenres = async () => {
		const response = await TMDB_BASE_AXIOS_INSTANCE.get('/genre/movie/list', {
			params: {
				...API_DEFAULT_PARAMS
			}
		});
		const filteredGenres = [];
		response.data.genres.map((genre) => {
			if (this.requiredGenres.includes(genre.name)) {
				filteredGenres.push(genre);
			}
		});
		this.setState({ movieGenres: filteredGenres });
	};

	componentDidMount() {
		this.requiredGenres = [ 'Comedy', 'Animation', 'Romantic', 'Horror', 'Action' ];
		this.getGenres();
	}

	renderContent() {
		if (this.state.displaySearchGenre) {
			console.log('Search Genre');
			console.log(this.state);
			return (
					<GenreSearch
						displayGenreMovies={this.state.displayGenreMovies}
						displaySearchGenre={this.state.displaySearchGenre}
						genre={this.state.genre}
						genreId={this.state.genreId}
						searchMovieResults={this.state.searchMovieResults}
						showClickedMovieModal={(movie) => {
							this.setState({ movieClicked: true, clickedMovie: movie });
						}}
					/>
			);
		} else if (this.state.movieGenres) {
			console.log(this.state.movieGenres);
			return this.state.movieGenres.map((genre) => {
				return (
					<div>
						<MoviesByGenre
							genreId={genre.id}
							genre={genre.name}
							onMovieClick={(movie) => {
								this.setState({ movieClicked: true, clickedMovie: movie });
							}}
							openGenreMovies={(allMovies, genre, genreId) => {
								this.setState({ displaySearchGenre: true, displayGenreMovies: allMovies,
								genre, genreId: {genreId}, searchMovieResults: [] });
							}}
						/>
					</div>
				);
			});
		} else {
			return <div>Fetching movies....</div>;
		}
	}

	render() {
		return (
			<div>
				<Toolbar searchMovie={this.searchMovie} showMovieResults={this.showMovieResults} openHome={this.openHome} />
				<div style={{backgroundColor: '#ddd'}}>{this.renderContent()}</div>
				<OutsideAlerter
					outsideElementClicked={() => {
						this.setState({ movieClicked: false, clickedMovie: null });
					}}
				>
					<MovieModal movieClicked={this.state.movieClicked} movie={this.state.clickedMovie} />
				</OutsideAlerter>
			</div>
		);
	}
}

export default App;
