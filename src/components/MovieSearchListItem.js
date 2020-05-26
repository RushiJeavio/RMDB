import { Segment, PlaceholderImage, Header, Icon } from 'semantic-ui-react';
import './MovieSearchListItem.css';
import React from 'react';

class MovieListItem extends React.Component {
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
			<div className="row">
				<div className="vertical-flex">
					<PlaceholderImage style={{ display: this.state.imageLoaded ? 'hidden' : 'visible' }} />
					<img
						ref={this.imageRef}
						style={{
							display: this.state.imageLoaded ? 'visible' : 'hidden',
							width: '250px',
							height: '350px'
						}}
						src={movieImage}
						alt={this.props.movie.original_title}
					/>
				</div>
				<div className="vertical-flex stretch">
					<div className="horizontal-flex space-between">
						<Header as="h1">{this.props.movie.original_title}</Header>
						<div className="ratings">
							{this.props.movie.vote_average}
							<Icon className="rating_star" name="star" />
						</div>
					</div>
					<p>{this.props.movie.overview}</p>
					<div className="horizontal-flex space-between footer stretch">
						<div>Duration: {this.props.movie.duration}</div>
						<div>Released on : {this.props.movie.release_date}</div>
					</div>
				</div>
			</div>
		);
	};

	render() {
		return (
			<Segment
				raised
				onClick={() => {
					this.props.onMovieClick(this.props.movie);
				}}
				style={{ margin: '15px' }}
			>
				{this.renderContent()}
			</Segment>
		);
	}
}
export default MovieListItem;
