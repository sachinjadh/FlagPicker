import React, { Component } from 'react';
import './App.css';
import Search from '../src/components/Search';
import continentsObj  from '../src/model/continents';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      continents:{
        selectedContinent:'',
        showSuggestions:false,
        suggestions:[],
        userInput:'',
        flagMap:[]
      },
      countries:{
        selectedCountry:'',
        selectedFlag:'',
        showSuggestions:false,
        suggestions:[],
        userInput:'',
        flagMap:[]
      }
    }
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSelected = this.handleOnSelected.bind(this);
  }
  
  // Event fired when the input value is changed
  handleOnChange = e => {
    const uniqueKey = e.target.id;
    const userInput = e.currentTarget.value;
    const {continents} = this.state;
    const{selectedContinent} = continents;
    let suggestions =[];
    let stateObject = {};
    let flagMap = [];


    // Filter our suggestions that don't contain the user's input
    if(uniqueKey === 'continents'){ 
      suggestions = continentsObj.map(suggestion => suggestion.continent)
                                  .filter( suggestion =>
                            suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    }
    if(uniqueKey === 'countries'){ 
      let filteredObj = [];
      filteredObj = continentsObj.filter(suggestion => suggestion.continent === selectedContinent);
        suggestions = filteredObj[0].countries.map(c=>c.name).filter( suggestion =>
          suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      );
      flagMap = filteredObj[0].countries;
    }
    stateObject[uniqueKey]= {
      ...this.state[uniqueKey],
      suggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value,
      flagMap: flagMap
    };
    this.setState(stateObject);
  };
  handleOnSelected = e => {
    const uniqueKey = e.target.id;
    let stateObject = {};
    if(uniqueKey === 'continents'){
      stateObject[uniqueKey]= {
        ...this.state[uniqueKey],
        suggestions:[],
        showSuggestions: false,
        userInput: e.currentTarget.innerText,
        selectedContinent: e.currentTarget.innerText
      };
    }else{
      console.log(this.state[uniqueKey].flagMap.filter(c => c.name === this.state[uniqueKey].selectedCountry).map(c => c.flag));
      stateObject[uniqueKey]= {
        ...this.state[uniqueKey],
        selectedCountry: e.currentTarget.innerText,
        suggestions:[],
        selectedFlag: this.state[uniqueKey].flagMap.filter(c => c.name === this.state[uniqueKey].selectedCountry).map(c => c.flag),
        showSuggestions: false,
        userInput: e.currentTarget.innerText

      };
    }
    this.setState(stateObject);
    };
  
  render(){
    const{continents,countries} = this.state;

  return (
    <div>
          <h1>Flag Picker</h1>
          <h3>Select a continent</h3>
    <Search
        suggestions={continents.suggestions}
        showSuggestions={continents.showSuggestions}
        userInput={continents.userInput}
        handleOnChange={this.handleOnChange}
        id='continents'
        handleOnSelected={this.handleOnSelected}
      />
      {continents.selectedContinent !== '' &&  <h1>you have selected {continents.selectedContinent} as continent</h1>}
          {continents.selectedContinent !== '' && 
        <Search 
        suggestions={countries.suggestions}
        showSuggestions={countries.showSuggestions}
        userInput={countries.userInput}
        handleOnChange={this.handleOnChange}
        id='countries'
        handleOnSelected={this.handleOnSelected}
        />
      }
      {countries.selectedCountry !== '' &&  <h1>you have selected {countries.selectedCountry} as country</h1>}
      {countries.selectedCountry!== '' && 
              <h1> Selected flag is {countries.selectedFlag}</h1>
      }
    </div>
  );
  }
 
}

export default App;
