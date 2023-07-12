import React from "react";
import useSaleOrders from "./hooks/useSaleOrders";
import SaleOrderCard from "./SaleOrderCard";
import NoData from "../../components/NoData";
import Loading from "../../components/Loading";

export default function SalesOrdersDashboard() {
  const [saleOrders, loading, , reFetch] = useSaleOrders();

  if (loading)
    return (
      <div className="flex-grow-1 d-flex align-items-center">
        <Loading />
      </div>
    );

  return (
    <div className="row py-5 px-5 gap-4">
      {(saleOrders?.length > 0 &&
        saleOrders
          .sort((a, b) => b.id - a.id)
          .map((order) => (
            <SaleOrderCard
              key={order.id}
              reFetch={reFetch}
              className="col-md-4"
              {...order}
            />
          ))) || <NoData />}
    </div>
  );
}
