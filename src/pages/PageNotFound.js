import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div style={{height:'100vh'}}>
            <h1>Page not found</h1>
            <p>Go to: <Link to='/'>Home</Link></p>
            
        </div>
    )
}

export default PageNotFound;