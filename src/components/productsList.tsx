import { Grid } from '@mui/material';
import { FC } from 'react';

import Product from '../models/Product';
import ProductItem from './productItem';

interface IProductItemProps {
  products: Product[];
  numColumnsPerItem: number;
}

const PoductsList: FC<IProductItemProps> = ({ products, numColumnsPerItem }) => {
  return (
    <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }} data-testid="products">
      {products.map((product) => (
        <Grid
          data-testid="product-item"
          key={product.id}
          item
          xs={numColumnsPerItem}
          md={numColumnsPerItem}
          sx={{
            marginTop: '50px',
            cursor: 'pointer',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <ProductItem
            product_name={product.product_name}
            price={product.price}
            discount={product.discount}
            image={product.image}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default PoductsList;
