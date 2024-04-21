import React, { useState } from 'react';
import axios from "../api/axios";
import { useNavigate,NavLink } from 'react-router-dom';


function SignUpFormular() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageLink, setImageLink] = useState('');

  const [emailerror, setEmailerror] = useState('')

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
      setEmailerror('')
    } else if (name === 'imageLink') {
      setImageLink(value);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Eingereicht: ', { name, email, imageLink });
    const userData = {
      username: name, email, image: imageLink
    }

    try{
      const response = await axios.post("/user", userData)
      navigate("/status", {state: {message: response.data.code}})
    } catch (err){
      console.error('Fehler beim Senden der Daten:', err.response.data.detail);
      setEmailerror(err.response.data.detail)
    }
  };


  return (
      <div className='flex flex-col items-center '>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10 shadow-xl p-11 rounded-lg">
          <NavLink to={`/sign-in`} className="font-medium text-gray-800 hover:text-gray-300">
            Sign In&nbsp;<span aria-hidden="true">&rarr;</span>
          </NavLink>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
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
            <p className='text-red-400'>{emailerror}</p>
          </div>
          <div>
            <label htmlFor="imageLink" className="block text-sm font-medium text-gray-700">Bildlink:</label>
            <input
              type="text"
              id="imageLink"
              name="imageLink"
              value={imageLink}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Senden
          </button>
        </form>
    </div>
  );
}

export default SignUpFormular;
