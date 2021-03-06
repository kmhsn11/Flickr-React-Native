import React, {Component} from 'react';
import {TextInput} from 'react-native';
import styles from './Styles'


export default class SearchBar extends Component {
	constructor(props){
		super(props);

		this.handleSearchChange = this.handleSearchChange.bind(this);
	}

	handleSearchChange(text){
		this.props.onSearchChange(text); 				
	}

	render(){
		return (

			<TextInput
      		placeholder = "type here.."
      		placeholderTextColor="black"
      		style = {styles.searchBar}
      		onChangeText = {(text) => this.handleSearchChange(text)}
      			
      		/>

		);
	}
}