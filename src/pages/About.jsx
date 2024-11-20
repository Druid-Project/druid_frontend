import React from 'react';
import { Container, Typography, Box, Card, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';

// Styled components
const StyledCard = styled(Card)({
  padding: '25px',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'white',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
  transition: 'transform 0.2s ease-in-out',
  width: '100%',
  maxWidth: '1000px',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
  },
});

const IconBox = styled(Box)({
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  backgroundColor: '#FF5733',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '24px',
});

const ReadMoreButton = styled(Button)({
  backgroundColor: '#FF5733',
  color: 'white',
  borderRadius: '20px',
  padding: '8px 20px',
  '&:hover': {
    backgroundColor: '#E64A2E',
  },
});

const About = () => {
  const cards = [
    { icon: <ViewInArOutlinedIcon sx={{ color: 'white' }} />, text: 'We are a regulated software house working with complex projects including payments and regulated environments.' },
    { icon: <ViewInArOutlinedIcon sx={{ color: 'white' }} />, text: 'A trusted technological partner, here to help all of clients for the best.' },
    { icon: <ViewInArOutlinedIcon sx={{ color: 'white' }} />, text: 'A knowledge-first approach.' },
    { icon: <ViewInArOutlinedIcon sx={{ color: 'white' }} />, text: 'High-quality, tested solution.' },
    { icon: <ViewInArOutlinedIcon sx={{ color: 'white' }} />, text: 'Focus on long-term partnerships.' },
    { icon: <ViewInArOutlinedIcon sx={{ color: 'white' }} />, text: "A company that's been ever-developing new products." }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', my: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Open source. Open attitude.
        </Typography>
      </Box>

      {/* Cards Section */}
      <Box sx={{ 
        mb: 8,
        maxWidth: '1200px',
        mx: 'auto',
        px: 10
      }}>
        {cards.map((card, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
              mb: 4,
              transform: index % 2 === 0 ? 'translateX(-20%)' : 'translateX(20%)',
              opacity: 0.98,
              '@media (max-width: 900px)': {
                justifyContent: 'center',
                transform: 'none',
              }
            }}
          >
            <StyledCard>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 3,
                width: '100%' 
              }}>
                <IconBox>
                  {card.icon}
                </IconBox>
                <Typography 
                  sx={{ 
                    flex: 1,
                    fontSize: '1.1rem',
                    lineHeight: 1.6,
                    pr: 3
                  }}
                >
                  {card.text}
                </Typography>
                <ReadMoreButton variant="contained">Read More</ReadMoreButton>
              </Box>
            </StyledCard>
          </Box>
        ))}
      </Box>

      {/* Statement Section */}
      <Box sx={{ textAlign: 'center', my: 8 }}>
        <Typography variant="h4" component="h2" sx={{ maxWidth: '600px', margin: '0 auto', mb: 4 }}>
          We design and implement high-quality digital solutions with passion and technological expertise.
        </Typography>
        <ReadMoreButton variant="contained">Read More</ReadMoreButton>
      </Box>

      {/* Image Section */}
      <Box 
        sx={{ 
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          mt: 8,
          mb: 8
        }}
      >
        <img 
          src="/src/assets/img/tempImageF9Xgsn 1.svg" 
          alt="Description 1"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            objectFit: 'cover'
          }}
        />
      </Box>
    </Container>
  );
};

export default About;