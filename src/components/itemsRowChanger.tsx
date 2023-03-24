import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useWindowSize } from '../hooks/windowsSize';

interface IItemsRowChangerProps {
  onNumColumnsPerItemChange: (numItems: number) => void;
}

const ItemsRowChanger: FC<IItemsRowChangerProps> = ({ onNumColumnsPerItemChange }) => {
  const windows = useWindowSize();
  const [numColumnsPerItem, setNumColumnsPerItem] = useState<number>(3);

  useEffect(() => {
    if (windows > 900) {
      setNumColumnsPerItem(3);
    } else {
      setNumColumnsPerItem(4);
    }
  }, [windows]);

  useEffect(() => {
    onNumColumnsPerItemChange(numColumnsPerItem);
  }, [numColumnsPerItem]);

  return (
    <Grid container sx={{ justifyContent: { xs: 'center', md: 'end' } }}>
      <Grid item>
        <Button
          aria-label="remove"
          onClick={() =>
            windows > 900
              ? setNumColumnsPerItem(numColumnsPerItem + 1)
              : setNumColumnsPerItem(numColumnsPerItem + 2)
          }
          disabled={
            (numColumnsPerItem == 4 && windows > 900) || (numColumnsPerItem == 6 && windows < 900)
          }
        >
          <RemoveIcon fontSize="large" />
        </Button>
      </Grid>
      <Grid item>
        <Button
          aria-label="add"
          onClick={() =>
            windows > 900
              ? setNumColumnsPerItem(numColumnsPerItem - 1)
              : setNumColumnsPerItem(numColumnsPerItem - 2)
          }
          disabled={
            (numColumnsPerItem == 3 && windows > 900) || (numColumnsPerItem == 4 && windows < 900)
          }
        >
          <AddIcon fontSize="large" />
        </Button>
      </Grid>
    </Grid>
  );
};

export default ItemsRowChanger;
