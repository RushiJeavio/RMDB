import { Header, Image, Modal, Button } from 'semantic-ui-react';
import  './MovieModal.css';
import React from 'react';

class MovieModal extends React.Component {
	render() {
		if (this.props.movie) {
			const movieImage = `https://image.tmdb.org/t/p/original/${this.props.movie.poster_path}`;
			return (
				<Modal open={this.props.movieClicked}>
					<Modal.Header>{this.props.movie.title}</Modal.Header>
					<Modal.Content image>
						<Image wrapped size="medium" src={movieImage} />
						<Modal.Description>
							<Header>{this.props.movie.overview}</Header>
						</Modal.Description>
					</Modal.Content>
				</Modal>
			);
		}else{
			return <div></div>;
		}
	}
}

export default MovieModal;
