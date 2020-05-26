import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { TMDB_BASE_AXIOS_INSTANCE, API_DEFAULT_PARAMS } from '../api/tmdb';
import MovieCard from './MovieCard';
import './MoviesByGenre.css';

class MoviesByGenre extends React.Component {
	constructor(props) {
		super(props);

		this.state = { moviesByGenre: [] };
		this.getMoviesByGenre();
		this.counter = 0;
		this.allMovies = [];
	}

	getMoviesByGenre = async () => {
		const response = await TMDB_BASE_AXIOS_INSTANCE.get('/discover/movie', {
			params: {
				...API_DEFAULT_PARAMS,
				sort_by: 'popularity.desc',
				include_adult: false,
				include_video: false,
				page: 1,
				with_genres: this.props.genreId
			}
		});
		this.allMovies = response.data.results;
		this.setState({ moviesByGenre: this.allMovies.slice(this.counter, this.counter+4) });
	};

	updateMovies = () => {
		if(this.counter+4>this.allMovies.length){
			this.counter = -4;
		}
		this.counter+=4;
		this.setState({ moviesByGenre: this.allMovies.slice(this.counter, this.counter+4) });
	}

	render() {
		if (this.state.moviesByGenre.length > 0) {
			console.log(this.state.moviesByGenre);
			return (
				<div>
					<h1 className="genre_header_title">{this.props.genre} </h1>
					<span  className="genre_header" onClick={() => this.props.openGenreMovies(this.allMovies, this.props.genre, this.props.genreId)}>See More...</span>
					<Segment.Group horizontal>
						<MovieCard movie={this.state.moviesByGenre[0]} onMovieClick={this.props.onMovieClick}/>
						<MovieCard movie={this.state.moviesByGenre[1]} onMovieClick={this.props.onMovieClick}/>
						<MovieCard movie={this.state.moviesByGenre[2]} onMovieClick={this.props.onMovieClick}/>
						<MovieCard movie={this.state.moviesByGenre[3]} onMovieClick={this.props.onMovieClick}/>
					</Segment.Group>
				</div>
			);
		} else {
			return <div>Fetching movies by genre....</div>;
		}
	}
}

export default MoviesByGenre;
