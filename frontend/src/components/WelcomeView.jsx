import { Link } from "react-router-dom";

export default function WelcomeView() {
  return (
    <div>
      <h1>Selamat datang di Mamood</h1>
      <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
    </div>
  );
}
