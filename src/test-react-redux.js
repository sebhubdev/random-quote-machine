import React from 'react';
import { createStore } from 'redux'

class DisplayMessages extends React.Component 
{
    constructor(props) 
    {
      super(props);
      this.state = 
      {
        input: '',
        messages: []
      }      
    }
    handleChange=(e)=>
    {
        this.setState({
            input:e.target.value,
            messages:this.state.messages
        });
    }
    submitMessages=()=>
    {
        this.setState({
            input:'',
            messages:this.state.messages.concat(this.state.input)
        })
    }  
    render() 
    {
      const ADD='ADD';  
      const addMessage=(message)=>
      {
            return {
                type:ADD,
                message:message
            }
      }
      const messageReducer=(state=[],action)=>
      {
            switch (action.type)
            {
                case ADD :
                return [...state,action.message];
                default :
                return state;
            }
      }
      const store=createStore(messageReducer);

      return (
        <div>
          <h2>Type in a new Message:</h2>
        <input type="text" onChange={this.handleChange} value={this.state.input}/>
        <button onClick={this.submitMessages}>Add message</button>
        <ul>
            {
                this.state.messages.map((message,key)=>
                {
                    return <li key={key}>{message}</li>
                })
            }
        </ul>
        </div>
      );
    }
  };

  export default DisplayMessages