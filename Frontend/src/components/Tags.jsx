import "./Tags.css"
import { Link } from "react-router-dom"
export default function Tags()
{
    return (
        <div className="mainTag">
            <Link to="/products/releif-tag">Releif</Link>
            <Link to="/products/painkiller-tag">Painkiller</Link>
            <Link to="/products/cough-tag">Cough</Link>
            <Link to="/products/beauty-tag">Beauty</Link>
            <Link to="/products/others-tag">Others</Link>
        </div>
    )
}