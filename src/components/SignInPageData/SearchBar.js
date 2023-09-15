import React from 'react';
function SearchBar({ onChange}){
return (
<input type="text" placeholder="search..." onkeyup={(e)=>onChange(e.target.value)}/>
);
}
export default SearchBar;