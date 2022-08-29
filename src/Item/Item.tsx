import { Button } from '@mui/material';
import { CartItemType } from '../App';
import { Wrapper } from './Item.styles';

type Props = {
    item: CartItemType;
    handleRemoveFromCart: (id: number) => void;
    handleAddToCart: (clickedItem: CartItemType) => void;
}

const Item: React.FC<Props> = ({ item, handleRemoveFromCart, handleAddToCart }) => {
    return (
        <Wrapper>
            <img src={item.image} alt={item.title} />
            <div>
                <h1>{item.title}</h1>
                <p>{item.description}</p>
                <p>{item.price} $</p>
            </div>
                <Button onClick={() => handleAddToCart(item)}>
                    Add to cart
                </Button>
        </Wrapper>
    )
}

export default Item;