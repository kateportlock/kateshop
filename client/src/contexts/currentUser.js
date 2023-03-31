import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CurrentUserContext = React.createContext([{}, () => { }]);

const CurrentUserProvider = (props) => {

  const navigate = useNavigate();

  const loggedUser = localStorage.getItem('loggedUser');

  const [state, setState] = useState(loggedUser === null ? {} : JSON.parse(loggedUser));

  useEffect(() => {

    if (loggedUser) {

      fetch("http://localhost:5000/api/auth", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data === 'unauthorize') {
            localStorage.removeItem('loggedUser');
            setState({});
            navigate('/');
          }
        });
    }

  }, []);

  return (
    <CurrentUserContext.Provider value={[state, setState]}>
      {props.children}
    </CurrentUserContext.Provider>
  );
}

export { CurrentUserContext, CurrentUserProvider };
