import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Avatar,
  Typography,
  Chip,
} from "@mui/material";

const Taskcard = () => {
  return (
    <Card>
      <CardContent>
        <Grid container display={"flex"} justifyContent={"space-between"}>
          <Grid>
            <Avatar src="https://picsum.photos/200/300"></Avatar>
          </Grid>
          <Grid>
            <Typography variant="h6" color={"GrayText"}>
              Task 1: User Interface
            </Typography>
            <Grid container spacing={5}>
              <Chip
                label={"P1"}
                color="success"
                sx={{ padding: "15px" }}
              ></Chip>
              <Chip label={"P2"} color="success" sx={{ padding: "5px" }}></Chip>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Taskcard;
