import React, { useState, useContext } from 'react';
import axios from "../api/axios";
import { useNavigate, NavLink } from 'react-router-dom';

import UserContext from '../context/UserContext';

import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

export function SimpleRegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageLink, setImageLink] = useState('');

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: name,
      email,
      password,
      image: imageLink,
    };

    try {
            // Sende Benutzerdaten an das Backend
            const response = await axios.post('/user', userData);
            console.log(response)
            if (response.data.token){
                localStorage.setItem('user', JSON.stringify(response.data.token));
                setUser(response.data.token);
            }
            // Optional: Weiterleiten des Benutzers auf eine andere Seite
            navigate('/');
        } catch (error) {
            // Handle den Fehler hier (z.B. Anzeige einer Fehlermeldung)
            console.error('Fehler beim Signup:', error);
        }
    };

  return (
    <div>
      <title>GameXTrade | sign-up</title>
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              size="lg"
              placeholder="your name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={email}
              autoComplete="username"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Image Link
            </Typography>
            <Input
              size="lg"
              placeholder="image link"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
            />
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            Sign Up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <NavLink to="/sign-in" className="font-semibold text-gray-900">
              Sign In
            </NavLink>
          </Typography>
        </form>
      </Card>
    </div>
    );
}
