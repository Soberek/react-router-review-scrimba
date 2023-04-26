import { useSearchParams, useLoaderData, Await } from "react-router-dom";
import CurrencyItem from "./CurrencyItem";
import type { CurrencyItemI } from "./CurrencyItem";
import React from "react";

// eslint-disable-next-line react-refresh/only-export-components

const Currencies = (): JSX.Element => {
  const loader_data = useLoaderData();

  const [search_params, setSearchParams] = useSearchParams();

  const sort_by_parameter = search_params.get("sortBy");

  const setParam = (key: string, value: string) => {
    if (search_params.get(key) === value) {
      return;
    }

    search_params.set(key, value);

    setSearchParams(search_params);
  };

  const deleteParam = (key: string) => {
    search_params.delete(key);

    setSearchParams(search_params);
  };

  function renderCurrencies(data) {
    if (data === 0) {
      return <div>Loading...</div>;
    }

    console.log(data);

    let display_currencies: CurrencyItemI[] = [];

    if (sort_by_parameter) {
      if (sort_by_parameter === "ASC") {
        display_currencies = data.data.sort((a, b) => +a.supply - +b.supply);
      } else if (sort_by_parameter === "DESC") {
        display_currencies = data.data.sort((a, b) => +b.supply - +a.supply);
      }
    } else {
      display_currencies = data.data.sort((a, b) => +a.rank - +b.rank);
    }

    return (
      <tbody>
        {display_currencies &&
          display_currencies.map((currency) => (
            <CurrencyItem
              key={currency.id}
              id={currency.id}
              rank={currency.rank}
              symbol={currency.symbol}
              name={currency.name}
              supply={currency.supply}
              param={search_params.toString()}
            />
          ))}
      </tbody>
    );
  }

  return (
    <>
      <div>
        <h3>Supply filter</h3>
        <button
          onClick={() => setParam("sortBy", "ASC")}
          className={sort_by_parameter === "ASC" ? "active_param" : ""}
        >
          ASC
        </button>
        <button
          onClick={() => setParam("sortBy", "DESC")}
          className={sort_by_parameter === "DESC" ? "active_param" : ""}
        >
          DESC
        </button>
        {sort_by_parameter && (
          <button onClick={() => deleteParam("sortBy")}>Clear</button>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <td>Rank</td>
            <td>Id</td>
            <td>Symbol</td>
            <td>Name</td>
            <td>Supply</td>
            <td></td>
          </tr>
        </thead>

        <React.Suspense fallback={<>Loading</>}>
          <Await resolve={loader_data.data}>{renderCurrencies}</Await>
        </React.Suspense>
      </table>
    </>
  );
};

export default Currencies;
