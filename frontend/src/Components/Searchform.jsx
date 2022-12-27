import React from 'react'
import Contact from './Contact';

const Searchform = ({searchTerm, handleSearchTermChange, searchResults}) => {
  return (
    <div>
        <div className="search">
            <h5>
                <i className='fa fa-search icon-mrg'></i>
                Search by Name <br></br>
            </h5>
            <input
                type="text"
                placeholder="Type name to search"
                value={searchTerm}
                onChange={handleSearchTermChange}
            />
            <div className="search-results">
                <h6>
                    {searchResults.length === 0
                    ? "Nothing found"
                    : searchResults.map((result) => (
                        <Contact key={result.id} contact={result} />
                        ))}
                </h6>
            </div>
        </div>
    </div>
  );
}

export default Searchform