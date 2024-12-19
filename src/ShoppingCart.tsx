import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { RootState, AppDispatch } from './store';
import { addItem, updateQuantity, removeItem } from './cartSlice';

type FormData = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

const ShoppingCart: React.FC = () => {
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    dispatch(addItem({ ...data, price: Number(data.price), quantity: Number(data.quantity) }));
    reset();
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('id')} placeholder="Item ID" required />
        <input {...register('name')} placeholder="Item Name" required />
        <input {...register('price')} placeholder="Price" type="number" required />
        <input {...register('quantity')} placeholder="Quantity" type="number" required />
        <button type="submit">Add Item</button>
      </form>

      <h2>Cart Items</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <span>{item.name}</span> - <span>${item.price}</span> x <span>{item.quantity}</span>
            <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>
              +
            </button>
            <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>
              -
            </button>
            <button onClick={() => dispatch(removeItem(item.id))}>Remove</button>
          </li>
        ))}
      </ul>

      <h3>Total: ${totalAmount.toFixed(2)}</h3>
    </div>
  );
};

export default ShoppingCart;
