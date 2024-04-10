import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Navbar } from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("todos")) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, [])


  const saveToLocalStorage = () => {
    // setTodos(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const handleAdd = () => {
    if (todo.trim() === "") {
      alert("Empty Task");
    } else {
      setTodos([...todos, { todo, id: uuidv4(), isCompleted: false }]);
      setTodo("");
      saveToLocalStorage();
    }
  }


  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLocalStorage();
  }

  const handleEdit = (id) => {
    let todo = todos.filter((item) => item.id === id);
    setTodo(todo[0].todo);
    handleDelete(id);
    saveToLocalStorage();
  }

  const handleDelete = (id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    })
    setTodos(newTodos);
    saveToLocalStorage();
  }

  const toggleFinish = () => {
    setshowFinished(!showFinished);
  }



  return (
    <>
      <Navbar />

      <div className="container mx-auto my-5 bg-violet-200 p-5 rounded-xl min-h-[70vh] w-1/2">
        <h1 className="font-bold text-center text-lg">iTask - Manage Your Tasks at One Place</h1>
        <div className="addTodo my-3 flex flex-col">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full my-2 rounded-xl px-3 py-1' name="" id="" required />
          <button onClick={handleAdd} disabled={todo.length < 3} className='bg-violet-800 hover:bg-violet-950 text-white p-3 py-1 text-sm rounded-md font-bold mx-auto w-1/2 my-2'>Save</button>
        </div>
        <div className="flex justify-between">
          <h2 className='text-lg font-bold my-2'>Your Todos</h2>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" onChange={toggleFinish} checked={showFinished} />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900">Show Finished Tasks</span>
          </label>
        </div>
        <div className="todos">
          {todos.length === 0 && "No Tasks to do."}
          {todos.map((todoItem) => {
            return (showFinished || !todoItem.isCompleted) && <div key={todoItem.id} className="todo flex w-full justify-between my-2">
              <div className="flex gap-5">

                <input onChange={handleCheckbox} type="checkbox" name={todoItem.id} checked={todoItem.isCompleted} id="" />
                <div className={todoItem.isCompleted ? "line-through" : ""}>
                  {todoItem.todo}
                </div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={() => handleEdit(todoItem.id)} className='bg-violet-800 hover:bg-violet-950 text-white mx-1 p-3 py-1 text-lg rounded-md font-bold'><FaEdit /></button>
                <button onClick={() => handleDelete(todoItem.id)} className='bg-violet-800 hover:bg-violet-950 text-white mx-1 p-3 py-1 text-lg rounded-md font-bold'><MdDelete /></button>
              </div>
            </div>
          })}

        </div>
      </div>
    </>
  )
}

export default App
