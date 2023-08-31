import React, { SyntheticEvent, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = () => {
	
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ redirect, setRedirect ] = useState(false);

	const submit = async (e: any) => {
		e.preventDefault();

		const {data} = await axios.post('login', {
			email,
			password
		},{withCredentials: true});

		if(data)
			axios.defaults.headers.common['Authorization'] = `Bearer ${data?.token}`;

		setRedirect(true);
	};
	

	if(redirect){
		return <Navigate to={'/'}/>
	}

    return (
      <main className="form-signin w-100 m-auto">
        <form onSubmit={(e) => submit(e)}>
          	<h1 
				className="h3 mb-3 fw-normal"
			>
				Login
			</h1>
  
			<div className="form-floating">
				<input 
					type="email" 
					className="form-control" 
					id="floatingInput3" 
					placeholder="nome@examplo.com" 
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor="floatingInput3">
					Email
				</label>
			</div>

			<div className="form-floating">
				<input 
					type="password" 
					className="form-control" 
					id="floatingPassword1" 
					placeholder="Senha" 
					autoComplete="confirm-senha1"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<label htmlFor="floatingPassword1">
					Senha
				</label>
			</div>

			<div className='mb-3'>
				<Link to="/forgot" >Esqueci minha senha</Link>
			</div>
          
			<button 
				className="btn btn-primary w-100 py-2" 
				type={'submit'}
			>
				Entrar
			</button>
        </form>
      </main>
    )
}

export default Register;