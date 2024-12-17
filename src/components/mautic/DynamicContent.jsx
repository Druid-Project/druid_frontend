import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDynamicContent } from "../../redux/mauticSlice";
import { Box, Typography } from "@mui/material";

const DynamicContent = () => {
  const dispatch = useDispatch();
  const { dynamicContent, loading, error } = useSelector(
    (state) => state.mautic
  );

  useEffect(() => {
    dispatch(fetchDynamicContent());
  }, [dispatch]);

  if (loading) return <Typography>Loading dynamic content...</Typography>;
  if (error)
    return <Typography>Error loading dynamic content: {error}</Typography>;

  return (
    <Box>
      {Object.values(dynamicContent).map((content) => (
        <Box key={content.id} sx={{ marginBottom: 4 }}>
          <Typography variant="h5">{content.name}</Typography>
          <div dangerouslySetInnerHTML={{ __html: content.content }} />
        </Box>
      ))}
    </Box>
  );
};

export default DynamicContent;
