import { useRef, useState, useEffect, useContext } from "react"
import AuthContext from "./context/AuthProvider";
import axios from "./api/axios";
import { NavLink, useNavigate } from "react-router-dom";

const LOGIN_URL = './auth'
const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const userRef = useRef();// user input
    const errRef = useRef();//error

    const [user, setUser] = useState('');  //input

    const [pwd, setPwd] = useState(''); //password

    const [errMsg, setErrMsg] = useState(''); //error
    const [success, setSuccess] = useState(false); //can remove later to route to diff page

    useEffect(() => {  //nothing in dependency
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new URLSearchParams();
        data.append("username", user);
        data.append("password", pwd);
        try {
            const response = await axios.post(`http://127.0.0.1:8000/login`, data,
                {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    withCredentials: true
                }
            ); //username:user  depending on backend
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response)); 
            const accessToken = response?.data?.accessToken;
            const roles = response?.date?.roles;
            setAuth({ user, pwd, roles, accessToken });

            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('no server response');
            }
            else if (err.response?.status === 400) {
                setErrMsg(' missing username or password');
            }
            else if (err.response?.status === 401) {
                setErrMsg(' unauthorized');
            }
            else {
                setErrMsg("login failed");
            }
            errRef.current.focus();
        }
        //console.log(user,pwd);

    }
    return (
        <>
            {success ? (
                <section>
                    <h1>you are logged in!</h1>
                    <br />
                    <p>
                        <NavLink to="/HomePage">HomePage</NavLink>
                    </p>
                </section>
            ) : (


                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> {/*assertive allows ro reach msg immediately*/}
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} value={user} required />
                        <br />
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" autoComplete="off" onChange={(e) => setPwd(e.target.value)} value={pwd} required />
                        <br />

                        {/* <button className="button">Sign In</button> */}

                        <div className="button">
                                <button >
                                    <div class="svg-wrapper-1">
                                        <div class="svg-wrapper">
                                            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <span>Sign In</span>
                                </button>
                            </div>
                    </form >
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            {/*put router link here */}
                            {/* <a href="src\Register.js">Sign Up</a> */}
                            <NavLink to="/Register">Sign Up</NavLink>
                        </span>
                    </p>
                </section>
            )
            }
        </>
    )
}

export default Login