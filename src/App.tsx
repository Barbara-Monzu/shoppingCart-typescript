import { useState } from 'react';
import { useQuery } from 'react-query';
import { LinearProgress, Drawer, Grid, Badge } from '@mui/material';
import { Wrapper, StyledButton } from './App.styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Item from './Item/Item';
import Cart from './Cart/Cart';

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  price: number;
  image: string;
  title: string;
  amount: number;
}

const getProducts = async (): Promise<CartItemType[]> => {
  const res = await fetch('https://fakestoreapi.com/products');
  return res.json();
}

function App() {
  const { data, isLoading, isError } = useQuery<CartItemType[]>('products', getProducts);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const getTotalItems = (items: CartItemType[]) => items.reduce((acc: number, items) => acc + items.amount, 0);;
  const handleAddToCart = (clickedItem: CartItemType) => {
    console.log('entrando')
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === clickedItem.id);
      if (existingItem) {
        return prev?.map(item =>
          item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item);
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => 
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else return [...acc, item];
      }, [] as CartItemType[])
    );
  };

  if (isLoading) {
    return <LinearProgress color="secondary" />
  }
  if (isError) {
    return <div>Error</div>
  }
  console.log(data);
  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart} />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <ShoppingCartIcon />
        </Badge>
      </StyledButton>

      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Item item={item} handleAddToCart={handleAddToCart} handleRemoveFromCart={handleRemoveFromCart} />
          </Grid>
        ))}
      </Grid>

    </Wrapper>
  );
}

export default App;
