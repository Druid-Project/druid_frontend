import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPersonalizedContent } from "../../redux/mauticSlice";
import { Box, CircularProgress, Alert, Typography } from "@mui/material";
import Card from "./Card";

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
    if (!contact || !Object.keys(personalizedContent).length) {
      return (
        <Typography variant="body1" sx={{ textAlign: "center", marginTop: 2 }}>
          No personalized content available.
        </Typography>
      );
    }

    const placeholders = {
      "contactfield=lastname": contact?.fields?.core?.lastname?.value || "User",
      "ownerfield=position": contact?.fields?.core?.position?.value || "Manager",
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
