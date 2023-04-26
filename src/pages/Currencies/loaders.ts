import { Params, defer } from "react-router-dom";
import { requireAuth } from "../../utils/auth";
import { getData } from "../../utils/api";

export const currenciesLoader = async ({ request }: { request: Request }) => {
  requireAuth(request.url);
  const dataPromise = getData();
  return defer({ data: dataPromise });
};

export const currencyDetailsLoader = async ({
  params,
  request,
}: {
  params: Params;
  request: Request;
}) => {
  requireAuth(request.url);
  const dataPromise = getData(params.id);
  return defer({ dataPromise });
};
