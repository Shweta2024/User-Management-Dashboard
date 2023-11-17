import { useEffect, useState } from "react";
import axios from 'axios'


function App() {

  const [activeTab, setActiveTab] = useState('show user')
  const [users, setUsers] = useState([])
  const [query, setQuery] = useState('')
  const [modal, setModal] = useState(false)
  const [modalName,setModalName] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  // set the values of username/password
  function changeFormData(event) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
    console.log(formData)
  }

  //add the new user in user list
  async function addUser(event) {
    event.preventDefault()
    const newUser = {
      username: formData.username,
      password: formData.password
    }
    setUsers([...users, newUser])
    setFormData({ username: '', password: '' })
    const response = await axios.post('/adduser', { username: newUser.username, password: newUser.password })
  }


  async function getUsers() {
    const response = await axios.get('/showusers')
    console.log(response.data)
    const newUser = response.data.users
    setUsers(newUser)
  }

  useEffect(() => {
    getUsers()
  }, [])

  const filteredArray = users.filter((val) => { return val.username.toLowerCase().includes(query.toLowerCase()) })


  function changeSearchQuery(event) {
    const searchQuery = event.target.value
    setQuery(searchQuery)
  }

  function showModal(event) {
    event.preventDefault()
    const name = event.target.id
    setModalName(name)
    setModal(true)
  }

  function closeModal() {
    setModal(false);
    setModalName('')
  }

  return (
    <div>
      <div class="tab-container">
        <div class="active-tabs" onClick={() => setActiveTab('show user')}>SHOW USER</div>
        <div class="active-tabs" onClick={() => setActiveTab('add user')}>ADD USER</div>
      </div>

      {activeTab === 'show user' && (
        <div>
            <div id="search-bar">
              <label>Search</label>
              <input type="search" onChange={changeSearchQuery} />
          </div>
          <div id="user-cards">
            {filteredArray.map((user, index) => (
              <div key={index} class="card">
                <h3 id={user.username} class="username" onClick={showModal}>{user.username.toUpperCase()}</h3>
                <p class="user-details">{('Email: ') + user.email}</p>
                <p class="user-details">{('Phone Number: ') + user.phoneNo}</p>
                <p class="user-details">{('Created At: ') + user.createdAt}</p>
              </div>
            ))}
            {modal && (<div class="modal" id="reportModal">
              <div class="modal-content">
                <h2>Generate Report of { modalName.toUpperCase()}</h2>
                <button id="generateReportBtn" onClick={closeModal}>Yes</button>
                <button id="close" onClick={closeModal}>No</button>
              </div>
            </div>)}
          </div>
        </div>
      )
      }

      {activeTab === 'add user' && (
        <div class="form">
          <form onSubmit={addUser}>
            <div class="details-input">
                <label > Enter your username:
                <input type="text" name="username" value={formData.username} required={true} onChange={changeFormData} />
              </label>
            </div>
            
            <div class="details-input">
              <label>
                Enter your password:
                <input type="text" name="password" value={formData.password} required={true} onChange={changeFormData} />
              </label>
            </div>
            <div class="button">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>)
      }
   </div>
  );
}

export default App;
