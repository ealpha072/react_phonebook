import React from 'react'

const Loginform = ({formValues, handleInputChange}) => {
  return (
    <div>
        <form action="">
            <div className="input-fields">
                <input 
                    type="text" 
                    placeholder='Username'
                    name='username'
                    values={formValues.username}
                />

                <input 
                    type="password"
                    placeholder='Password'
                    name='password'
                    values={formValues.password}
                />
                <button type='submit' className='btn add-btn'>Login</button>
            </div>
        </form>
    </div>
  )
}

export default Loginform