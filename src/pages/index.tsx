import { Container, Grid } from '@mui/material';

import SearchInput from '../components/seatchInput';
import ItemsRowChanger from '../components/ItemsRowChanger';
import PoductsList from '../components/ProductsList';
import Product from 'models/Product';

import { NextPage } from 'next';
import { useEffect, useState } from 'react';

interface IProductPageProps {
  products: Product[];
}

const ProductPage: NextPage<IProductPageProps> = ({ products }) => {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [columnsPerItem, setNumColumnsPerItem] = useState<number>(3);

  useEffect(() => {
    setProductsList(products);
  }, [products]);

  useEffect(() => {
    if (searchTerm) {
      const filteredProducts = products.filter((product) =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setProductsList(filteredProducts);
    } else {
      setProductsList(products);
    }
  }, [searchTerm]);

  return (
    <Container maxWidth="xl">
      <Grid container mt={4} sx={{ textAlign: { xs: 'center', md: 'inherit' } }}>
        <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
          <SearchInput onSearch={setSearchTerm} />
        </Grid>
        <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
          <ItemsRowChanger onNumColumnsPerItemChange={setNumColumnsPerItem} />
        </Grid>
      </Grid>
      <PoductsList products={productsList} numColumnsPerItem={columnsPerItem} />
    </Container>
  );
};

export default ProductPage;

//In the case that we must keep in  mind the stock of the products, or something that change often, we should use getServerSideProps
export const getStaticProps = async () => {
  const reponse = await fetch('http://localhost:3001/products');
  const products = await reponse.json();

  return {
    props: {
      products,
    },
  };
};
