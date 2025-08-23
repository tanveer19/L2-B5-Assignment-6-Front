import { Link } from "react-router";

export default function Unauthorized() {
  return (
    <div>
      <h1>Unauthorized</h1>
      <Link to="/">Home</Link>
    </div>
  );
}
