import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Input,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from '@mui/material';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FoodOrderTable = () => {
  const [foodItems, setFoodItems] = useState([]);

  const navigate = useNavigate();

  const handleQuantityChange = (foodItemId, newQuantity) => {
    setFoodItems((prevItems) =>
      prevItems.map((item) =>
        item.id === foodItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/food-item');
      console.log(response.data);

      const foodItemsWithQuantity = response.data.map((food) => ({
        ...food,
        quantity: 0,
      }));

      setFoodItems(foodItemsWithQuantity);
    } catch (error) {
      console.error(error);
    }
  };


  const handleClick = async () => {
    try {
      const orderDetails = foodItems.map((food) => ({
        name:  food.name,
        image: food.image,
        price: food.price,
        quantity: food.quantity,
      }));
  
      // const response = await fetch('http://localhost:8080/order', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     order: orderDetails,
      //   }),
      // });
  
      // if (!response.ok) {
      //   throw new Error('Error placing order');
      // }
  
      // const data = await response.json();
      console.log('Order placed successfully', orderDetails);
      navigate('/submit');
    } catch (error) {
      console.error('Order placement error', error);
    }
  }
  
  console.log('food....', foodItems)

  return (
    <div className="main-container">
    <Grid container spacing={4} justifyContent="center">
      <Grid item lg={8}>
        <Typography variant="h4" style={{ marginBottom: '50px', marginTop: '40px', textAlign: 'center' , color: 'white' , fontWeight: 'bold' }}>
          Food Order
        </Typography>
        <TableContainer component={Paper}>
          <Table className='table-head'>
            <TableHead>
              <TableRow>
                <TableCell>Food Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {foodItems.map((food) => (
                <TableRow key={food.id}>
                  <TableCell>
                    <Card>
                      <CardMedia
                        component="img"
                        alt={food.name}
                        height="100"
                        image={food.image}
                        title={food.name}
                      />
                    </Card>
                  </TableCell>
                  <TableCell>{food.name}</TableCell>
                  <TableCell>${food.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <IconButton className='icon-button'
                      onClick={() => handleQuantityChange(food.id, food.quantity - 1)}
                      disabled={food.quantity === 0}
                    >
                      -
                    </IconButton>
                    <Input
                      type="number"
                      value={food.quantity}
                      onChange={(e) =>
                        handleQuantityChange(food.id, parseInt(e.target.value, 10))
                      }
                      inputProps={{ min: 0 }}
                      style={{ width: '30px', textAlign: 'center' }}
                    />
                    <IconButton className='icon-button' onClick={() => handleQuantityChange(food.id, food.quantity + 1)}>
                      +
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" className='btn-order' style={{marginTop: '50px' , fontWeight: 'bold'}} onClick={handleClick}>Place Order</Button>
      </Grid>
     </Grid>
     </div>
  );
};

export default FoodOrderTable;
