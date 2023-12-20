import React, { useState, useEffect } from 'react';

const Generator = () => {
  
    const [lenght, setLenght] = useState(3);
    const [data, setData] = useState(null); // Add this line

    const handleLenghtChange = (event) => { 
        setLenght(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(event.target.value);

        const formData = {
            human: event.target.human.checked,
            length: event.target.length.value,
            div: event.target.div.value,
            caps: event.target.caps.checked,
            nums: event.target.nums.checked,
        };

        const response = await fetch('/api/generate/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setData(data); // Add this line
        } else {
            console.error('Error:', response.status, response.statusText);
        }
    }
    
    return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
            Generator
        </label>
        <label>
            Readable
            <input label='Readable' type="checkbox" name="human" />
        </label>
        <label>
            Length
            <input type="range" min='3'max='8' step='1' name="length" onChange={handleLenghtChange}/>
            {lenght}
        </label>
        <select multiple={false} name="div" >
            <option value={'_'}>_</option>
            <option value={'-'}>-</option>
            <option value={'.'}>.</option>
        </select>
        <label>
            Caps
            <input type="checkbox" name="caps" />
        </label>
        <label>
            Nums
            <input type="checkbox" name="nums" />
        </label>
        <input type="submit" value="Submit" />
    </form>
    <p>{data}</p>
    </div>
  )
}

export default Generator