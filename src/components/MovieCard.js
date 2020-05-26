import React from 'react';
import { Segment, PlaceholderImage } from 'semantic-ui-react';

class MovieCard extends React.Component {
	constructor(props) {
		super(props);

		this.state = { imageLoaded: false };
		this.imageRef = React.createRef();
	}

	componentDidMount() {
		this.imageRef.current.addEventListener('load', () => this.setState({ imageLoaded: true }));
	}

	renderContent = () => {

        const movieImage = `https://image.tmdb.org/t/p/original/${this.props.movie.poster_path}`;
		return (
			<div>
				<PlaceholderImage style={{ display: this.state.imageLoaded ? 'hidden' : 'visible' }} />
				<img
					ref={this.imageRef}
					style={{ display: this.state.imageLoaded ? 'visible' : 'hidden', width:'250px', height:'350px' }}
					src={movieImage}
					alt={this.props.movie.original_title}
				/>
			</div>
		);
	};

	render() {
		console.log('MovieCard');
		console.log(this.props);
		return (
			<Segment
				raised
				onClick={() => {
					this.props.onMovieClick(this.props.movie);
                }}
                style={{margin: '15px'}}
			>
				{this.renderContent()}
			</Segment>
		);
	}
}

export default MovieCard;
