import React, { useState, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

//default App already used so import like this 
import { UserContext } from "../App";

const Login = () => {

    const { state, dispatch } = useContext(UserContext);

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();

        const res = await fetch('/signin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const data = res.json();

        console.log("res data", data)

        if (res.status === 400 || !data) {
            window.alert("Invalid Credentials")
        } else {
            dispatch({ type: 'USER', payload: true })
            window.alert("Login Successfull")
            history.push("/")
        }
    }

    return (
        <div>
            <div className="login-form">
                <form method="post">
                    <h2 className="text-center">Log in</h2>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <span className="fa fa-user"></span>
                                </span>
                            </div>
                            <input type="email" className="form-control" name="email" autoComplete="off"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Username" required="required" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-lock"></i>
                                </span>
                            </div>
                            <input type="password" className="form-control" name="password" autoComplete="off"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password" required="required" />
                        </div>
                    </div>
                    <div className="form-group form-button">
                        <input type="submit" name="signin" id="signin" className="form-submit"
                            value="login"
                            onClick={loginUser}
                        />
                    </div>

                </form>

                <div class="clearfix">
                    {/* <label class="float-left form-check-label"><input type="checkbox" /> Remember me</label> */}
                    <input type="checkbox" /> <h6 class="float-left"> Remember me</h6>
                    <NavLink to="#" class="float-right">Forgot Password?</NavLink>
                </div>
                <div className="or-seperator"><i>or</i></div>
                <p className="text-center">Login with your social media account</p>
                <div className="text-center social-btn">
                    <NavLink to="/" className="btn btn-secondary"><i className="fa fa-facebook"></i>&nbsp; Facebook</NavLink>
                    <NavLink to="/" className="btn btn-info"><i className="fa fa-twitter"></i>&nbsp; Twitter</NavLink>
                    <NavLink to="/" className="btn btn-danger"><i className="fa fa-google"></i>&nbsp; Google</NavLink>
                </div>

                <p className="text-center text-muted small">Don't have an account? <NavLink to="/signup">Sign up here!</NavLink></p>

            </div>
        </div>
    )
}

export default Login





















        // <>
        //     <section className="signup">
        //         <div className="container mt-5">
        //             <div className="signup-content">
        //                 <div className="signup-form">
        //                     <h2 className="form-title"> signin </h2>
        //                     <form method="POST" className="Register-form" id="regster-form">

        //                         <div className="form-group">
        //                             <label htmlFor="email">
        //                                 <i className="zmdi zmdi-email material-icons-name"></i>
        //                             </label>
        //                             <input type="email" name="email" id="email" autoComplete="off"
        //                                 value={email}
        //                                 onChange={(e) => setEmail(e.target.value)}
        //                                 placeholder="Your Email"
        //                             />
        //                         </div>

        //                         <div className="form-group">
        //                             <label htmlFor="password">
        //                                 <i className="zmdi zmdi-lock material-icons-name"></i>
        //                             </label>
        //                             <input type="password" name="password" id="password" autoComplete="off"
        //                                 value={password}
        //                                 onChange={(e) => setPassword(e.target.value)}
        //                                 placeholder="Your Password"
        //                             />
        //                         </div>
        //                         <div className="form-group form-buttom">
        //                             <input type="submit" name="signin" id="signin" className="form-submit"
        //                                 value="Log in" onClick={loginUser}
        //                             />
        //                         </div>
        //                     </form>
        //                 </div>
        //             </div>
        //         </div>
        //     </section>
        // </>
