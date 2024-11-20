import React from 'react';
import { Container, Typography, Box, Card, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
    <>
      <Box
        sx={{
          backgroundColor: "#f6f6f6",
          py: 6,
          px: 2,
          minHeight: "100vh",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: "bold",
            color: "#000",
            textAlign: "center",
            mb: 5,
          }}
        >
          Open source. Open attitude.
        </Typography>

        <Box>
          {cards.map((card, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: index % 2 === 0 ? "flex-start" : "flex-end",
                mb: 4,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1.5rem",
                  borderRadius: 2,
                  width: "100%",
                  maxWidth: "600px",
                  backgroundColor: "#fff",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#d10000",
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    mr: 3,
                  }}
                >
                  {card.icon}
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    flex: 1,
                    color: "#333",
                    textAlign: "center",
                    lineHeight: "1.5rem",
                  }}
                >
                  {card.text}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#d10000",
                    color: "#fff",
                    textTransform: "none",
                    borderRadius: "1rem",
                    padding: "0.5rem 1rem",
                    ml: 3,
                    "&:hover": {
                      backgroundColor: "#a80000",
                    },
                  }}
                  endIcon={<ArrowForwardIcon />}
                >
                  Read More
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "#fff",
          py: 6,
          px: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontFamily: "'Port Lligat Slab', serif",
              fontWeight: "bold",
              lineHeight: "1.5",
              fontSize: "2rem", 
              color: "#333",
              whiteSpace: "pre-line",
              textAlign: "center",
            }}
          >
            {"We design and implement\nhigh-quality digital\nsolutions with passion and\ntechnological expertise."}
          </Typography>
          
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#d10000",
              color: "#fff",
              textTransform: "none",
              borderRadius: "1rem",
              padding: "0.5rem 1.5rem",
              "&:hover": {
                backgroundColor: "#a80000",
              },
            }}
            endIcon={<ArrowForwardIcon />}
          >
            Read More
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="/src/layout/About Us.jpg" 
            alt="Team working"
            style={{
              maxWidth: "100%",
              borderRadius: "8px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default About;