import React, {Component} from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from './Styles'
import FlickrPhotoCell from './FlickrPhotoCell'

export default class CollectionItem extends Component {
	
	constructor(props){
		super(props);

		this.state = {isLoading: true, imageData: ''}

		let urlString = 'https://farm' + this.props.farm + '.staticflickr.com/' + this.props.server + '/' + this.props.id + '_' + this.props.secret + '_t.jpg'
		

		this.fileReader = new FileReader()

		this.fileReader.onload = (e) => {
			this.setState({isLoading: false, imageData: e.target.result});
		}

		this.request = new XMLHttpRequest();
		this.request.responseType = 'blob'
		this.request.onload = (e) => {
  			if (this.request.readyState !== 4) {
   			 return;
  			}

  			if (this.request.status === 200) {

   				this.fileReader.readAsDataURL(this.request.response)	 	

 			 }else {
   		 		console.warn('error');
  			 }

		};

		this.request.open('GET', urlString);
		this.request.send();

	}
	
	componentWillUnmount(){
		this.request.abort();
		this.fileReader.abort();
	}
	
	render(){

		let activityIndicator = <ActivityIndicator 
				 size = "small"
				 color = "black"
				 animating = {(this.state.isLoading) ? true : false}
				 hidesWhenStopped = {false}
				 style = {{opacity: (this.state.isLoading)? 1 : 0, top: '50%'}}
				/>

		return(
			<View style = {{width: 160, height: 160, flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10}}>

				{activityIndicator}
				<FlickrPhotoCell imageData = {this.state.imageData}/>

			</View>
		);
	}
}