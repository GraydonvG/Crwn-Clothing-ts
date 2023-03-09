import './CheckoutItem.styles.scss';

function CheckoutItem({ checkoutItem }) {
  const { imageUrl, name, price, quantity } = checkoutItem;
  return (
    <div className="checkout-item-container">
      <img
        src={imageUrl}
        alt={`${name}`}
      />
      <span className="item-description">{name}</span>
      <div className="quantity-container">
        <button className="item-quantity-button decrease-quantity">&lt;</button>
        <span className="item-quantity">{quantity}</span>
        <button className="item-quantity-button increase-quantity">&gt;</button>
      </div>
      <span className="item-price">${price}</span>
      <button className="remove-item-button">X</button>
    </div>
  );
}

export default CheckoutItem;
