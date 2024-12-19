import { Container, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="md" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Box>
        <Typography variant="h2" component="h1" gutterBottom>
          404 Not Found
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Sorry, the page you are looking for does not exist.
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/" style={{ marginRight: '10px' }}>
          Go to Homepage
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Box>
    </Container>
  );
}

export default ErrorPage;
