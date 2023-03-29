import { Button, TextField, makeStyles } from "@material-ui/core";
import React, {useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import TodoList from "./TodoList";

const useStyles = makeStyles((theme) => ({
    buttonMr: {
      marginRight: "0.5rem",
      marginBottom: "0.5rem"
    }
  }));

function AddTodo ({todo, setTodo}) {
    const classes = useStyles();
    const [value, setValue] = useState('')
    
    localStorage.setItem('todo', JSON.stringify(todo));
    
    function saveTodo() {
        if (value !== '') {
            setTodo(
                [...todo, {
                    id:  uuidv4(),
                    title: value,
                    status: true
                }]
            )
            
        }
        setValue('')
        
    }
    
    return (
        <div className="inp">
            <div className="inpF">
            <TextField className={classes.buttonMr} size="small" id="outlined-basic" label="Введите текст" variant="outlined" placeholder="Введите текст" value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
            <Button className={classes.buttonMr} onClick={(saveTodo)} variant="contained" color='secondary' size='small'>Добавить</Button>
        </div>
    )
}

export default AddTodo
