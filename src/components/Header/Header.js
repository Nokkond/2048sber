
import React from "react";
import axios from "axios";
import styles from "./Header.module.scss";
import { useGameDataContext } from "../../service/contexts";

import { useState, useEffect } from "react"


import APIHelper from "./APIHelper.js"

export const Header = () =>  {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState("")
  const { gameOver, resetGame } = useGameDataContext();
  

  


  
  useEffect(() => {
    const fetchTodoAndSetTodos = async () => {
      const todos = await APIHelper.getAllTodos()
      setTodos(todos)
    }
    fetchTodoAndSetTodos()
  }, [])

  const createTodo = async e => {
    e.preventDefault()
    if (!todo) {
      alert("please enter something")
      return
    }
    if (todos.some(({ task }) => task === todo)) {
      alert(`Task: ${todo} already exists`)
      return
    }
    const newTodo = await APIHelper.createTodo(todo)
    setTodos([...todos, newTodo])
  }

  const deleteTodo = async (e, id) => {
    try {
      e.stopPropagation()
      await APIHelper.deleteTodo(id)
      setTodos(todos.filter(({ _id: i }) => id !== i))
    } catch (err) {}
  }

  const updateTodo = async (e, id) => {
    e.stopPropagation()
    const payload = {
      completed: !todos.find(todo => todo._id === id).completed,
    }
    const updatedTodo = await APIHelper.updateTodo(id, payload)
    setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)))
  }

  return (
    
      <div className={styles.header}>
       <span className={styles.nameTitle}>2048</span> 
      
      {/* <div>
        <input
          id="todo-input"
          type="text"
          value={todo}
          onChange={({ target }) => setTodo(target.value)}
        />
        <button type="button" onClick={createTodo}>
          Add
        </button>
      </div>

      <ul>
        {todos.map(({ _id, task, completed }, i) => (
          <li
            key={i}
            onClick={e => updateTodo(e, _id)}
            className={completed ? "completed" : ""}
          >
            {task} <span onClick={e => deleteTodo(e, _id)}>X</span>
          </li>
        ))}
      </ul> */}
      {gameOver && <span className={styles.gameOver}>Game Over</span>}
      <span className={styles.newGame} onClick={resetGame}>
         {gameOver ? "Try Again" : "New Game"}
      </span> 
      
      
      </div>
    
    
  )
}

export default Header







// const API_URL = "http://localhost:3000/todos/"

// async function createTodo(task) {
//   const { data: newTodo } = await axios.post(API_URL, {
//     task,
//   })
//   return newTodo
// }

// async function deleteTodo(id) {
//   const message = await axios.delete(`${API_URL}${id}`)
//   return message
// }

// async function updateTodo(id, payload) {
//   const { data: newTodo } = await axios.put(`${API_URL}${id}`, payload)
//   return newTodo
// }

// async function getAllTodos() {
//   const { data: todos } = await axios.get(API_URL)
//   return todos
// }

// export const Header = () => {
//   const { gameOver, resetGame } = useGameDataContext();

  
//     const [todos, setTodos] = useState([])
//     const [todo, setTodo] = useState("")
  
//     useEffect(() => {
//       const fetchTodoAndSetTodos = async () => {
//         const todos = await  getAllTodos()
//         setTodos(todos)
//       }
//       fetchTodoAndSetTodos()
//     }, [])
  
//     const createTodo = async e => {
//       e.preventDefault()
//       if (!todo) {
//         alert("please enter something")
//         return
//       }
//       if (todos.some(({ task }) => task === todo)) {
//         alert(`Task: ${todo} already exists`)
//         return
//       }
//       const newTodo = await  createTodo(todo)
//       setTodos([...todos, newTodo])
//     }
  
//     const deleteTodo = async (e, id) => {

//       try {
//         e.stopPropagation()
//         await  deleteTodo(id)
//         setTodos(todos.filter(({ _id: i }) => id !== i))
//       } catch (err) {}
//     }
  
//     const updateTodo = async (e, id) => {
//       e.stopPropagation()
//       const payload = {
//         completed: !todos.find(todo => todo._id === id).completed,
//       }
//       const updatedTodo = await  updateTodo(id, payload)
//       setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)))
//     }
  
//     // return (
//     //   <div className="App">
//     //     <div>
//     //       <input
//     //         id="todo-input"
//     //         type="text"
//     //         value={todo}
//     //         onChange={({ target }) => setTodo(target.value)}
//     //       />
//     //       <button type="button" onClick={createTodo}>
//     //         Add
//     //       </button>
//     //     </div>
  
//     //     <ul>
//     //       {todos.map(({ _id, task, completed }, i) => (
//     //         <li
//     //           key={i}
//     //           onClick={e => updateTodo(e, _id)}
//     //           className={completed ? "completed" : ""}
//     //         >
//     //           {task} <span onClick={e => deleteTodo(e, _id)}>X</span>
//     //         </li>
//     //       ))}
//     //     </ul>
//     //   </div>
//     // )
  

//   return (
//     <div className="App">
//     <div className={styles.header}>
//       {/* <span className={styles.nameTitle}>2048</span> */}
//       <div>
//         <input
//           id="todo-input"
//           type="text"
//           value={todo}
//           onChange={({ target }) => setTodo(target.value)}
//         />
//         <button type="button" onClick={createTodo}>
//           Add
//         </button>
//       </div>
//       {/* {gameOver && <span className={styles.gameOver}>Game Over</span>}
//       <span className={styles.newGame} onClick={resetGame}>
//         {gameOver ? "Try Again" : "New Game"}
//       </span> */}
//     </div>
//     </div>
//   );
// };

// export default { createTodo, deleteTodo, updateTodo, getAllTodos }


// import React from "react";

// import styles from "./Header.module.scss";
// import { useGameDataContext } from "../../service/contexts";

// export const Header = () => {
//   const { gameOver, resetGame } = useGameDataContext();

//   return (
//     <div className={styles.header}>
//       <span className={styles.nameTitle}>2048</span>
//       {gameOver && <span className={styles.gameOver}>Game Over</span>}
//       <span className={styles.newGame} onClick={resetGame}>
//         {gameOver ? "Try Again" : "New Game"}
//       </span>
//     </div>
//   );
// };
