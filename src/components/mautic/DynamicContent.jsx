import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPersonalizedContent } from "../../redux/mauticSlice";
import { Box, CircularProgress, Alert } from "@mui/material";
import Card from "./Card"; // Import the new Card component

const DynamicContent = () => {
  const dispatch = useDispatch();
  const { personalizedContent, loading, error } = useSelector(
    (state) => state.mautic
  );

  useEffect(() => {
    dispatch(fetchPersonalizedContent());
  }, [dispatch]);

  const renderContent = useMemo(() => {
    return Object.values(personalizedContent).map((content) => (
      <Card key={content.id} content={content} />
    ));
  }, [personalizedContent]);

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
