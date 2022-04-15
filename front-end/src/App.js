import './App.css';
import React from 'react';

function App() {
  // state variables
  const [loggedIn, setIsLoggedIn] = React. useState(false);
  const [userName, setUserName] = React. useState('');
  const [password, setPassword] = React. useState('');
  const [message, setMessage] = React. useState('');
  const [messages, setMessages] = React. useState([]);

  function getMessages(){
    fetch('/getMessages')
      .then(res => res.json()) // build in json to js
      .then((data) => {
          console.log(data);
          setMessages(data); 
      })
      .catch(error => console.log(error));
  }

  const handleSubmit = () => {
    console.log('User has clicked submit'); // browser console
    setIsLoggedIn(true);
    getMessages();
  };

  function submitMessage(){
    console.log(message);
    const body = {
      userName : userName,
      message : message,
    };
    const settings = {
      method: 'post',
      body: JSON.stringify(body),
    };
    fetch('/submitMessage', settings) // makes http requestion to back end
      .then(() => getMessages())
      .then(() => setMessage(''))
      .catch(error => console.log(error));
  }

  if(!loggedIn){
    return(
      <div>
        <h1>Please log in</h1>
        <input 
        value={userName} 
        onChange={(event) => setUserName(event.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome {userName}!</h1>
      <div>
        <textarea 
        value={message} 
        onChange={(event) => setMessage(event.target.value)}
        />
        <button onClick={submitMessage}>sumbit</button>
      </div>

      <div>
        {messages.map(m => {
          return (
            <div>
              userName: {m.userName}
              <br />
              message: {m.message}
            </div>  
          );
        })}
      </div>
    </div>
  );
}

export default App;
