 
import React, { Component } from 'react'
import { compose ,withHandlers} from 'react-recompose'
import { getOwner } from '../../api/registry'
import {gql,useMutation,useQuery} from "@apollo/client";
import graphqlClient from './../../api/client'

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
function handleGetNodeDetails(name,mutation) {
    console.log(name)
    if (name.split('.').length > 2) {
      debugger;
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

    
        debugger;
          graphqlClient
          .mutate({
            mutation: addNode,
            variables: { name }
          })
          .then(({ data: { addNode } }) => {
            debugger;
            if (addNode) {
              addNotification(`Node details set for ${name}`)
            } else {
              addNotification(`${name} does not have an owner!`)
            }
          })
        // getOwner(name).then(owner => {
        //   if (parseInt(owner, 16) === 0) {
        //     addNotification(`${name} does not have an owner!`)
        //   } else {
        //     //Mutate state to setNodeDetails
        //     //setNodeDetails(name)
        //     addNotification(`Node details set for ${name}`)
        //   }
        // }).catch((e)=>{
        //     debugger
        // })
        

       
      }
}

const GETPeoPle =gql`
  query getPeople {
    people {
      name 
      id 
    }
  }`

function SearchName3(){
  let input;
  const  { data, loading, error }  = useQuery(GETPeoPle);
  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      {data}
    </div>
  );
}




export  class SearchName extends Component {
    state = {
      searchName: ''
    }
    updateSearchName = searchName =>this.setState({searchName });
  
    render() {
      const { handleGetNodeDetails } = this.props;
      
      return (
          <form
            className="search-name"
            onSubmit={ 
                event => {
                  event.preventDefault()
                 
                  handleGetNodeDetails(this.state.searchName)
                  // debugger;
                  // const [addNode, { data, loading, error }] = useMutation(`
                  //   mutation addNode($name: String) {
                  //     addNode(name: $name) @client {
                  //       name
                  //       owner
                  //     }
                  //   }
                  // `);
                  // debugger;
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




// const ADD_TODO = gql`
//   mutation AddTodo($name: String!) {
//     addNode(name: $name)  @client{
//       name
     
//     }
//   }
// `;
// function AddTodo() {
//   let input;
//   const [addTodo, { data }] = useMutation(ADD_TODO);

//   return (
//     <div>
//       <form
//         onSubmit={e => {
//           e.preventDefault();
//           addTodo({ variables: { name: input.value } });
//           input.value = '';
//         }}
//       >
//         <input
//           ref={node => {
//             input = node;
//           }}
//         />
//         <button type="submit">Add Todo</button>
//       </form>
//     </div>
//   );
// }
//  export default AddTodo