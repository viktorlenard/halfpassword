import React, {useState, useEffect, useContext} from 'react';
import ListItem from '../components/listitem';
import CreateButton from '../components/createbutton';
import AuthContext from '../context/AuthContext';

const PasswordsPage = () => {
  
    let {authTokens} = useContext(AuthContext);

    let [entries, setEntries] = useState([]);
    useEffect (() => {
      getEntries();
    }, []);
  
    let getEntries = async () => {
      let response = await fetch('/api/passwords/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access)
        }
      });
      let data = await response.json();
      setEntries(data);
    }

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