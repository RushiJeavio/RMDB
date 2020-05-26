import React from 'react';
import './Loader.css';
import { Dimmer, Loader, Image } from 'semantic-ui-react';

class ProgressLoader extends React.Component {
	render() {
		return (
			<div className = 'progress-loader'>
				<Dimmer active inverted>
					<Loader>{this.props.message}</Loader>
				</Dimmer>

				<Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
			</div>
		);
	}
}

ProgressLoader.defaultProps = {
	message: 'Loading...wait a sec'
};

export default ProgressLoader;
