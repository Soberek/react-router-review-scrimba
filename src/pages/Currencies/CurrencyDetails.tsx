import { Link, useLocation, useLoaderData, Await } from "react-router-dom";
import React from "react";

const CurrencyDetails = () => {
  const loader_data = useLoaderData() as { data: [] };

  const from_link_state = useLocation().state;

  function renderCurrencyDetails(response) {
    return (
      <table>
        <thead>
          <tr>
            {response &&
              Object.keys(response.data).map((key) => <td key={key}>{key}</td>)}
          </tr>
        </thead>

        <tbody>
          <tr>
            {response &&
              Object.values(response.data).map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <>
      <Link
        to={`..${from_link_state ? "?" + from_link_state : ""}`}
        relative="path"
      >
        Go back
      </Link>
      <React.Suspense fallback={<h3>Currency details is loading...</h3>}>
        <Await resolve={loader_data.dataPromise}>{renderCurrencyDetails}</Await>
      </React.Suspense>
    </>
  );
};

export default CurrencyDetails;
