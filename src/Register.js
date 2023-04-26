import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "./api/axios";
import "./styles/register.css";
import {Link } from "react-router-dom";  
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9- ]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';
const Register = () => {
    const userRef = useRef();  //user input
    const errRef = useRef();   //error 

    const navigate=useNavigate();

    const [user, setUser] = useState('');  //input
    const [validName, setValidName] = useState(false);  //name validates
    const [userFocus, setUserFocus] = useState(false); 

    const[pwd, setPwd] = useState('');
    const[validPwd, setValidPwd] = useState(false);
    const[pwdFocus, setPwdFocus] = useState(false);

    const[matchPwd, setMatchPwd] = useState('');
    const[validMatch, setValidMatch] = useState(false);
    const[matchFocus, setMatchFocus] = useState(false);

    const[errMsg, setErrMsg] = useState('');
    const[success, setSuccess] = useState(false);

    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    },[])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    },[user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd ===matchPwd;  //confirmation
        setValidMatch(match);
    },[pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    },[user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        //if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if(!v1 || !v2){
            setErrMsg("invalid entry");
            return;
        }
        try{
            const response = await axios.post(REGISTER_URL, JSON.stringify({user , pwd}),
            {
                headers:{'Content-Type':'application/json'},
                withCredentials: true
            });
            console.log(response.data);
            console.log(response.accessToken);
            console.log(JSON.stringify(response));
            setSuccess(true);
            //clear input fields
        }catch(err){
            if(!err?.response){
                setErrMsg('noserver response');
            }
            else if(err.response?.status === 409){
                setErrMsg('username taken');
            }
            else{
                setErrMsg("registration failed");
            }
            errRef.current.focus();
        }
        //console.log(user,pwd);
        //setSuccess(true);
    }

    return (
        <>
        {success ? (
            <section>
                <h1>Sucess!</h1>
                <p>
                    <a href="#">Sign In</a>
                </p>
            </section>
        ) : (
            <div className="div">
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                    Username:
                    <span className={validName ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validName || !user ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input 
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                required
                aria-invalid={validName ? "true" : "false"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                />

                {/* <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscren"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters.<br/>
                    Must begin with a letter.<br/>
                    Letters, numbers, underscores, hyphens allowed.
                </p> */}


<p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscren"}>
    <FontAwesomeIcon icon={faInfoCircle} />
    <span className="info-text">
        4 to 24 characters.<br/>
        Must begin with a letter.<br/>
        Letters, numbers,  hyphens allowed.
    </span>
</p>


            <label htmlFor="password">
                Password:
                <span className={validPwd ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validPwd || !pwd ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <input type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            />
            {/* <div>
      <FontAwesomeIcon
        icon={faInfoCircle}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      />
      <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle}/>
                8 to 24 characters.<br/>
                Must include uppercase and lowercase letters, a number and a special character.<br/>
                Allowed special characters: <span aria-label="exclamation mark">!</span>
                <span aria-label="atsymbol">@</span>
                <span aria-label="hashtag">#</span>
                <span aria-label="dollar sign">$</span>
                <span aria-label="percent">%</span>
            </p>

      )}
    </div> */}

<p id="uidnote" className={pwdFocus && !validPwd ? "instructions" : "offscren"}>
    <FontAwesomeIcon icon={faInfoCircle} />
    <span className="info-text">
    8 to 24 characters.<br/>
                Must include uppercase and lowercase letters, a number and a special character.<br/>
        Letters, numbers, underscores, hyphens allowed.
    </span>
</p>

    
            <label htmlFor="confirm_pwd">
            Confirm Password:
            <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validMatch || !matchPwd ? "hide" : "invalid"} >
                <FontAwesomeIcon icon={faTimes} />
            </span>
            </label>

            <input type="password"
            id="confirm_pwd"
            onChange={(e) => setMatchPwd(e.target.value)}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            />
            {/* <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscren"}>
                <FontAwesomeIcon icon={faInfoCircle}/>
                Must match the first password input field.
            </p> */}

<p id="uidnote" className={matchFocus && !validMatch ? "instructions" : "offscren"}>
    <FontAwesomeIcon icon={faInfoCircle} />
    <span className="info-text">
    Must match the first password input field.
    </span>
</p>

            {/* <button disabled={!validName || !validPwd || !validMatch ? true : false}>
                Sign Up
            </button> */}
            
<div className="button">
<button disabled={!validName || !validPwd || !validMatch ? true : false}>
  <div class="svg-wrapper-1">
    <div class="svg-wrapper">
      <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0z" fill="none"></path>
        <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
      </svg>
    </div>
  </div>
  <span>Sign Up</span>
</button>
</div>


            </form>

            <p> Already have an account?<span><NavLink to ="/SignIn">Sign In</NavLink></span></p>
        </section>
        </div>

        )}
        </>
    )
}

export default Register