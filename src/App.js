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

  const deleteTask = (id) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm('Вы действительно хотите удалить сообщение?');
    if (result) {
      dispatch({
        type: 'task/delete',
        payload: id,
      });
    }
  };

  console.log(state);

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
        <Tabs value={0}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {state.tasks.map((obj) => (
            <Item
              key={obj.id}
              text={obj.text}
              completed={obj.completed}
              addCheckTask={addCheckTask}
              checkTask={state.checkTask}
              id={obj.id}
              deleteTask={deleteTask}
            />
          ))}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button>Отметить всё</Button>
          <Button>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
