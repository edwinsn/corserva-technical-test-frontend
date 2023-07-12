import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSaleOrder from "./hooks/useSaleOrder";
import updateOrder from "./services/updateOrder";
import { useNavigate, Link } from "react-router-dom";
import Loading from "../../components/Loading";

export default function UpdateSaleOrder() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const orderId = params.id;

  const [order, loadingOrder] = useSaleOrder(orderId);

  const handleItemChange = (index, key, value) => {
    setItems((items) => {
      const newItems = [...items];
      newItems[index] = { ...newItems[index], [key]: value };
      return newItems;
    });
  };

  const handleAddItem = () => {
    setItems((items) => [...items, { product: "", quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (index) => {
    setItems((items) => {
      const newItems = [...items];
      if (newItems[index].id) {
        newItems[index] = { ...newItems[index], delete: true };
      } else {
        newItems.splice(index, 1);
      }
      return newItems;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get the form data
    const customer = event.target.elements.customer.value;
    const deliveryAddress = event.target.elements.deliveryAddress.value;
    const paymentMethod = event.target.elements.paymentMethod.value;

    // Create the data object
    const data = { customer, deliveryAddress, paymentMethod, items };

    setLoading(true);
    updateOrder(orderId, data)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError(true);
        setTimeout(() => {
          setError(false);
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setItems(order?.items || []);
  }, [order]);

  if (loadingOrder)
    return (
      <div className="flex-grow-1 d-flex align-items-center">
        <Loading />
      </div>
    );

  return (
    <div className="p-5">
      {error && (
        <div className="alert alert-danger" role="alert">
          Error, try again later.
        </div>
      )}
      <form className="row flex-wrap w-100" onSubmit={handleSubmit}>
        <div className="col-md-12 d-flex justify-content-between">
          <h3 className="mb-5">Update Sale Order #{orderId}</h3>
          <div disabled={loading}>
            <Link to="/" className="btn btn-outline-danger m-2">
              Cancel
            </Link>
            <input
              type="submit"
              value={loading ? "Loading" : "Submit"}
              className="btn btn-primary m-2"
            />
          </div>
        </div>
        <h5 className="my-5">Order Details:</h5>
        <label className="col-md-4">
          <div>Customer Name:</div>
          <input
            type="text"
            className="form-control my-2"
            placeholder="Customer Name"
            name="customer"
            defaultValue={order.customer}
          />
        </label>
        <label className="col-md-4">
          <div>Delivery Address:</div>
          <input
            type="text"
            className="form-control my-2"
            placeholder="Delivery Address"
            name="deliveryAddress"
            defaultValue={order.deliveryAddress}
          />
        </label>
        <label className="col-md-4">
          <div>Payment Method:</div>
          <select
            className="form-control my-2"
            id="paymentMethod"
            name="paymentMethod"
            defaultValue={order.paymentMethod}
          >
            <option>Cash</option>
            <option>Credit Card</option>
            <option>Debit Card</option>
          </select>
        </label>
        <div className="col-md-12">
          <h5 className="my-5">Items:</h5>
          {items.map((item, index) =>
            item.delete ? null : (
              <div key={index} className="d-flex mb-2">
                <div className="me-2">
                  <label>Product</label>
                  <input
                    type="text"
                    className="form-control my-2"
                    placeholder="Product Name"
                    value={item.product}
                    onChange={(event) =>
                      handleItemChange(index, "product", event.target.value)
                    }
                  />
                </div>
                <div className="me-2">
                  <label>Quantity:</label>
                  <input
                    type="number"
                    className="form-control my-2"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(event) =>
                      handleItemChange(
                        index,
                        "quantity",
                        Number(event.target.value)
                      )
                    }
                  />
                </div>
                <div className="me-2">
                  <label>Price:</label>
                  <input
                    type="number"
                    className="form-control my-2"
                    placeholder="Price"
                    value={item.price}
                    onChange={(event) =>
                      handleItemChange(
                        index,
                        "price",
                        Number(event.target.value)
                      )
                    }
                  />
                </div>
                <div className="d-flex align-items-end">
                  <button
                    type="button"
                    className="btn btn-danger mb-2"
                    onClick={() => handleRemoveItem(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )
          )}
          <button
            type="button"
            className="btn btn-success mb-2"
            onClick={handleAddItem}
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
}
