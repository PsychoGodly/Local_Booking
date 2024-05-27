import React, { useState } from 'react';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'User',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRoleToggle = () => {
    setFormData({
      ...formData,
      role: formData.role === 'User' ? 'Admin' : 'User',
    });
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add user logic here
    console.log('User added:', formData);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.formGroup}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="password">Password:</label>
        <div style={styles.passwordWrapper}>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
          <button
            type="button"
            onClick={handlePasswordToggle}
            style={styles.showHideButton}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="role">Role:</label>
        <div style={styles.switchWrapper}>
          <span>{formData.role}</span>
          <button
            type="button"
            onClick={handleRoleToggle}
            style={styles.switchButton}
          >
            Toggle Role
          </button>
        </div>
      </div>
      <button type="submit" style={styles.addButton}>Add User</button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px',
    margin: '0 auto',
  },
  formGroup: {
    marginBottom: '15px',
    width: '100%',
  },
  input: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
  },
  passwordWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  showHideButton: {
    marginLeft: '10px',
    padding: '8px',
  },
  switchWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  switchButton: {
    marginLeft: '10px',
    padding: '8px',
  },
  addButton: {
    backgroundColor: 'green',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default UserForm;
