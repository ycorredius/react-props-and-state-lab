import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleOnChange = event =>{
      this.setState({
        filters: {
          ...this.state.filters,
          type: event.target.value}
      })
      console.log(this.state.filters.type)
  }

  onFindPetsClick= () =>{
    let endpoint = '/api/pets';

    if (this.state.filters.type !== 'all'){
      endpoint += `?type=${this.state.filters.type}`
    }
    fetch(endpoint)
      .then(res => res.json())
      .then(pets => this.setState({pets: pets}))

      console.log(this.state.pets)
    }

    handlAdoptPet = petId => {
      // const pets = this.state.pets.map(pet =>{
      //   if (pet.id === petId){
      //     return pet.isAdopted=  true;
      //   } else {
      //       return pet;
      //   }
      // })
      // this.setState(this.state{pets: pets})
        const pets = this.state.pets.map(p => {
        return p.id === petId ? { ...p, isAdopted: true } : p;
      });
    this.setState({ pets: pets });
    }
  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleOnChange} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.handlAdoptPet} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
