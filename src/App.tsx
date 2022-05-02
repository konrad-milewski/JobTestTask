import hexToHSL from "./utils/hexToHSL";
import hexToRgb from "./utils/hexToRgb";
import rgbToHsl from "./utils/rgbToHSL";
import { useEffect, useState } from "react";
import ColorBox from "./components/color_box";
import AddColorForm from "./components/add_color";
import FilterColors from "./components/filter_colors";
import updateLocalStorage from "./utils/updateLocalStorage";

const App = () => {
  const [dbColors, setDbColors] = useState<Array<string>>([]);
  const [preDefinedColors] = useState<Array<string>>([
    "#AAAAAA",
    "#CCCCCC",
    "#3d3a31",
  ]);

  const sortColors = (dbColors) => {
    let arrayOfRgb: number[][] = [];

    dbColors.forEach((x) => {
      arrayOfRgb.push(hexToRgb(x));
    });

    var sortedRgbArr = arrayOfRgb
      .map( (c, i) =>{
        // Convert to HSL and keep track of original indices
        return { color: rgbToHsl(c), index: i };
      })
      .sort( (c1, c2) => {
        // Sort by hue
        return c1.color[0] - c2.color[0];
      })
      .map( (data) => {
        // Retrieve original RGB color
        return dbColors[data.index];
      });
  
    return sortedRgbArr;
  };

  useEffect(() => {
    let colorsPreAdded: string[] = [];
    let dataFromStorage = JSON.parse(localStorage.getItem("Colors")!) || [];
    console.log(hexToHSL("#00fff0"));
    preDefinedColors.forEach((x) => {
      if (!dataFromStorage.includes(x)) {
        colorsPreAdded.push(x);
      }
    });
    let newDbColors = [...colorsPreAdded, ...(dataFromStorage || [])];
    setDbColors(newDbColors);
    sortColors(newDbColors);
    updateLocalStorage(newDbColors);
  }, []);

  return (
    <div className="App">
      <h2>Dodaj Kolor</h2>
      <AddColorForm setDbColors={setDbColors} />
      <h2>Filtry</h2>
      <FilterColors dbColors={dbColors} setDbColors={setDbColors} />

      <h2>Kolory</h2>

      {sortColors(dbColors).map((x, idx) => {
        return (
          <div className="border mb-2 p-relative rounded p-20px">
            <div>
              <ColorBox color={x} />

              {!preDefinedColors.includes(x) && (
                <p
                  className="close pointer"
                  onClick={() => {
                    let newArray = dbColors.filter((c) => c !== x);
                    setDbColors(newArray);
                    updateLocalStorage(newArray);
                  }}
                >
                  X
                </p>
              )}
            </div>
            <h4 key={idx} className="m-0">
              {x}
            </h4>
            <p>RGB ({hexToRgb(x).join(",")})</p>
            <p>
              HSL({hexToHSL(x).h},{hexToHSL(x).s},{hexToHSL(x).l})
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
