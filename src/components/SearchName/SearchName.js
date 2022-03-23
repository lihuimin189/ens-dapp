 
import React, { Component } from 'react'
import { compose ,withHandlers} from 'react-recompose'
import { getOwner } from '../../api/registry'
import {gql} from "@apollo/client";
// import NotificationsContext from '../../Notifications'

function addNotification(message) {
    console.log(message)
}


const addNode = gql`
  mutation addNode($name: String) {
    addNode(name: $name) @client {
      name
      owner
    }
  }
`
function handleGetNodeDetails(name,client) {
    console.log(name)
    if (name.split('.').length > 2) {
        getOwner(name).then(owner => {
          if (parseInt(owner, 16) === 0) {
            addNotification(`${name} does not have an owner!`)
          } else {
            //Mutate state to setNodeDetailsSubdomain
            //setNodeDetailsSubDomain(name, owner)
          }
        })
      } else if (name.split('.').length === 0) {
        addNotification('Please enter a name first')
      } else if (name.split('.').length === 1) {
        addNotification('Please add a TLD such as .eth')
      } else {

        // getOwner(name).then(owner => {
        //   if (parseInt(owner, 16) === 0) {
        //     addNotification(`${name} does not have an owner!`)
        //   } else {
        //     //Mutate state to setNodeDetails
        //     //setNodeDetails(name)
        //     addNotification(`Node details set for ${name}`)
        //   }
        // })
        client.mutate({
          mutation: addNode,
          variables: { name }
        })
        .then(({ data: { addNode } }) => {
          if (addNode) {
            addNotification(`Node details set for ${name}`)
          } else {
            addNotification(`${name} does not have an owner!`)
          }
        })
      }
}

export  class SearchName extends Component {
    state = {
      searchName: ''
    }
  
    updateSearchName = searchName =>this.setState({searchName })
  
      
    render() {
      const { handleGetNodeDetails } = this.props
      return (
          <form
            className="search-name"
            onSubmit={ 
                event => {
                  event.preventDefault()
                  handleGetNodeDetails(
                    this.state.searchName,
                    // client
                  )
            }}
        >
          <div className="search-box">
            <input
              type="text"
              id="address"
              placeholder="vitalik.eth"
              value={this.state.searchName}
              onChange={e => this.updateSearchName(e.target.value)}
            />
          </div>
          <button className="get-details" type="submit">
            Search for domain
          </button>
        </form>
      
      )
    }
}

export default compose(
    withHandlers({
      handleGetNodeDetails: props => (name) =>
            handleGetNodeDetails(name)
    })
  )(SearchName)