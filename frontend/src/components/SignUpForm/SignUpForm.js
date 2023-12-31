import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { signUp } from "../../store/session";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { closeModal } from "../../store/ui";
import { removeErrors } from "../../store/errors";

const SignUpForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const todaysDate = new Date();
    const todaysMonth = todaysDate.toLocaleString('en-US', { month: 'short' });
    const todaysDay = todaysDate.getDate();
    const todaysYear = todaysDate.getFullYear();
    const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
    const years = Array.from( { length: 100 }, (x, i) => todaysYear - i );
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [month, setMonth] = useState(todaysMonth);
    const [day, setDay] = useState(todaysDay);
    const [year, setYear] = useState(todaysYear);
    const [gender, setGender] = useState("");
    const [fieldStatus, setFieldStatus] = useState(false);
    const errors = useSelector(state => state.errors);

    let days; 
    if ( ['Jan', 'Mar', 'May', 'Jul', 'Aug', 'Oct', 'Dec'].includes(month) ) {
        days = Array.from( { length: 31 }, (x, i) => i + 1 );
    } else if ( ['Apr', 'Jun', 'Sep', 'Nov'].includes(month) ) {
        days =  Array.from( { length: 30 }, (x, i) => i + 1 );
    } else {
        days =  Array.from( { length: 29 }, (x, i) => i + 1 );
    }

    useEffect(() => {
    }, [errors])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(removeErrors());
        dispatch(signUp({
            email: email.toLowerCase(), 
            password: password,
            firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase().trim(),
            lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase().trim(),
            birthday: new Date(`${year}-${month}-${day}`),
            gender: gender
        })).then((resp) => {
            if (resp.ok) {
                dispatch(closeModal()); 
                dispatch(removeErrors());
                history.push("/");
            }
        })
    };

    return (
        <>
            <div className="signup-form-container">
                <div className="signup-form-header">
                    <h1 className="signup-header">Sign Up</h1>
                    <p className="signup-form-close-button">
                        <button onClick={() => 
                                    {dispatch(
                                        closeModal()); 
                                        dispatch(removeErrors());
                                    }}>
                            <i className="fa-solid fa-circle-xmark"></i></button>
                    </p>
                </div>
                <div className="signup-form-sub-header">
                    <h2 className="signup-desc">It's quick and easy.</h2>
                </div>
                    <form className="signup-form">
                        <div className="signup-name-error">
                            {errors.first_name ? 
                            <p className="fname-error">
                                First name {errors.first_name[0]} &nbsp;
                                <i className="fa-solid fa-circle-exclamation"></i>
                                </p> 
                            : <p></p> }
                            {errors.last_name && 
                            <p className="lname-error"> 
                                Last name {errors.last_name[0]} &nbsp;
                                <i className="fa-solid fa-circle-exclamation"></i>
                                </p> }
                        </div>
                        <label className="signup-input-name">
                            <input 
                                className={errors.first_name ? "fname-signup-error-input" : "signup-input-f-name"} 
                                type="text" 
                                name={firstName} 
                                placeholder="First Name" 
                                onChange={(e) => setFirstName(e.target.value)}/>
                            <input 
                                className={errors.last_name ? "signup-error-input" : "signup-input-l-name"}
                                type="text" 
                                name={lastName} 
                                placeholder="Last Name" 
                                onChange={(e) => setLastName(e.target.value)}/>
                        </label>
                            {errors.email && 
                            <p className="email-error">
                                Email {errors.email[0]} &nbsp;
                                <i className="fa-solid fa-circle-exclamation"></i>
                                </p>}
                            <input 
                                className={errors.email ? "email-signup-error-input" : "signup-input-email"} 
                                type="text" 
                                name={email} 
                                placeholder="Email" 
                                onChange={(e) => setEmail(e.target.value)}/>
                            {errors.password && 
                            <p className="password-error">
                                Password {errors.password[0]} &nbsp;
                                <i className="fa-solid fa-circle-exclamation"></i>
                                </p>}
                            <input 
                                className={errors.password ? "password-signup-error-input" : "signup-input-password"} 
                                type="password" 
                                name={password} 
                                placeholder="New Password" 
                                onChange={(e) => setPassword(e.target.value)}/>
                        <label className="signup-label-bday"> Birthday </label>
                        {errors.birthday &&
                        <p className="birthday-error"> 
                            {errors.birthday[0]} &nbsp;
                            <i className="fa-solid fa-circle-exclamation"></i>
                            </p>}
                        <div className="signup-input-bday">
                                <select 
                                    name="month" 
                                    defaultValue={todaysMonth}
                                    onChange={(e) => setMonth(e.target.value)}>
                                    {Object.values(months).map((month) => <option key={month}>{month}</option>)}
                                </select>
                                <select 
                                    name="day" 
                                    defaultValue={todaysDay} 
                                    onChange={(e) => setDay(e.target.value)}>
                                    {days.map((day) => <option key={day}>{day}</option>)}
                                </select>
                                <select 
                                    name="year" 
                                    onChange={(e) => {setYear(e.target.value)}}>
                                    {years.map((year) => <option key={year}>{year}</option>)}
                                </select>
                        </div>
                        <label className="signup-label-gender">Gender 
                            {errors.gender && <p className="gender-error">
                                Please choose a gender or pronoun &nbsp;
                                <i className="fa-solid fa-circle-exclamation"></i>
                                </p>}
                        </label>
                        <div className="signup-input-gender">
                                <label>Female
                                    <input 
                                        type="radio" 
                                        name="gender" 
                                        value="Female" 
                                        onClick={(e) => {
                                            setGender(e.target.value);
                                            setFieldStatus(false);
                                        }}/>
                                </label>
                                <label>Male
                                    <input 
                                        type="radio" 
                                        name="gender" 
                                        value="Male"
                                        onClick={(e) => {
                                            setGender(e.target.value);
                                            setFieldStatus(false);
                                        }}/>
                                </label>
                                <label>Custom
                                    <input 
                                        type="radio" 
                                        name="gender" 
                                        value="Custom" 
                                        onClick={() => {
                                            setGender("");
                                            setFieldStatus(true)
                                            }}/>
                                    </label>
                        </div>
                            {fieldStatus ? 
                            <>
                                <select 
                                    className="signup-form-custom-gender"
                                    name="gender"
                                    defaultValue="Select your pronoun"
                                    onChange={(e) => setGender(e.target.value)}>
                                        <option key="disabled" disabled={true}>Select your pronoun</option>
                                        <option 
                                            key="she"
                                            value="She">
                                                She: "Wish her a happy birthday!
                                            </option>
                                        <option 
                                            key="he" 
                                            value="He">
                                                He: "Wish him a happy birthday!
                                            </option>
                                        <option 
                                            key="they"
                                            value="They">
                                                They: "Wish them a happy birthday!
                                            </option>
                                </select> <br></br>
                                <label 
                                    className="custom-gender-label">
                                        Your pronoun is visible to everyone.</label>
                                <input 
                                    className="signup-gender-text-box" 
                                    type="text" 
                                    placeholder="Gender (optional)">
                                    </input>
                            </> : null}
    
                    </form>
                    <button 
                        className="signup-button" 
                        onClick={handleSubmit} >
                            Sign Up
                        </button>
            </div>
        </>
    )
}

export default SignUpForm;