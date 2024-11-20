import React from "react";
import { Box, Typography, Button } from "@mui/material";

const About = () => {
  const cards = [
    "We are a dedicated software house, crafting high-quality digital solutions with passion and expertise.",
    "A more functional world, from one line of code to the next.",
    "Knowledge and passion.",
    "Big picture. Small details.",
    "Close and flexible cooperation.",
    "A smooth ride from one technology to another.",
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
          {cards.map((title, index) => (
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
                  <i
                    className="bi bi-envelope"
                    style={{ fontSize: "1.5rem", color: "#fff" }}
                  ></i>
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
                  {title}
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
                  endIcon={<i className="bi bi-arrow-right"></i>}
                >
                  Read More
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* New Section */}
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
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            mb: 4,
          }}
        >
          {/* Text on the Left */}
          <Box
            sx={{
              flex: 1,
              pr: 4,
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
                textAlign: "left",
              }}
            >
              We design and implement high-quality digital solutions with
              passion and technological expertise.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center", 
              justifyContent: "center",
            }}
          >
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
              endIcon={<i className="bi bi-arrow-right"></i>}
            >
              Read More
            </Button>
          </Box>
        </Box>

        {/* Image Below */}
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
