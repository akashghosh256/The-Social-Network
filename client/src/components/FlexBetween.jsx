// file creates a styled component (FlexBetween) using Material-UI's Box component as the base. This styled component is a flex container 
// with its children spaced between each other, and both the main and cross axis aligned at the center. It provides a 
// convenient way to create a flex container with specific styling for arranging items between the main axis. 

import { Box } from "@mui/material";
import { styled } from "@mui/system";

const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;


// 2:20:44
// as if it's another component and you can just pass in CSS properties in here and
// 2:20:50
// in this case we're going to display of flex justify content of space between
// 2:20:58
// align items of Center by doing this this allows us to reuse
// 2:21:06
// this set of CSS properties through different areas and this one
// 2:21:13
// we're going to be using this quite a bit it's very useful to have something like this so we can align things and flex
// 2:21:20
// things into the proper locations and with that now we can go and create








