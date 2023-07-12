import React, { useState } from "react";
import newOrder from "./services/newOrder";
import { useNavigate, Link } from "react-router-dom";

export default function NewSaleOrder() {
  const [items, setItems] = useState([{ product: "", quantity: 1, price: 0 }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
    setItems((items) => items.filter((_, i) => i !== index));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Get the form data
    const customer = event.target.elements.customer.value;
    const deliveryAddress = event.target.elements.deliveryAddress.value;
    const paymentMethod = event.target.elements.paymentMethod.value;

    // Create the data object
    const data = { customer, deliveryAddress, paymentMethod, items };

    setLoading(true);
    newOrder(data)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError(true);
        setTimeout(() => {
          setError(null);
        }, 5000);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className="row flex-wrap w-100 p-5" onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger" role="alert">
          Error, try again later.
        </div>
      )}
      <div className="col-md-12 d-flex justify-content-between">
        <h3 className="mb-5">New Sale Order</h3>
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
          required
        />
      </label>
      <label className="col-md-4">
        <div>Delivery Address:</div>
        <input
          type="text"
          className="form-control my-2"
          placeholder="Delivery Address"
          name="deliveryAddress"
        />
      </label>
      <label className="col-md-4">
        <div>Payment Method:</div>
        <select
          className="form-control my-2"
          id="paymentMethod"
          name="paymentMethod"
        >
          <option>Cash</option>
          <option>Credit Card</option>
          <option>Debit Card</option>
        </select>
      </label>
      <div className="col-md-12">
        <h5 className="my-5">Items:</h5>
        {items.map((item, index) => (
          <div key={index} className="d-flex mb-2 gap-4">
            <label>
              Product
              <input
                type="text"
                className="form-control me-2 my-2"
                placeholder="Product name"
                required
                value={item.product}
                onChange={(event) =>
                  handleItemChange(index, "product", event.target.value)
                }
              />
            </label>
            <label>
              Quantity
              <input
                type="number"
                className="form-control me-2 my-2"
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
            </label>
            <label>
              Price
              <input
                type="number"
                className="form-control me-2 my-2"
                placeholder="Price"
                value={item.price}
                onChange={(event) =>
                  handleItemChange(index, "price", Number(event.target.value))
                }
              />
            </label>
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
        ))}
        <button
          type="button"
          className="btn btn-success mb-2"
          onClick={handleAddItem}
        >
          Add Item
        </button>
      </div>
    </form>
  );
}
