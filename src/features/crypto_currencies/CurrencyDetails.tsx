import { useParams, Link, useLocation } from "react-router-dom";
import { getData } from "../../utils/api";
import { useEffect, useState } from "react";

const CurrencyDetails = () => {
  const { id } = useParams();

  const [currency_data, setCurrencyData] = useState();

  const from_link_state = useLocation().state;

  console.log(from_link_state);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Link
        to={`..${from_link_state ? "?" + from_link_state : ""}`}
        relative="path"
      >
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
              Object.values(currency_data.data).map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default CurrencyDetails;
