import React, { useState, Dispatch, SetStateAction } from "react";

interface Props {
  setDbColors?: Dispatch<SetStateAction<Array<string>>>;
}

const AddColorForm: React.FunctionComponent<Props> = ({
  setDbColors = () => {},
}) => {
  const [hexColor, setHexColor] = useState("");
  const [error, setError] = useState(false);
  const [errorDuplicate, setErrorDuplicate] = useState(false);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(false);

    let reg = /^#([0-9a-f]{3}){1,2}$/i;
    reg = new RegExp(reg);
    let test = reg.test(hexColor);

    if (test) {
      let localStorageItems = JSON.parse(localStorage.getItem("Colors")!);
      if (localStorageItems) {
        if (!localStorageItems.includes(hexColor)) {
          localStorage.setItem(
            "Colors",
            JSON.stringify([...localStorageItems, hexColor])
          );
          setDbColors([...localStorageItems, hexColor]);
        } else {
          setErrorDuplicate(true);
        }
      } else {
        localStorage.setItem("Colors", JSON.stringify([hexColor]));
        setDbColors([hexColor]);
      }
    } else {
      setError(true);
    }
  };

  return (
    <div className="container">
      <form onSubmit={submitForm}>
        <input
          value={hexColor}
          onChange={(e) => setHexColor(e.target.value.toUpperCase())}
          type="text"
          placeholder="Dodaj kolor (HEX)"
          className="input"
        />
        <button type="submit" className="btn">
          Dodaj kolor
        </button>
      </form>
      {error && <p className="text-red">Błędna Wartość</p>}
      {errorDuplicate && (
        <p className="text-red">Ta wartość już jest zapisana</p>
      )}
    </div>
  );
};

export default AddColorForm;
