import React, {Component} from 'react';
import { FlatList } from 'react-native';
import styles from './Styles'
import CollectionItem from './CollectionItem'


export default class CollectionView extends Component {
	constructor(props){
		super(props);
		console.log('cv');
		this.state = {dataSource: [], lastPageLoaded: 0}
		this.searchFlickr = this.searchFlickr.bind(this);
		this.totalPages = 0;
		this.searchRequests = [];
	}

	searchFlickr(searchText, pageNo){

		let flickrKey = 'cdd997f4b04d47029a05da1772eca199';
   	 	let urlString = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' +flickrKey + '&text=' + searchText + '&per_page=20&page='+(this.state.lastPageLoaded + 1)+'&safe_search=1&format=json&nojsoncallback=1';
  

		var request = new XMLHttpRequest();
		request.onload = (e) => {
  		if (request.readyState !== 4) {
   		 return;
  		}

  		if (request.status === 200) {
   		 console.log('success');
   		 	let responseJson = JSON.parse(request.responseText);

			let photos = responseJson['photos']
			if(typeof(photos) != 'undefined'){
    			this.totalPages = photos['pages']
    			let photoArray = photos['photo']

    			let newArray =  this.state.dataSource;
    			for(let i=0; i<photoArray.length; i++){
    			   	newArray.push(photoArray[i]);

    			}
    			this.setState(previousState => {
    			
    				return {dataSource: newArray, lastPageLoaded: previousState.lastPageLoaded + 1};
    				
    			});
    		}

 		 } else {
   		 //console.warn('error');
  		}
		};

		request.open('GET', urlString);
		request.send();

    	this.searchRequests.push(request);
	}
	


	componentWillReceiveProps(nextProps){

		this.setState({dataSource: [], lastPageLoaded: 0});

		this.searchRequests.map((request) =>
			{   
				request.abort();

			}
		 );
		this.searchRequests = [];

		
		if(nextProps.search.length >= 3){
			this.searchFlickr(nextProps.search, this.state.lastPageLoaded);
		}


	}

	componentWillUnmount(){
		console.log('unmount');
		this.searchRequests.map((request) =>
			{
					request.abort();
			}			
		 );
		this.searchRequests = [];
	}

	

	render(){

		return(

			<FlatList
      		style = {{padding: 20, top: 20}}
      		numColumns = {2}
      		data = {this.state.dataSource}
      		renderItem = {({item}) => 
      			
      				<CollectionItem 
      				farm = {item.farm} 
      				server = {item.server}
      				id = {item.id}
      				secret = {item.secret}
      				/>
      			
      		}
      		keyExtractor = {(item, index) => index}
      		extraData = {this.state}
      		onEndReached = {() => {
      			if(this.state.lastPageLoaded > 0 && this.state.lastPageLoaded < this.totalPages){
      				this.searchFlickr(this.props.search, this.state.lastPageLoaded + 1)
      			}
      		}
      		}
      		/>

		);
	}
}