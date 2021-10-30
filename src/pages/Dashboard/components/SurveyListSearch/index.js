import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import SearchIcon from '../../../../components/components/icons/Search';
import './index.sass';


const className = 'studies-search';

class StudiesSearchBar extends React.Component {
	static propTypes = {
		value: PropTypes.string,
		onChange: PropTypes.func,
	};

	clearSearch = () => this.props.onChange('');

	handleStudyInput = e => this.props.onChange(e.target.value);

	render() {
		return (
			<div className={className}>
				<div className='search-container'>
					<SearchIcon onClick={this.clearSearch} />
					<input
						type="search"
						placeholder="Find a study..."
						onChange={this.handleStudyInput}
					/>
				</div>
                <Button className='create-survey-button' variant="contained" onClick={ () =>this.props.navigate() }>
                    <AddIcon /> <p>CREATE SURVEY</p>
                </Button>
			</div>
		);
	}
}

export default StudiesSearchBar;