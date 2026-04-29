import "./Navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const Navbar=(props)=>{
    const nav=useNavigate();
    const role=localStorage.getItem("role");
    const name=localStorage.getItem("username");
    const handlesign=()=>{
        if(props.sign=="sign in")
        {
            nav("/login");
        }
        else{
            localStorage.removeItem("role");
            localStorage.removeItem("username");
            nav("/");
        }
    }
    return(
        <div className="Navbar_container">
            <div className="logo_container">

            </div>
            <div className="nav_container">
                <Link to={"/"+role}>{props.home}</Link>
                <Link to={"/"+role+"/"+props.nav1}>{props.nav1}</Link>
                 <Link to={"/"+role+"/"+props.nav2}>{props.nav2}</Link>
                 <Link to={"/"+role+"/"+props.nav3}>{props.nav3}</Link>
                
            </div>
            <div className="profile_container ">
                <h3 className="text-white font-bold text-2xl">{name}</h3>
            </div>
            <div className="logout_container text-black font-bold">
                <p onClick={handlesign}>{props.sign}</p>
            </div>
        </div>
    );
}