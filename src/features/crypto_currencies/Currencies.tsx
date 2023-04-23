import { useEffect, useState } from "react";
import { getData } from "../../utils/api";
import CurrencyItem from "./CurrencyItem";
import type { CurrencyItemI } from "./CurrencyItem";

const Currencies = () => {
  const [currency_data, setCurrencyData] = useState<CurrencyItemI[] | []>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData();

        setCurrencyData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log(currency_data);

  if (currency_data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
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
          currency_data.map((currency) => (
            <CurrencyItem
              key={currency.id}
              id={currency.id}
              rank={currency.rank}
              symbol={currency.symbol}
              name={currency.name}
              supply={currency.supply}
            />
          ))}
        <tr>
          <td>1</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Currencies;
