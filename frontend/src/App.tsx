import './App.css'
import Notes from './components/Notes'
import Form from './components/Form'
import { useState } from 'react';

interface ApiDataType {
  id: number,
  content: string
}

type CallBackType = (jsonData: ApiDataType[]) => void;

interface FetchParamsType {
  method: string,
  headers: {},
  body?: string
}

export const fetchData = (method: string, data?: string, callback?: CallBackType) => {
  let jsonData = {
    id: 0,
    content: data
  };

  let params: FetchParamsType = {
    method: method,
    headers: {
      Accept: 'application/json'
    }
  };

  if (method === 'POST') {
    params.body = jsonData ? JSON.stringify(jsonData) : '';

    fetch(import.meta.env.VITE_API_URL, params);
  } else if (method === 'GET') {
    fetch(import.meta.env.VITE_API_URL, params)
      .then((res => res.json()))
      .then(json => {
        if (callback) 
          callback(json);
      })
      .catch(() => {
        console.log('err:');
      })
  } else if (method === 'DELETE') {
    params.body = jsonData ? JSON.stringify(jsonData) : '';
    fetch(import.meta.env.VITE_API_URL + '/' + data, params)
    .then((res => res.text()))
    .then(_text => {
      if (callback) 
        callback([]);
    })
    .catch(() => {
      console.log('err:');
    })
  }  
}

function App() {
  const [apiCount, setApiCount] = useState(0);

  const handleNoteSubmit = (e: React.FormEvent<HTMLFormElement>, data: {note: string}) => {
    e.preventDefault();
    const {note} = data;
    fetchData('POST', note);
    setApiCount((prev) => prev + 1); // rerender component Notes
  }

  return (
    <>
      <Notes key={apiCount} />
      <Form note="" onNoteSubmit={handleNoteSubmit}/>
    </>
  )
}

export default App
