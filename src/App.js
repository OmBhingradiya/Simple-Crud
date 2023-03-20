import React, { useState } from "react";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState([]);
  const [update, setUpdate] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    //2 type of method to add functionality
    //1
    //not recommended
    // add ke time pahle bar state empty aayega then add karenge to first ki value aayegi because of asyncronus
    // setValue([...value, inputValue]);

    //2
    e.preventDefault();
    if (update !== "") {
      const updatedItem = value.map((data) => {
        if (update === data.id) {
          return { ...data, text: inputValue.trim() };
        } else {
          return data;
        }
      });

      setUpdate("");
      setInputValue("");
      setValue(updatedItem);
      return;
    }
    if (value !== "") {
      setValue([
        ...value,
        {
          id: value.length + 1,
          text: inputValue.trim(),
        },
      ]);
      setInputValue("");
    }
  };

  const handleDelete = (mapId) => {
    const updatedData = value.filter((data) => {
      return data.id !== mapId;
    });
    setValue(updatedData);
  };

  const handleDeleteAll = () => {
    setValue([]);
  };

  const handleUpdate = (data) => {
    const edit = value.find((e) => e.id === data.id);
    setInputValue(edit.text);
    setUpdate(edit.id);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <>
      <input onChange={handleSearch} />
      <br />
      <input onChange={handleChange} value={inputValue} />
      <button onClick={handleSubmit}>{update ? "Edit" : "Add"}</button>

      {value !== [] &&
        value

          .filter((item) => {
            if (searchValue) {
              return searchValue && item.text.startsWith(searchValue);
            } else {
              return item;
            }
          })
          .map((ee, i) => {
            return (
              <div key={i}>
                <p>{ee.text}</p>
                <button onClick={() => handleDelete(ee.id)}> Delete </button>
                <button onClick={() => handleUpdate(ee)}> Update </button>
              </div>
            );
          })}

      {value.length >= 1 && (
        <button onClick={handleDeleteAll}>Delete All</button>
      )}
    </>
  );
};

export default App;
