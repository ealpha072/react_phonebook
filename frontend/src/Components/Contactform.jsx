import React from 'react'

const Contactform = ({addContact, values, handleInputChange}) => {
  return (
    <div>
        <form action="" onSubmit={addContact}>
            <h4><i className='fa fa-plus-circle icon-mrg'></i> Add new Contact</h4>
            <div className="input-fields">
              <input
                type="text"
                placeholder="Input name"
                value={values.name}
                name="name"
                onChange={handleInputChange}
              />
              <br />
              <input
                type="number"
                placeholder="Phone number"
                value={values.number}
                name="number"
                onChange={handleInputChange}
              />
              <button type="submit" className="add-btn btn">
                <i className='fa fa-plus-circle'></i>
                Add
              </button>
            </div>
        </form>
    </div>
  )
}

export default Contactform