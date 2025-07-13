import { Link } from "react-router-dom";
export const Preview = () => {
  return (
    <div>
      <h1>Preview Page</h1>
      <Link to="/pay">
        <button>Next</button>
      </Link>
    </div>
  );
};
export default Preview;
