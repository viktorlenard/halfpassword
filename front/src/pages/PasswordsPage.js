import React, {useState, useEffect} from 'react';
import ListItem from '../components/listitem';
import CreateButton from '../components/createbutton';

const PasswordsPage = () => {
  
    let [entries, setEntries] = useState([]);
    useEffect (() => {
      getEntries();
    }, []);
  
    let getEntries = async () => {
      let response = await fetch('/api/passwords/');
      let data = await response.json();
      console.log(data);
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