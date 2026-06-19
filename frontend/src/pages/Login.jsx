import { useState }
  from "react";

import {
  useAuth
} from "../context/AuthContext";

function Login() {
  const {
    login
  } = useAuth();

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword
  ] = useState("");

  async function handleSubmit(
    e
  ) {
    e.preventDefault();

    try {
      await login(
        email,
        password
      );
    } catch {
      alert(
        "Login failed"
      );
    }
  }

  return (
    <div
      style={{
        padding: "2rem"
      }}
    >
      <h1>
        FocusVector
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <button
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;