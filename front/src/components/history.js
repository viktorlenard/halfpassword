import React from 'react';

const History = ({ password }) => {
    // Ensure password.history is defined and sort it in descending order by the 'created' field
    const sortedHistory = password.history && [...password.history].sort((a, b) => new Date(b.created) - new Date(a.created));

    // Exclude the latest entry
    const historyWithoutLatest = sortedHistory && sortedHistory.slice(1);

    return (
        <div className="history-list">
            <h3>Password History</h3>
            <div className="history-inner">
                {historyWithoutLatest && historyWithoutLatest.map((item, index) => {
                    // Create a new Date object from the 'created' field
                    const date = new Date(item.created);
                    // Format the date as year, month, and day
                    const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                    return (
                        <div key={index}>
                            <p>{formattedDate}</p>
                            <button className='switchy-button' onClick={() => navigator.clipboard.writeText(item.password)}>{item.password}</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default History;