import './App.css';
import React from 'react';
import Me from './mecameo.png';
import Clock from './clock.png';
import Mail from './email.png';
import Tickets from './ticketData'

class App extends React.Component {

  state={
    textinput:'',
    goalDropdown:'',
    clickedTicket:'',
    messageBox:'Type a message',
    chats:[],
    tickets:[],
    selectedTicket:{},
    proceed:false,
    ticketSaved:false
  }

  handleOnChange = e => {
    if (e.target.id === 'chatbox') {
      console.log(e.target)
      this.setState({messageBox:e.target.value})
    } else {
    this.setState({textinput:e.target.value})
    e.target.value.length > 0 && e.target.value.length <= 25 ? this.setState({proceed:true}) : this.setState({proceed:false})
    }
  }

  handleDropChange = e => {
    console.log(e)
    this.setState({goalDropdown:e.target.value})
  }

  handleSubmit = e => {
    const ticket = {
      goal:this.state.goalDropdown,
      title:this.state.textinput
    }
    ticket.goal !== 'Select' ? this.setState({ticketSaved:true}) : alert('Please select a goal for this ticket')
  }

  handleOnFocus = e => {
    this.setState({messageBox:''})
  }

  findTicket = matchId => {
    const thisTicket = this.state.tickets.find(ticket => ticket._id === matchId)
    console.log(thisTicket)
    this.setState({selectedTicket:thisTicket,textinput:thisTicket.title,goalDropdown:thisTicket.goal,chats:[]})
    // this.setState({textinput:thisTicket.title,goalDropdown:thisTicket.goal})  
  }

  handleChatSend = e => {
    e.preventDefault()
    let prefix;
    let msgTime = new Date().toString().split(' ')[4].slice(0,5)
    if (parseInt(msgTime.slice(0,2),10) > 12 ) {
      let newTime = parseInt(msgTime.slice(0,2),10) - 12
      msgTime = newTime.toString() + msgTime.slice(2,5)
      prefix = "PM"
    } else {
      prefix = 'AM'
    }
    msgTime = msgTime + ' ' + prefix
    console.log(e.target)
    console.log(this.state)
    const newMessages = [...this.state.chats, {text:this.state.messageBox, time:msgTime}]
    console.log(newMessages)
    this.setState({chats:newMessages, messageBox:'Type a message'})
  }

    componentDidMount() {
      this.setState({tickets:Tickets})
    }

  render() {

  const showChats = e => {
    return this.state.chats.map((chat, i) => {
      return (<div><li id='chatMsg' key={i}>{chat.text} </li>
     <li id='msgTime'>🔵 {chat.time} </li> </div>)
    })
  }

  const showTickets = () => {
    return this.state.tickets.map(ticket => {
     return <li key={ticket._id}>< button id={this.state.selectedTicket && this.state.selectedTicket._id === ticket._id ? 'blkBtn' : 'ticketBtn'} onClick={() => this.findTicket(ticket._id)} key={ticket._id}>{ticket.title.slice(0,2).toUpperCase()}</button> </li>
    })
  }

  const options = ['Select','Buy a product','Cancel an account','Buy and Recommend a gift','Ask for the business']

  return (
    <div className="App">
      <div className='sidebar'>
        <ul>
          <li><img src={Me} alt='my face' height='40'></img></li>
          {this.state.tickets ? showTickets() : null}
          </ul>
      </div>
      <div className='classifyPanel'>
        <h2>Classify</h2>

        What's the user asking for?<br/><br/>
        <select value={this.state.goalDropdown} onChange={this.handleDropChange}>
          {options.map((option, index) => {
          return <option key={index} value={option}>{option}</option>})
        }
        </select><br/><br/>
        Task name (as shown to the user)<br/>
        <input value={this.state.textinput} onChange={this.handleOnChange}></input><br/>
        (Characters left: <span id={this.state.textinput && this.state.textinput.length > 25 ? 'red' : null}>{25 - this.state.textinput.length}</span>)
          <button className='bottomButton' onClick={this.handleSubmit} disabled={!this.state.proceed}>Proceed</button>
      </div>

      <div className='rightBox'>
        <h3>{this.state.selectedTicket ? this.state.selectedTicket.title : 'No ticket seleted'}</h3> <span className='upperRight'>00:00<img src={Mail} height='20px' alt='mail'/><img src={Clock} height='25px' alt='clock'/></span>
        <div>
          <ul>
          {this.state.chats ? showChats() : null}
          </ul>
        </div>
        <div className='textBox'>
          <form onSubmit={this.handleChatSend}>
          <fieldset onBlur={this.handleOnBlur} onFocus={this.handleOnFocus} disabled={!this.state.ticketSaved}>
          <input id='chatbox'  value={this.state.messageBox} onChange={this.handleOnChange}></input>
          </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
  }
}

export default App;