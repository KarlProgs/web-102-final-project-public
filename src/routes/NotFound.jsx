import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
  <>
    <p>Nothing to see here.</p>
    <Link style={{ color: "white" }} to="/">
      Go back Home.
    </Link>
  </>
  )
};

export default NotFound;
