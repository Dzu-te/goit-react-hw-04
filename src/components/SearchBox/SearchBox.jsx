export const SearchBox = ({ handleSearchChange, searchItem }) => {
  return (
    <>
      <h4></h4>
      <label>Find contacts by name</label>
      <input
        type="text"
        placeholder="Enter name"
        value={searchItem}
        onChange={handleSearchChange}
      />
    </>
  );
};
