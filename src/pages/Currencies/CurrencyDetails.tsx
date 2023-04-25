import { Link, useLocation, useLoaderData } from "react-router-dom";
import { useState } from "react";

const CurrencyDetails = () => {
  const loader_data = useLoaderData() as { data: [] };

  const [currency_data] = useState(loader_data);

  const from_link_state = useLocation().state;

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
