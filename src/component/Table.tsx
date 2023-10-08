import { useEffect, useState } from "react";
import { rows } from "../../data/data";

export const Table = () => {
  const [namesArray, setNamesArray] = useState<
    [{ name: string; count: number }]
  >([{ name: "", count: 0 }]);

  const getAllNames = () => {
    const names = rows.map((row) => row.firstName);
    const nameMap: any = {};
    names.forEach((name) => {
      if (nameMap[name]) {
        nameMap[name] += 1;
      } else {
        nameMap[name] = 1;
      }
    });
    const nameArray: any = [];
    Object.keys(nameMap).forEach((key) => {
      nameArray.push({ name: key, count: nameMap[key] });
    });
    setNamesArray(nameArray);
  };

  useEffect(() => {
    getAllNames();
  }, []);

  return (
    <div>
      {namesArray.length > 0 ? (
        <table>
          <thead className="table-headers">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {namesArray.map((row, i) => {
              let isLessThanThree = row.count > 0 && row.count <= 3;
              let isLessThanTen = row.count > 3 && row.count < 10;
              let isGreaterThanTen = row.count > 10;
              let colorClass = "";
              if (isLessThanThree) {
                colorClass = "more_than_zero";
              } else if (isLessThanTen) {
                colorClass = "more_than_two";
              } else if (isGreaterThanTen) {
                colorClass = "more_than_ten";
              }
              return (
                <tr key={i} className={colorClass}>
                  <td>{i}</td>
                  <td>{row.name}</td>
                  <td>{row.count}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};
