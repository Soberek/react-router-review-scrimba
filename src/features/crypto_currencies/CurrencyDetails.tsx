import { useParams, Link } from "react-router-dom";
import { getData } from "../../utils/api";
import { useEffect, useState } from "react";

const CurrencyDetails = () => {
  const { id } = useParams();

  const [currency_data, setCurrencyData] = useState();

  useEffect(() => {
    const getCurrencyData = async () => {
      try {
        const data = await getData(id);
        setCurrencyData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getCurrencyData();
    if (currency_data) {
      console.log(Object.values(currency_data.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Link to=".." relative="path">
        Go back
      </Link>
      <table>
        <thead>
          <tr>
            {currency_data &&
              Object.keys(currency_data.data).map((key) => (
                <td key={key}>{key}</td>
              ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {currency_data &&
              Object.values(currency_data.data).map((value) => (
                <td>{value}</td>
              ))}
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default CurrencyDetails;
