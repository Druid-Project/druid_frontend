import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPersonalizedContent } from "../../redux/mauticSlice";
import { Box, CircularProgress, Alert } from "@mui/material";
import Card from "./Card"; // Import the new Card component

const DynamicContent = () => {
  const dispatch = useDispatch();
  const { personalizedContent, loading, error, contact } = useSelector(
    (state) => ({
      ...state.mautic,
    })
  );

  useEffect(() => {
    dispatch(fetchPersonalizedContent());
  }, [dispatch]);

  const renderContent = useMemo(() => {
    const placeholders = {
      "contactfield=lastname": contact?.fields?.core?.lastname?.value || "User", // Use contact's last name or a default value
      "ownerfield=position": contact?.fields?.core?.position?.value || "Manager",
      // Add more placeholders as needed
    };

    return Object.values(personalizedContent).map((content) => (
      <Card key={content.id} content={content} placeholders={placeholders} />
    ));
  }, [personalizedContent, contact]);

  if (loading) return <CircularProgress />;
  if (error)
    return (
      <Alert severity="error">
        Error loading personalized content: {error}
      </Alert>
    );

  return (
    <Box sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
      {renderContent}
    </Box>
  );
};

export default DynamicContent;
