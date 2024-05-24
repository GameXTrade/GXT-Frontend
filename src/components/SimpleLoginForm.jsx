import React, { useState, useContext } from "react";
import axios from "../api/axios";
// import axios from 'axios';

import { useNavigate, NavLink } from "react-router-dom";

import UserContext from "../context/UserContext";

import { Card, Input, Button, Typography } from "@material-tailwind/react";

export function SimpleLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    try {
      const response = await axios.post("/user/login", userData);
      // console.log(response)
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.token));
        setUser(response.data.token);
      }
      // Optional: Weiterleiten des Benutzers auf eine andere Seite
      navigate("/");
    } catch (error) {
      // Handle den Fehler hier (z.B. Anzeige einer Fehlermeldung)
      console.error("Fehler beim Signup:", error);
    }
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign In
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Returning user? Log in here to get started.
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-1 flex flex-col gap-6">
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
            autoComplete="username"
            value={email}
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
        </div>
        <Button type="submit" className="mt-6" fullWidth>
          Sign In
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Don't have an account yet?{" "}
          <NavLink to="/sign-up" className="font-semibold text-gray-900">
            Sign Up
          </NavLink>
        </Typography>
      </form>
    </Card>
  );
}
