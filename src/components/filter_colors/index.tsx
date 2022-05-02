import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import hexToHSL from "../../utils/hexToHSL";
import hexToRgb from "../../utils/hexToRgb";

interface Props {
  setDbColors?: Dispatch<SetStateAction<Array<string>>>;
  dbColors: Array<string>;
}

const FilterColors: React.FunctionComponent<Props> = ({
  setDbColors = () => {},
  dbColors = [],
}) => {
  const [filters, setFilters] = useState<Array<string>>([]);

  const addFilter = (value: string) => {
    let array: string[] = filters;

    if (!filters.includes(value)) {
      array.push(value);
      console.log();
    } else {
      array = array.filter((x) => x !== `${value}`);
    }

    setFilters(array);
    updateList(array);
  };

  const updateList = (array: string[]) => {
    let colorsToShow = JSON.parse(localStorage.getItem("Colors")!);

    array.forEach((x) => {
      if (x === "red") {
        colorsToShow = colorsToShow.filter((c) => hexToRgb(c)[0] > 127);
      } else if (x === "green") {
        colorsToShow = colorsToShow.filter((c) => hexToRgb(c)[1] > 127);
      } else if (x === "blue") {
        colorsToShow = colorsToShow.filter((c) => hexToRgb(c)[2] > 127);
      } else if (x === "saturation") {
        colorsToShow = colorsToShow.filter((c) => {
          if (hexToHSL(c) !== null) {
            console.log(hexToHSL("#BBBBBB"));
            return hexToHSL(c).s > 50;
          }
        });
      }
    });

    setDbColors(colorsToShow);
  };

  return (
    <div className="filters">
      <div className="border rounded d-inline-block p-10px mx-10px">
        <input
          type={"checkbox"}
          value="red"
          onChange={(e) => addFilter(e.target.value)}
        />
        {`RED > 50%`}
      </div>
      <div className="border rounded d-inline-block p-10px mx-10px">
        <input
          type={"checkbox"}
          value="green"
          onChange={(e) => addFilter(e.target.value)}
        />
        {`GREEN > 50%`}
      </div>
      <div className="border rounded d-inline-block p-10px mx-10px">
        <input
          type={"checkbox"}
          value="blue"
          onChange={(e) => addFilter(e.target.value)}
        />
        {`BLUE > 50%`}
      </div>
      <div className="border rounded d-inline-block p-10px mx-10px">
        <input
          type={"checkbox"}
          value="saturation"
          onChange={(e) => addFilter(e.target.value)}
        />
        {`SATURATION > 50%`}
      </div>
    </div>
  );
};

export default FilterColors;
