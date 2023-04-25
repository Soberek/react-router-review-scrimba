import { Link } from "react-router-dom";
export interface CurrencyItemI {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  param: string;
}

const CurrencyItem = ({
  id,
  rank,
  symbol,
  name,
  supply,
  param,
}: CurrencyItemI) => {
  return (
    <tr>
      <td>{rank}</td>
      <td>{id}</td>
      <td>{symbol}</td>
      <td>{name}</td>
      <td>{supply}</td>
      <td>
        <Link to={id} state={param}>
          Details
        </Link>
      </td>
    </tr>
  );
};

export default CurrencyItem;
