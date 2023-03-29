import logo from './logo.svg';
import './App.css';
import OneHeader from './components/OneHeader';
import TwoHeader from './components/TwoHeader';
import TodoList from './components/TodoList';
import Header from './components/Header';
import AddTodo from './components/AddTodo';
import Container from '@material-ui/core/Container';
import React, { useState } from 'react';

function App() {

  function Props(props) {
    return <div>
      <p>Name: {props.name}</p>
      <p>Name: {props.age}</p>
    </div>
  }
  function Test(props) {
    return (props.a + props.b);
  }

  function Counter() {
    const [count, setCount] = React.useState(0);
    return (
      <div>
      <h3>Count = {count}</h3>
      <button onClick={() => setCount(count + 1)}>Plus 1</button>
    </div>
    )
  }

  const getLocalItems = () => {
    let list = localStorage.getItem('todo');

    if (list) {
      return JSON.parse(localStorage.getItem('todo'));
    } else {
      return []
    }
  }

  const [todo, setTodo] = useState(getLocalItems())

  
  // console.log(todo)

  const arr = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Petr' },
    { id: 3, name: 'Ivan' },
    { id: 4, name: 'Alexey'},
    { id: 5, name: 'Jane'},
  ]
  const renderArr = arr.map(el => (
    <ul key={el.id}>
      <li key={el.id}>{el.id}. {el.name}</li>
    </ul>
  ));

  Test.defaultProps = {a: "5", b: "5"}

  return (
    <div className='App'>
        <Header />
        <Container maxWidth="md">
        <div className=''>
        {/* <div className='listTwo'>
        <OneHeader />
        {renderArr}
        </div> */}
        <div className='listTwo'>
        <TwoHeader />
        <AddTodo todo={todo} setTodo={setTodo} />
        <TodoList todo={todo} setTodo={setTodo} />
        {/* <Button variant="contained" color="primary">Material UI Button</Button> */}
        </div>
        </div>
        </Container>
    </div>
  );
}

export default App;
