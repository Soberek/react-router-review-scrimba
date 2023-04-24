import { useState } from "react";
import { useSearchParams, useLoaderData } from "react-router-dom";
import { getData } from "../../utils/api";
import CurrencyItem from "./CurrencyItem";
import type { CurrencyItemI } from "./CurrencyItem";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  const data = await getData();
  return data.data;
};

const Currencies = () => {
  const loader_data = useLoaderData();

  const [currency_data, setCurrencyData] = useState<CurrencyItemI[] | []>(
    loader_data as CurrencyItemI[]
  );

  const [search_params, setSearchParams] = useSearchParams();

  const sort_by_parameter = search_params.get("sortBy");

  console.log(loader_data);

  if (currency_data.length === 0) {
    return <div>Loading...</div>;
  }

  let display_currencies: CurrencyItemI[] = currency_data;

  if (sort_by_parameter) {
    if (sort_by_parameter === "ASC") {
      display_currencies = currency_data.sort((a, b) => +a.supply - +b.supply);
    } else if (sort_by_parameter === "DESC") {
      display_currencies = currency_data.sort((a, b) => +b.supply - +a.supply);
    }
  } else {
    display_currencies = currency_data.sort((a, b) => +a.rank - +b.rank);
  }

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
        <tbody>
          {currency_data &&
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
          <tr>
            <td>1</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Currencies;
