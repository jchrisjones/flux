import AppView from '../views/AppView';
import {Container} from 'flux/utils';
import TodoDraftStore from  '../data/TodoDraftStore';
import TodoStore from '../data/TodoStore';
import TodoActions from '../data/TodoActions';

function getStores(){
  return [
    TodoDraftStore,
    TodoStore
  ];
}

function getState(){
  return {
    draft: TodoDraftStore.getState(),
    todos: TodoStore.getState(),

    onAdd: TodoActions.addTodo,
    onDeleteCompletedTodos: TodoActions.deleteCompletedTodos,
    onDeleteTodo: TodoActions.deleteTodo,
    onToggleAllTodos: TodoActions.toggleAllTodos,
    onToggleTodo: TodoActions.toggleTodo,
    onUpdateDraft: TodoActions.updateDraft
  }
}

export default Container.createFunctional(AppView, getStores, getState);