import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPersonalizedContent } from "../../redux/mauticSlice";
import { Box, Typography, Card, CardContent, CircularProgress, Alert } from "@mui/material";

const DynamicContent = () => {
  const dispatch = useDispatch();
  const { personalizedContent, loading, error } = useSelector(
    (state) => state.mautic
  );

  useEffect(() => {
    dispatch(fetchPersonalizedContent());
  }, [dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error loading personalized content: {error}</Alert>;

  return (
    <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
      {Object.values(personalizedContent).map((content) => (
        <Card key={content.id} sx={{ marginBottom: 4, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
              {content.name}
            </Typography>
            <div dangerouslySetInnerHTML={{ __html: content.content }} />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default DynamicContent;
