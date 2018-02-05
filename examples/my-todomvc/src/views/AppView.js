import React from 'react';

const ENTER_KEY_CODE = 13;

function AppView(props) {
  return(
    <div>
      <Header {...props} />
      <Main {...props} />
      <Footer {...props} />
    </div>
  );
}

function Header(props) {
  return(
    <header id="header">
      <h1>todos</h1>
      <NewTodo {...props} />
    </header>
  );
}

function Main(props){
  if(props.todos.size === 0){
    return null;
  }

  const areAllComplete = props.todos.every(todo => todo.complete);

  return(
    <section id="main">
      <input
        type="checkbox"
        id="toggle-all"
        checked={areAllComplete ? 'checked' : ''}
        onChange={props.onToggleAllTodos}
      />
      <label htmlFor="toggle-all">
        Mark all as complete
      </label>
      <ul id="todo-list">
        {[...props.todos.values()].reverse().map(todo => (
          <li key={todo.id}>
            <div className="view">
              <input
                className="toggle"
                type="checkbox"
                checked={todo.complete}
                onChange={() => props.onToggleTodo(todo.id)}
              />
              <label>{todo.text}</label>
              <button
                className="destroy"
                onClick={() => props.onDeleteTodo(todo.id)}
              />
            </div>  
          </li>
        ))}
      </ul>
    </section>
  );
}

function Footer(props) {
  if(props.todos.size === 0){
    return null;
  }

  const remaining = props.todos.filter(todo => !todo.complete).size;
  const completed = props.todos.size - remaining;
  const phrase = remaining === 1 ? ' item left' : ' items left';

  let clearCompletedButton = null;
  if(completed > 0){
    clearCompletedButton = 
      <button
        id="clear-completed"
        onClick={props.onDeleteCompletedTodos}>
        Clear completed ({completed})
      </button>
  }

  return(
    <footer id="footer">
      <span id="todo-count">
        <strong>
          {remaining}
        </strong>
        {phrase}
      </span>
      {clearCompletedButton}
    </footer>
  );
}

function NewTodo(props){
  const addTodo = () => props.onAdd(props.draft);
  const onBlur = () => addTodo();
  const onChange = (e) => props.onUpdateDraft(e.target.value);
  const onKeyDown = (e) => {
    if(e.keyCode === ENTER_KEY_CODE){
      addTodo();
    }
  }
  return(
    <input 
      autoFocus={true}
      id="new-todo"
      placeholder="What needs to be done?"
      value={props.draft}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}

export default AppView;