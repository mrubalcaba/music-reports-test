import React, { createContext, useReducer, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TablePage from './TablePage';
import './App.css';

const initialState = {
  page1: {
    userId: '',
    title: '',
  },
  page2: {
    userId: '',
    title: '',
  },
  data: null
}

export const PageContext = createContext(initialState);

function reducer(state, action) {
  const { value, type, page } = action;
  switch (type) {
    case 'ADD_DATA': return { ...state, data: value }
    case 'UPDATE_USER_ID':
      switch (page) {
        case 1: return { ...state, page1: { ...state.page1, userId: value } };
        case 2: return { ...state, page2: { ...state.page2, userId: value } };
      }
      break;
    case 'UPDATE_TITLE':
      switch (page) {
        case 1: return { ...state, page1: { ...state.page1, title: value } };
        case 2: return { ...state, page2: { ...state.page2, title: value } };
      }
      break;
    default: return state;
  }
}

function App() {
  const [filter, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getData = () => {
      if (!filter.data) {
        fetch('https://jsonplaceholder.typicode.com/todos')
          .then(res => res.json())
          .then(data => {
            let fetched = [];
            for (let d of data) {
              fetched.push({ ...d });
            }
            dispatch({ type: 'ADD_DATA', value: fetched });
          })
      }
    }
    getData();
  }, [])

  return (
    <PageContext.Provider value={{ dispatch, page1: filter.page1, page2: filter.page2, data: filter.data }}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<TablePage num={1} />}></Route>
          <Route exact path="/form2" element={<TablePage num={2} />}></Route>
        </Routes>
      </BrowserRouter>
    </PageContext.Provider>
  );
}

export default App
