import { Params } from "react-router-dom";
import { requireAuth } from "../../utils/auth";
import { getData } from "../../utils/api";

export const currenciesLoader = async ({ request }: { request: Request }) => {
  requireAuth(request.url);
  const data = await getData();
  return data.data;
};

export const currencyDetailsLoader = async ({
  params,
  request,
}: {
  params: Params;
  request: Request;
}) => {
  console.log(request.url);
  requireAuth(request.url);
  const data = await getData(params.id);
  return data;
};
