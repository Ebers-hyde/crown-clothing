import React from 'react';
import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

class Signin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({[name]: value})
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password)
        } catch(error) {
            console.log(error);
        }

        this.setState({email: '', password: ''})
    }

    render() {
        return (
            <div className='signin'>
                <h2>I already have an account</h2>
                <span className='title'>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput type="email" label='email' value={this.state.email} name="email" required handleChange={this.handleChange}/>
                    <FormInput type="password" name="password" value={this.state.password} required label='password' handleChange={this.handleChange}/>
                    <div className="buttons">
                        <CustomButton type='submit'>Sign in</CustomButton>
                        <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn >{' '}Sign in with Google {' '}</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default Signin;