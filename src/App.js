import React from 'react';
import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';
import { reducer } from './redux/reducer';

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    checkbox: false,
    inputValue: '',
    tasks: [],
  });

  const onChange = (string) => {
    dispatch({
      type: 'input/value',
      payload: string,
    });
  };

  const onCheck = (bool) => {
    dispatch({
      type: 'box/check',
      payload: bool,
    });
  };

  const addTask = () => {
    dispatch({
      type: 'task/send',
    });
  };

  const addCheckTask = (id) => {
    dispatch({
      type: 'task/check',
      payload: id,
    });
  };

  const changeAllCheckbox = () => {
    if (state.tasks.every((obj) => obj.completed)) {
      dispatch({
        type: 'check/completed/false',
      });
    } else {
      dispatch({
        type: 'check/completed/true',
      });
    }
  };

  const deleteTask = (id) => {
    if (window.confirm('Вы действительно хотите удалить задачу?')) {
      dispatch({
        type: 'task/delete',
        payload: id,
      });
    }
  };

  const removeAllTasks = () => {
    if (window.confirm('Вы действительно хотите удалить все задачи?')) {
      dispatch({
        type: 'tasks/all/remove',
      });
    }
  };

  const [value, setValue] = React.useState(0);

  const handleAtiveTab = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField
          onChange={onChange}
          onCheck={onCheck}
          text={state.inputValue}
          onBox={state.checkbox}
          addTask={addTask}
        />
        <Divider />
        <Tabs onChange={handleAtiveTab} value={value}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {/* Ничего другого не придумал кроме этого чудовешного тернарника */}
          {value === 1
            ? state.tasks
                .filter((el) => !el.completed)
                .map((obj) => (
                  <Item
                    key={obj.id}
                    text={obj.text}
                    completed={obj.completed}
                    addCheckTask={addCheckTask}
                    id={obj.id}
                    deleteTask={deleteTask}
                  />
                ))
            : value === 2
            ? state.tasks
                .filter((el) => el.completed)
                .map((obj) => (
                  <Item
                    key={obj.id}
                    text={obj.text}
                    completed={obj.completed}
                    addCheckTask={addCheckTask}
                    id={obj.id}
                    deleteTask={deleteTask}
                  />
                ))
            : state.tasks
                .filter((el) => el)
                .map((obj) => (
                  <Item
                    key={obj.id}
                    text={obj.text}
                    completed={obj.completed}
                    addCheckTask={addCheckTask}
                    id={obj.id}
                    deleteTask={deleteTask}
                  />
                ))}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button disabled={!state.tasks.length} onClick={changeAllCheckbox}>
            {state.tasks.every((obj) => obj.completed === true) ? 'Снять отметки' : 'Отметить всё'}
          </Button>
          <Button disabled={!state.tasks.length} onClick={removeAllTasks}>
            Очистить
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
