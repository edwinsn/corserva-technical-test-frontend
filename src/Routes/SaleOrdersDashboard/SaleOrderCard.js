import React from "react";
import PropTypes from "prop-types";
import deleteOrder from "./services/deleteOrder";

export default function SaleOrderCard({
  className,
  customer,
  id,
  reFetch,
  paymentMethod,
  deliveryAddress,
}) {
  const [loadingDeletion, setLoadingDeletion] = React.useState(false);
  const paymentEmojis = {
    Cash: "💰",
    "Debit Card": "💳",
    "Credit Card": "🏧",
  };

  const handleDeletion = () => {
    setLoadingDeletion(true);

    deleteOrder(id)
      .then(() => {
        reFetch();
      })
      .finally(() => {
        setLoadingDeletion(false);
      });
  };
  const seeAddress = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      deliveryAddress
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className={"card m-3" + className} style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{customer}</h5>
        <div>
          Payment: {paymentMethod} {paymentEmojis[paymentMethod]}
        </div>
        <p className="card-text">
          Address:
          <a className="text-primary" onClick={seeAddress}>
            {deliveryAddress}
          </a>
        </p>
        <div className="d-flex gap-2" disabled={loadingDeletion}>
          <a href={`/edit-order/${id}`} className="btn btn-outline-primary">
            Update
          </a>
          <button
            className="btn btn-outline-danger"
            onClick={handleDeletion}
            disabled={loadingDeletion}
          >
            {loadingDeletion ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

SaleOrderCard.propTypes = {
  className: PropTypes.string || null,
  customer: PropTypes.string,
  id: PropTypes.number,
  reFetch: PropTypes.func,
  paymentMethod: PropTypes.string,
  deliveryAddress: PropTypes.string,
};
