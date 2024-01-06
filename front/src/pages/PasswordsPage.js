import React, {useState, useEffect, useContext, useCallback} from 'react';
import ListItem from '../components/listitem';
import CreateButton from '../components/createbutton';
import AuthContext from '../context/AuthContext';

const PasswordsPage = () => {
  
    let {authTokens, logoutUser} = useContext(AuthContext);

    let [entries, setEntries] = useState([]);
  
    let getEntries = useCallback(async () => {
      let response = await fetch('/api/passwords/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access)
        }
      });
      let data = await response.json();
      if (response.status === 200) {
        setEntries(data);
        console.log(data);
      }else if(response.statusText === 'Unauthorized')
      {
        logoutUser();
      }
    }, [authTokens, logoutUser]);

    useEffect (() => {
      getEntries();
    }, [getEntries]);

    return (
      <div>
        <div>
          <CreateButton />
        </div>
        <div className='entries-list'>
          {entries.map((entries, index) => (
            <ListItem key={index} entries={entries} />
          ))}
        </div>
      </div> 
    );
}

export default PasswordsPage;