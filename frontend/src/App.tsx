//import { useState } from 'react'
import './App.css'
import Notes from './components/Notes'
import Form from './components/Form'
import { useState } from 'react';
//import { useState } from 'react'

// interface FormType {
//   note: string
// }

interface ApiDataType {
  id: number,
  content: string
}

// interface FetchDataPropsType {
//   method: string, 
//   content?: string | null, 
//   callback?: (jsonData: ApiDataType[]) => void
// }

type CallBackType = (jsonData: ApiDataType[]) => void;

interface FetchParamsType {
  method: string,
  headers: {},
  body?: string
}

export const fetchData = (method: string, data?: string, callback?: CallBackType) => {
//const fetchData (method, content, callback) => {
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
        // console.log('fetchData:', json);
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
      // console.log('fetchData:', json);
      if (callback) 
        callback([]);
    })
    .catch(() => {
      console.log('err:');
    })
  }
    
  
  
    // .then((response => {
    //   const contentType = response.headers.get('content-type');
    //   if (response.ok && contentType && contentType.indexOf('application/json') !== -1) {
    //     console.log('response contentType: ', contentType);
    //     response.json()
    //       .then(json => {
    //         console.log('fetchData:', json);
    //         if (callback) 
    //           callback(json);
    //       })
    //   }
    // }))
    
}

function App() {
  const [_apiData, setApiData] = useState<ApiDataType[]>([]);
  const [apiCount, setApiCount] = useState(0);
  

  const processApiData = (data: ApiDataType[]) => {
    setApiData(data);
    console.log('processApiData', JSON.stringify(data));
  }

  //const handleNoteSubmit (e, formData) {
  //const handleNoteSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
  const handleNoteSubmit = (e: React.FormEvent<HTMLFormElement>, data: {note: string}) => {
    e.preventDefault();
    //const {name, value} = (e.target as HTMLInputElement);

    // if (name === 'note')
    //   this.setState({
    //     [name]: value
    //   });
    //this.props.onNoteSubmit(e);
    console.log('handleSubmit App:', data);
    const {note} = data;
    //fetchData('POST', note, processApiData);
    fetchData('POST', note);
    setApiCount((prev) => prev + 1); // rerender component Notes
  }

  // useEffect(() => {
  //   fetchData('GET', undefined, processApiData);
  //   console.log('useEffect', 'fetchData');

  //   return () => {
  //     console.log('component will unmount');
  //   }
  // }, [apiData]);

  return (
    <>
      <Notes key={apiCount} />
      {/* {apiData.map(data => <div key={data.id}>id: {data.id} content: {data.content}</div>)} */}
      <Form note="" onNoteSubmit={handleNoteSubmit}/>
    </>
  )
}

export default App
