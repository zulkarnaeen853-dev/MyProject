import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE = 'http://localhost:3000/api/v1';

const getPictureUrl = (picture) => {
  if (!picture) return '';
  return picture;
};

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    picture: '',
  });

  const [accounts, setAccounts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const clearForm = () => {
    setFormData({ name: '', email: '', password: '', picture: '' });
    setEditingId(null);
    setIsEditing(false);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE}/auth/users`);
      const data = response.data?.data || response.data || [];
      setAccounts(data);
    } catch (error) {
      console.error('Error fetching users:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const password = formData.password.trim();
    const picture = formData.picture.trim();

    if (!name || !email || !password) return;

    const payload = { name, email, password, picture };

    try {
      if (isEditing && editingId) {
        await axios.put(`${API_BASE}/user/update/${editingId}`, payload);
      } else {
        await axios.post(`${API_BASE}/auth/register`, payload);
      }

      clearForm();
      await fetchUsers();
    } catch (error) {
      console.error(
        isEditing ? 'Update failed:' : 'Registration failed:',
        error.response?.data || error.message
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (!confirmed) return;

    try {
      await axios.delete(`${API_BASE}/user/delete/${id}`);
      if (editingId === id) {
        clearForm();
      }
      await fetchUsers();
    } catch (error) {
      console.error('Delete failed:', error.response?.data || error.message);
    }
  };

  const handleUpdate = (id) => {
    const account = accounts.find((item) => item._id === id);
    if (!account) return;

    setFormData({
      name: account.name,
      email: account.email,
      password: account.password,
      picture: account.picture || '',
    });
    setEditingId(id);
    setIsEditing(true);
  };

  return (
    <div className="page-shell">
      <div className="form-card">
        <h1>{isEditing ? 'Update User' : 'User Registration'}</h1>

        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Your Name"
            aria-label="Name"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Your Email"
            aria-label="Email"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Your Password"
            aria-label="Password"
          />

          <input
            type="text"
            name="picture"
            value={formData.picture}
            onChange={handleChange}
            placeholder="Paste Cloudinary Image URL"
            aria-label="Picture URL"
          />

          {formData.picture && getPictureUrl(formData.picture) && (
            <div className="picture-preview">
              <img src={getPictureUrl(formData.picture)} alt="Preview" />
            </div>
          )}

          <div className="form-actions">
            <button type="submit">{isEditing ? 'Save Changes' : 'Submit'}</button>
            {isEditing && (
              <button type="button" className="cancel-btn" onClick={clearForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <section className="accounts-section">
        <h2>Registered Accounts</h2>

        <div className="accounts-panel">
          {accounts.length === 0 ? (
            <div className="empty-state">
              <p>No registered accounts found in the database.</p>
            </div>
          ) : (
            <div className="documents-list">
              {accounts.map((account) => {
                const picUrl = getPictureUrl(account.picture);
                return (
                  <div key={account._id} className="mongo-document">
                    <div className="document-header">
                      <span className="document-id">{account._id}</span>
                      <div className="document-actions">
                        <button
                          type="button"
                          className="action-btn update-btn"
                          onClick={() => handleUpdate(account._id)}
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          className="action-btn delete-btn"
                          onClick={() => handleDelete(account._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="document-body">
                      {picUrl && (
                        <div className="picture-field">
                          <span className="field-key">picture</span>
                          <div className="picture-container">
                            <img src={picUrl} alt={`${account.name}'s profile`} className="user-picture" />
                          </div>
                        </div>
                      )}

                      <div className="field-row">
                        <span className="field-key">name</span>
                        <span className="field-value">{account.name}</span>
                      </div>

                      <div className="field-row">
                        <span className="field-key">email</span>
                        <span className="field-value">{account.email}</span>
                      </div>

                      <div className="field-row">
                        <span className="field-key">password</span>
                        <span className="field-value password-value">{account.password}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
