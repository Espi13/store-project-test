import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { Box } from '@mui/system';
import Image from 'next/image';

import { FC } from 'react';

interface IProductItemProps {
  product_name: string;
  price: number;
  discount: number;
  image: string;
}

const ProductItem: FC<IProductItemProps> = ({ product_name, price, discount, image }) => {
  return (
    <Card>
      <CardMedia sx={{ padding: '2rem' }}>
        <Image src={image} alt={product_name} width={300} height={300} />
      </CardMedia>
      <CardContent sx={{ padding: '0 2rem' }}>
        <Typography
          variant="body1"
          sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
          mb={4}
          component="div"
        >
          {product_name}
        </Typography>
        {!discount && (
          <Box sx={{ height: '50px' }}>
            <Typography variant="body2">{price} €</Typography>
          </Box>
        )}
        {discount && (
          <Box
            sx={{
              height: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexFlow: 'column',
            }}
          >
            <Typography variant="body2" sx={{ textDecoration: 'line-through' }}>
              {price} €
            </Typography>
            <Typography variant="body2" sx={{ color: red[500] }}>
              {((price * (100 - discount)) / 100).toFixed(2)} € (-{discount}%)
            </Typography>
          </Box>
        )}
        <Box sx={{ height: '20px' }} mt={2}>
          {discount && <Typography variant="body2">mas colores</Typography>}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center', marginBottom: 4 }}>
        <Button size="small" color="primary" variant="contained">
          AÑADIR
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductItem;
