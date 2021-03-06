export function reducer(state, action) {
  if (action.type === 'input/value') {
    return {
      ...state,
      inputValue: action.payload,
    };
  }

  if (action.type === 'box/check') {
    return {
      ...state,
      checkbox: action.payload,
    };
  }

  if (action.type === 'task/send') {
    return {
      ...state,
      tasks: [
        ...state.tasks,
        {
          id: state.tasks.length ? state.tasks[state.tasks.length - 1].id + 1 : 0,
          text: state.inputValue,
          completed: state.checkbox,
        },
      ],
      inputValue: '',
      checkbox: false,
    };
  }

  if (action.type === 'task/check') {
    return {
      ...state,
      tasks: state.tasks.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      }),
    };
  }

  if (action.type === 'task/delete') {
    return {
      ...state,
      tasks: state.tasks.filter((item) => item.id !== action.payload),
    };
  }

  if (action.type === 'check/completed/true') {
    return {
      ...state,
      tasks: state.tasks.map((task) => {
        return {
          ...task,
          completed: true,
        };
      }),
    };
  }

  if (action.type === 'check/completed/false') {
    return {
      ...state,
      tasks: state.tasks.map((task) => {
        return {
          ...task,
          completed: false,
        };
      }),
    };
  }

  if (action.type === 'tasks/all/remove') {
    return {
      ...state,
      tasks: [],
    };
  }

  return state;
}
