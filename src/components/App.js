import React, { useState } from 'react'
import '../styles/App.css';

const App = () => {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);

  const fetchUseData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://content.newtonschool.co/v1/pr/main/users");
      const result = await response.json();
      setUsers(result);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  const handleClick = () => {
    fetchUseData();
  }

  const handleSortBtn = () => {
    const sortedUsers =  [...users].sort((a, b) => {
      const nameALen = a.name.length;
      const nameBLen = b.name.length;
      return (sortAscending ? nameALen - nameBLen : nameBLen - nameALen);
    });
    setUsers(sortedUsers);
    setSortAscending(!sortAscending);
  }
  

  return (
    <div id="main">
      <h2>User List</h2>

      <button onClick={handleClick} className="fetch-data-btn">Fetch User Data</button>
      <button onClick={handleSortBtn} className="sort-btn">
        {sortAscending ? "Sort by name length (ascending)" : "Sort by name length (descending)" }
      </button>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className='users-section'>
          {users.map((user) => (
            <li key={ user.id }>
              <section className='id-section'>{ user.id }</section>
              <section className='name-email-section'>
                <p className='name'>Name: { user.name }</p>
                <p className='email'>Email: { user.email }</p>
              </section>
            </li>
          ))}
        </div>
      )}

    </div>
  )
}


export default App;
