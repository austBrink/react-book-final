import react, {useState} from 'react';

const Login = (props) => {
    const {onLogin} = props;
    const initValues = {
        email: '',
        password: '',
    };
    const [ formValues, setFormValues ] = useState(initValues);  
    
    const handleLogin = (e) => {
        e.preventDefault();
        console.log(formValues);
        onLogin(formValues.email, formValues.password);
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log([name],value);
        setFormValues({...formValues, [name]: value})
    }

    return(

        <form className="container" name="login" onSubmit={handleLogin}>
            <input 
                type = 'email'
                name = {'email'}
                value = {formValues.email}
                onChange = {handleChange}
            >
            </input>
            <input 
                type = 'password'
                name = {'password'}
                value = {formValues.password}
                onChange = {handleChange}
            >
            </input>
            <p>
                <button 
                    type = 'submit'
                    onClick = {handleLogin}
                    //disabled = {!formValues.email && !formValues.password}
                >
                    LOGIN
                </button>
            </p>
        </form>
        
    );
}

export default Login;