import './CartItem.styles.scss';

function CartItem({ cartItem }) {
  const { name, imageUrl, price, quantity } = cartItem;

  function calculatePrice() {
    const amount = price * quantity;
    return `$${amount}`;
  }

  return (
    <div className="cart-item-container">
      <img
        src={imageUrl}
        alt={`${name}`}
      />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="quantity">{`Quantity: ${quantity}`}</span>
        <span className="price">{calculatePrice()}</span>
      </div>
    </div>
  );
}

export default CartItem;
