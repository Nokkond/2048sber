
import React, { useEffect } from "react";
// import { useEvent } from "./service/utils";
import "./App.css";
import { useGameDataContext } from "./service/contexts";

import { swipeDown, swipeLeft, swipeRight, swipeUp } from "./service/swipes";
import { Container } from "./components/Container";
import { SwipeField } from "./components/SwipeField";

import {
  createSmartappDebugger,
  createAssistant,
} from "@sberdevices/assistant-client";

import "./App.css";
import { TaskList } from './pages/TaskList';
import eventBus from "./lib/EventBus";


const initializeAssistant = (getState/*: any*/) => {
  if (process.env.NODE_ENV === "development") {
    return createSmartappDebugger({
      token: process.env.REACT_APP_TOKEN ?? "",
      initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
      getState,
    });
  }
  return createAssistant({ getState });
};


//const { data, setData, addNumber } = useGameDataContext();
//gameDataContext = { data, setData, addNumber };


export class App extends React.Component {
  //
  
   //data = this.useGameDataContext();

  constructor(props) {
    super(props);
    console.log('constructor');
    
    
    //const gameDataContext = { data, setData, addNumber };
    this.state = {
      notes: [],
    }

    this.assistant = initializeAssistant(() => this.getStateForAssistant() );
    this.assistant.on("data", (event/*: any*/) => {
      console.log(`assistant.on(data)`, event);
      const { action } = event;
      console.log();
      console.log('componentDidMount');
      this.dispatchAssistantAction(action);
    });
    this.assistant.on("start", (event) => {
      console.log(`assistant.on(start)`, event);
    });

  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  getStateForAssistant () {
    console.log('getStateForAssistant: this.state:', this.state)
    const state = {
      item_selector: {
        items: this.state.notes.map(
          ({ id, title }, index) => ({
            number: index + 1,
            id,
            title,
          })
        ),
      },
    };
    console.log('getStateForAssistant: state:', state)
    return state;
  }

  dispatchAssistantAction (action) {
    alert('АУАУАУАУ');
    //console.log(action.navigation.command);
    console.log('dispatchAssistantAction', action);
    if (action) {
      switch (action.type) {
        //  case 'add_note':  
        //  return this.
        

        // case 'done_note':
        //   return this.done_note(action);

        // case 'delete_note':
        //   return this.delete_note(action);

        case 'go_left':
          //return this.go_left();
          return eventBus.dispatch("go_left", {});
        case 'go_right':
          //return this.go_left();
          return eventBus.dispatch("go_right", {}); 
        case 'go_up':
          //return this.go_left();
          return eventBus.dispatch("go_up", {}); 
        case 'go_down':
          //return this.go_left();
          return eventBus.dispatch("go_down", {});
          

        default:
          throw new Error();
      }

    }
  }

  add_note (action) {
    console.log('add_note', action);

    swipeLeft(false, this.gameDataContext)
    
    this.setState({
      notes: [
        ...this.state.notes,
        {
          id:        Math.random().toString(36).substring(7),
          title:     action.note,
          completed: false,
        },
      ],
    })
  }

  done_note (action) {
    console.log('done_note', action);
    this.setState({
      notes: this.state.notes.map((note) =>
        (note.id === action.id)
        ? { ...note, completed: !note.completed }
        : note
      ),
    })
  }

  delete_note (action) {
    console.log('delete_note', action);
    this.setState({
      notes: this.state.notes.filter(({ id }) => id !== action.id),
    })
  }

  //go_left() {
  //  console.log('go_left');
  //  const { data, setData, addNumber } = useGameDataContext();
  //  const gameDataContext = { data, setData, addNumber };
  //  swipeLeft(false, this.GameDataContext)
  //}

  render() {
    console.log('render');
    return (
      <Container>
        <SwipeField />
      {/* <TaskList
        items  = {this.state.notes}
        onAdd  = {(note) => { this.add_note({ type: "add_note", note }); }}
        onDone = {(note) => { this.done_note({ type: "done_note", id: note.id }) }}
      /> */}
      </Container>
    )
  }


  


}

