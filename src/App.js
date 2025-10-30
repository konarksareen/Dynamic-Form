import React, { useState } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import JsonInput from "./components/JsonInput";
import DynamicForm from "./components/DynamicForm";

function App() {
  const [schema, setSchema] = useState(null);

  const handleSchemaSubmit = (parsedSchema) => {
    setSchema(parsedSchema);
  };

  const handleReset = () => {
    setSchema(null);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dynamic Form Renderer
      </Typography>

      {!schema ? (
        <JsonInput onSchemaSubmit={handleSchemaSubmit} />
      ) : (
        <Box>
          <DynamicForm schema={schema} />

          <Button
            variant="outlined"
            color="primary"
            onClick={handleReset}
            sx={{ mt: 3 }}
          >
            Back to JSON Input
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default App;
