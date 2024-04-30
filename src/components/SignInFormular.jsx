import React, { useState, useContext } from 'react';
import axios from "../api/axios";
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

function SignInFormular() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password'){
      setPassword(value)
    } else if (name === 'email') {
      setEmail(value);
      setEmailError('')
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      const response = await axios.post("/user/login", userData);
      if (response.data.token){
        localStorage.setItem('user', JSON.stringify(response.data.token));
        setUser(response.data.token);
      }
      console.log(response.data)
      navigate("/");
    } catch (err) {
      console.error('Fehler beim Senden der Daten:', err.response.data.detail);
      setEmailError(err.response.data.detail);
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10 shadow-xl p-11 rounded-lg">
  
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-Mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {emailError && <p className='text-red-400'>{emailError}</p>}
        </div>
        <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Passwort:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Senden
        </button>
      </form>
    </div>
  );
}

export default SignInFormular;
