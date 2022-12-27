import React from 'react'

const Loginform = ({handleLoginForm, loginDetails, loginInputChange}) => {
  return (
    <div>
        <form action="" onSubmit={handleLoginForm} >
            <div className="login-fields">
                <div className="form-row">
                    <label htmlFor="username"><i className='fa fa-user'></i></label>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        values={loginDetails.username}
                        onChange={loginInputChange}
                        className="login-input"
                        required
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="password"><i className='fa fa-unlock'></i></label>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        values={loginDetails.password}
                        onChange={loginInputChange}
                        className="login-input"
                        required
                    />
                </div>
                <button type="submit" className="btn login-btn">
                    <i className='fa fa-sign-in icon-mrg'></i>
                    Login
                </button>
            </div>
        </form>
    </div>
  )
}

export default Loginform