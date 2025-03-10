import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  TrendingUp,
  ShoppingCart,
  LocalShipping,
  Inventory,
  People,
  Refresh,
} from '@mui/icons-material';
import { LineChart } from '@mui/x-charts';
import { selectUser } from '../../store/slices/authSlice';
import Loading from '../../components/Loading';

function DashboardCard({ title, value, icon, color }) {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h4" sx={{ mt: 1, mb: 1 }}>
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: `${color}15`,
              borderRadius: '50%',
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [loading, setLoading] = React.useState(true);
  const [stats, setStats] = React.useState({
    salesToday: 0,
    salesThisMonth: 0,
    purchasesThisMonth: 0,
    totalProducts: 0,
    totalCustomers: 0,
    lowStockProducts: 0,
    salesChart: [],
  });

  // Simulated data for the chart
  const chartData = {
    xAxis: [{ data: [1, 2, 3, 4, 5, 6, 7] }],
    series: [
      {
        data: [2, 5.5, 2, 8.5, 1.5, 5, 3],
      },
    ],
  };

  useEffect(() => {
    // TODO: Fetch dashboard stats based on user role
    const fetchStats = async () => {
      try {
        setLoading(true);
        // Implement API call here
        // const response = await dashboardAPI.getStats();
        // setStats(response.data);
        
        // Simulated delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStats({
          salesToday: 'Rp 2.5M',
          salesThisMonth: 'Rp 45.8M',
          purchasesThisMonth: 'Rp 32.3M',
          totalProducts: '248',
          totalCustomers: '156',
          lowStockProducts: '12',
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">Dashboard</Typography>
          <IconButton onClick={() => window.location.reload()}>
            <Refresh />
          </IconButton>
        </Box>

        <Grid container spacing={3}>
          {/* Sales Today */}
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="Sales Today"
              value={stats.salesToday}
              icon={<TrendingUp sx={{ color: theme.palette.primary.main }} />}
              color={theme.palette.primary.main}
            />
          </Grid>

          {/* Monthly Sales */}
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="Sales This Month"
              value={stats.salesThisMonth}
              icon={<ShoppingCart sx={{ color: theme.palette.success.main }} />}
              color={theme.palette.success.main}
            />
          </Grid>

          {/* Monthly Purchases */}
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="Purchases This Month"
              value={stats.purchasesThisMonth}
              icon={<LocalShipping sx={{ color: theme.palette.warning.main }} />}
              color={theme.palette.warning.main}
            />
          </Grid>

          {/* Low Stock Products */}
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="Low Stock Products"
              value={stats.lowStockProducts}
              icon={<Inventory sx={{ color: theme.palette.error.main }} />}
              color={theme.palette.error.main}
            />
          </Grid>

          {/* Sales Chart */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Sales Overview
              </Typography>
              <Box sx={{ height: 300, width: '100%' }}>
                <LineChart
                  xAxis={chartData.xAxis}
                  series={chartData.series}
                  height={300}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Additional Stats */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Inventory Summary
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Products
                  </Typography>
                  <Typography variant="h4">{stats.totalProducts}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Customers
                  </Typography>
                  <Typography variant="h4">{stats.totalCustomers}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Recent Activity
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Coming soon...
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Dashboard;
