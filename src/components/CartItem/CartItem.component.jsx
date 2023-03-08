import './CartItem.styles.scss';

function CartItem({ cartItem }) {
  const { name, imageUrl, price, quantity } = cartItem;

  function calculatePrice() {
    return price * quantity;
  }

  return (
    <div className="cart-item-container">
      <img
        src={imageUrl}
        alt="prodduct image"
      />
      <div className="item-details">
        <span className="name">{name}</span>
        <span>{quantity}</span>
        <span>{calculatePrice()}</span>
      </div>
    </div>
  );
}

export default CartItem;
