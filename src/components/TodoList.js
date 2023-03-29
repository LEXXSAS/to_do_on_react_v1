import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import OpenInNewOutlinedIcon from '@material-ui/icons/OpenInNewOutlined';
import CancelPresentationOutlinedIcon from '@material-ui/icons/CancelPresentationOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  makeStyles,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  buttonMr: {
    marginRight: "0.5rem",
    marginBottom: "0"
  },
  buttonMb: {
    marginRight: "0.5rem",
    marginBottom: "0.5rem"
  },
  inputMr: {
    marginRight: "0.5rem",
    marginBottom: "0",
  }
}));


function TodoList({ todo, setTodo }) {

    const classes = useStyles();
    const [edit, setEdit] = useState(null)
    const [value, setValue] = useState('')
    const [filtered, setFiltered] = useState(todo)



    useEffect(() => {
      setFiltered(todo)
    }, [todo])

    function todoFilter(status) {
      if (status == 'all') {
        setFiltered(todo)
      } else {
        let newTodo = [...todo].filter(item => item.status === status)
        setFiltered(newTodo)
      }
    }

    function deleteTodo(id) {
        let newTodo = [...todo].filter(item => item.id!=id)
        setTodo(newTodo)
    }

    function statusTodo(id) {
      let newTodo = [...todo].filter(item => {
        if(item.id == id) {
          item.status = !item.status
        }
        return item
      })
      setTodo(newTodo)
    }

    function editTodo(id, title) {
      setEdit(id)
      setValue(title)
    }

    function saveTodo(id) {
      let newTodo = [...todo].map(item => {
        if (item.id == id) {
          item.title = value
        }
        return item
      })
      setTodo(newTodo)
      setEdit(null)
    }

    return (
      <div>
        <div className='btnGroup'>
          <Button onClick={() => todoFilter('all')} className={classes.buttonMb} variant="contained" color='secondary' size='small'>Все</Button>
          <Button onClick={() => todoFilter(true)} className={classes.buttonMb} variant="contained" color='secondary' size='small'>Открытые</Button>
          <Button onClick={() => todoFilter(false)} className={classes.buttonMb} variant="contained" color='secondary' size='small'>Закрытые</Button>
        </div>
        {
          filtered.map(item => (
                <ul key={item.id} >
                    {
                      edit == item.id ?
                      <div>
                          <div className='inpTwo'>
                            <div>
                            <TextField value={value} onChange={(e) => setValue(e.target.value)} className={classes.inputMr} size="small" id="outlined-multiline-static" label="Новый текст" multiline minRows={4} variant="outlined" placeholder="Новый текст" />
                            </div>
                          <div>
                          <Button className={classes.buttonMr} onClick={() => saveTodo(item.id)} variant="contained" color='secondary' size='small'>Сохранить</Button>
                          </div>

                         </div>
                      </div>
                      :
                      <div className='inpAll'>
                      <div><p className={!item.status ? 'close' : 'p'}>{ item.title }</p></div>
                      <div className='inpBtns'>
                      <Button className={classes.buttonMb} variant="contained" color='secondary' size='small' onClick={() => deleteTodo(item.id)}><DeleteOutlinedIcon /></Button>
                      <Button className={classes.buttonMb} variant="contained" color='secondary' size='small' onClick={() => editTodo(item.id, item.title)}><OpenInNewOutlinedIcon /></Button>
                      <Button className={classes.buttonMb} variant="contained" color='primary' size='small' onClick={() => statusTodo(item.id)}
                      >{
                        item.status ? <LockOpenOutlinedIcon /> : <LockOutlinedIcon />
                      }
                      </Button>
                      </div>
                      </div>
                    }
                    {/* <li>{ item.title }</li> */}

                </ul>
          ))
        }
      </div>
    )
  }

  export default TodoList
