import React from 'react';
import { Grid } from '@mui/material';
import Card from '../../components/Card';
import PageHeader from '../../components/PageHeader';

function Dashboard() {
  const stats = [
    { title: 'Total Sales', value: '$15,350', color: 'primary.main' },
    { title: 'Total Orders', value: '156', color: 'success.main' },
    { title: 'Total Products', value: '89', color: 'warning.main' },
    { title: 'Total Customers', value: '45', color: 'info.main' },
  ];

  return (
    <>
      <PageHeader 
        title="Dashboard" 
        subtitle="Welcome to your dashboard"
      />
      
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <h3 style={{ color: stat.color, margin: 0 }}>{stat.value}</h3>
                <p style={{ margin: '10px 0 0 0' }}>{stat.title}</p>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Dashboard;
