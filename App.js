import React from 'react';
import { View } from 'react-native';
import SearchBar from './SearchBar'
import CollectionView from './CollectionView'

export default class App extends React.Component {


constructor(props){
    super(props);
    this.state = { isLoading: true, dataSource: [], searchText: '', pageLoaded: 0, totalPages: 0}
    this.totalPages = 0
    this.didSearchTextChange = this.didSearchTextChange.bind(this);
  }


  didSearchTextChange(search){

      this.setState({searchText: search});
  }

  render(){


    return(
      <View style={{flex: 1, paddingTop:40}}>
      	
        <SearchBar onSearchChange = {this.didSearchTextChange}/>

        <CollectionView search = {this.state.searchText}/>

          
      
      </View>
    );
  }
}
  

