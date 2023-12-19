import React, {useState, useEffect} from 'react';
import ListItem from '../components/listitem';


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
        <div className='entries-list'>
          {entries.map((entries, index) => (
            <ListItem key={index} entries={entries} />
          ))}
        </div>
      </div> 
    );
}

export default PasswordsPage;