import React from "react";
import { Box } from "@mui/material";
import Campaign from "./Campaign";
import "./css/campaignList.css";

const CampaignList = () => {
  const campaigns = [
    {
      imageUrl: "https://via.placeholder.com/200x100",
      title: "Join Our Exclusive Druid.fi Campaign",
      description:
        "Discover the magic of Druid.fi with our exclusive campaign. Enjoy special offers, expert insights, and much more. Don't miss out on this opportunity to elevate your experience with us!",
      ctaText: "Get Started",
      ctaLink: "https://druid.fi",
    },
    {
      imageUrl: "https://via.placeholder.com/200x100",
      title: "Unlock New Features with Druid.fi",
      description:
        "Explore the latest features of Druid.fi and see how they can benefit you. Join our campaign to get early access and exclusive insights.",
      ctaText: "Learn More",
      ctaLink: "https://druid.fi/features",
    },
    {
      imageUrl: "https://via.placeholder.com/200x100",
      title: "Boost Your Experience with Druid.fi",
      description:
        "Get the most out of Druid.fi with our campaign. Discover tips, tricks, and offers designed to enhance your experience with our platform.",
      ctaText: "Join Now",
      ctaLink: "https://druid.fi/boost",
    },
  ];

  return (
    <Box className="campaign-container">
      {campaigns.map((campaign, index) => (
        <Box key={index} className="campaign-item">
          <Campaign campaign={campaign} />
        </Box>
      ))}
    </Box>
  );
};

export default CampaignList;
