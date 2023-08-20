import React, { useState } from 'react'
import styled from 'styled-components';

function Search({ handleSearch }) {
  const [title, setTitle] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title);
    handleSearch(title)
  };
  const handleChange = (e) => {
    setTitle(e.target.value)
  }
  return (
    <SearchContainer>
      <FormContainer onSubmit={(e) => handleSubmit(e)}>
        <div>
          {/* <label>Search</label> */}
          <input value={title} onChange={handleChange} type='text' id='video-search' placeholder='Search' />
        </div>
      </FormContainer>
    </SearchContainer>
  )
}

export default Search

const SearchContainer = styled.div`
  margin: 50px 0 30px 0 ;
  text-align:center;
`;
const FormContainer = styled.form`
  > div > input {
    border-radius: 10px;
    width: 50%;
  
    border: solid 1px #b23aee;
    padding: 10px;
  }
`;
