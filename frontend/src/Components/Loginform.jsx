import React from 'react'

const Loginform = ({handleLoginForm, loginDetails, loginInputChange}) => {
  return (
    <div>
        <form action="" onSubmit={handleLoginForm}>
            <div className="input-fields">
                <input
                type="text"
                placeholder="Username"
                name="username"
                values={loginDetails.username}
                onChange={loginInputChange}
                />

                <input
                type="password"
                placeholder="Password"
                name="password"
                values={loginDetails.password}
                onChange={loginInputChange}
                />
                <button type="submit" className="btn add-btn">
                Login
                </button>
            </div>
        </form>
    </div>
  )
}

export default Loginform