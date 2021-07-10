import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
// import signpic from '../images/signpic.PNG'

const Signup = () => {

    const history = useHistory();

    const [user, setUser] = useState({
        name: "", email: "", phone: "", work: "", password: "", cpassword: ""
    });

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value })
    }

    const PostData = async (e) => {
        e.preventDefault();

        const { name, email, phone, work, password, cpassword } = user;

        console.log("user", user);

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
            })
        });

        console.log("in the PostData res", res);

        const data = await res.json();

        console.log("outside if data", data);

        if (res.status === 422 || !data) {
            window.alert("Invalid Registration");
            console.log("Invalid Registration ");
        } else {
            console.log("inside else data", data)
            window.alert("Registration Successfull");
            console.log("Registration Successfull");
            history.push('/login');
        }
    }
    return (
        <>
            <div className="signup-form">
            
                <h2>Sign Up</h2>
                <p>Please fill in this form to create an account!</p>
                <hr />
                <form method="POST">
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <span className="fa fa-user"></span>
                                </span>
                            </div>
                            <input type="text" className="form-control" name="name" autoComplete="off"
                                value={user.name}
                                onChange={handleInputs}
                                placeholder="Username" required="required" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-paper-plane"></i>
                                </span>
                            </div>
                            <input type="email" className="form-control" name="email" autoComplete="off"
                                value={user.email}
                                onChange={handleInputs}
                                placeholder="Email Address" required="required" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-phone"></i>
                                </span>
                            </div>
                            <input type="number" className="form-control" name="phone" autoComplete="off"
                                value={user.phone}
                                onChange={handleInputs}
                                placeholder="Phone Number" required="required" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-briefcase"></i>
                                </span>
                            </div>
                            <input type="text" className="form-control" name="work" autoComplete="off"
                                value={user.work}
                                onChange={handleInputs}
                                placeholder="Your Profession" required="required" />
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
                                value={user.password}
                                onChange={handleInputs}
                                placeholder="Password" required="required" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-lock"></i>
                                    <i className="fa fa-check"></i>
                                </span>
                            </div>
                            <input type="text" className="form-control" name="cpassword" autoComplete="off"
                                value={user.cpassword}
                                onChange={handleInputs}
                                placeholder="Confirm Password" required="required" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-check-label"><input type="checkbox" required="required" /> I accept the <NavLink to="/login">Terms of Use</NavLink> &amp; <NavLink to="/login">Privacy Policy</NavLink></label>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-lg" onClick={PostData}>Sign Up</button>
                    </div>
                </form>
                <div className="text-center">Already have an account? <NavLink to="/login">Login here</NavLink></div>
                {/* <div className="signup-image">
                    <figure>
                        <img src={signpic} alt="registration pic" />
                    </figure>
                </div> */}
            </div>
        </>

    )
}

export default Signup














// <>
// <section className="signup">
//     <div className="container mt-5">
//         <div className="signup-content">
//             <div className="signup-form">
//                 <h2 className="form-title">Sign up</h2>
//                 <form method="POST" className="register-form" id="register-form">
                    
//                     <div className="form-group">
//                         <label htmlFor="name">
//                             <i className="zmdi zmdi-account material-icons-name"></i>
//                         </label>
//                         <input type="text" name="name" id="name" autocomplete="off"
//                             value={user.name}
//                             onChange={handleInputs}
//                             placeholder="Your Name"
//                         />
//                     </div>

//                      <div className="form-group">
//                         <label htmlFor="email">
//                             <i className="zmdi zmdi-email material-icons-name"></i>
//                         </label>
//                         <input type="email" name="email" id="email" autoComplete="off"
//                             value={user.email}
//                             onChange={handleInputs}
//                             placeholder="Your Email"
//                         />
//                     </div>

//                      <div className="form-group">
//                         <label htmlFor="phone">
//                             <i className="zmdi zmdi-phone-in-talk material-icons-name"></i>
//                         </label>
//                         <input type="number" name="phone" id="phone" autoComplete="off"
//                             value={user.phone}
//                             onChange={handleInputs}
//                             placeholder="Your Phone"
//                         />
//                     </div>

//                      <div className="form-group">
//                         <label htmlFor="work">
//                             <i className="zmdi zmdi-slideshow material-icons-name"></i>
//                         </label>
//                         <input type="text" name="work" id="work" autoComplete="off"
//                             value={user.work}
//                             onChange={handleInputs}
//                             placeholder="Your Profession"
//                         />
//                     </div>

//                      <div className="form-group">
//                         <label htmlFor="password">
//                             <i className="zmdi zmdi-lock material-icons-name"></i>
//                         </label>
//                         <input type="password" name="password" id="password" autoComplete="off"
//                             value={user.password}
//                             onChange={handleInputs}
//                             placeholder="Your Password"
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="cpassword">
//                             <i className="zmdi zmdi-lock material-icons-name"></i>
//                         </label>
//                         <input type="password" name="cpassword" id="cpassword" autoComplete="off"
//                             value={user.cpassword}
//                             onChange={handleInputs}
//                             placeholder="Confirm Your Password"
//                         />
//                     </div>
                   
//                     <div className="form-group form-button">
//                         <input type="submit" name="signup" id="signup" className="form-submit"
//                             value="register" onClick={PostData}
                         
//                         />
//                     </div>

//                 </form>
//             </div>
            
//                 <div className="signup-image">
//                     <figure>
//                         <img src={signpic} alt="registration pic" />
//                     </figure>
//                     <NavLink to="/login" className="signup-image-link">I am already register</NavLink>
//                 </div>
           
//         </div>
//     </div>
// </section>
// </>










