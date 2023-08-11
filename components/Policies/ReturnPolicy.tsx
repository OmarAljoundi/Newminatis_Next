import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import { useAppSelector } from "@/hooks/useRedux";
import { H4, Paragraph } from "../Typography";

export const ReturnPolicy = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const return_policy_content = useAppSelector(
    (x) => x.Store.ContentReducer?.Content?.returnPolicy
  );
  return (
    <Container>
      {return_policy_content?.map((item, index) => (
        <Box sx={{ my: 1 }} key={index}>
          <Accordion
            expanded={expanded === item.title}
            onChange={handleChange(item.title)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
            >
              <H4 fontWeight={100}>{item.title.toUpperCase()}</H4>
            </AccordionSummary>
            <AccordionDetails>
              <Divider sx={{ borderColor: "white" }} />
              <Paragraph
                pt={1}
                sx={{
                  color: "white",
                  whiteSpace: "break-spaces",
                }}
              >
                {item.description}
              </Paragraph>
            </AccordionDetails>
          </Accordion>
        </Box>
      ))}
      <Box mt={2} textAlign={"left"}>
        <Paragraph fontWeight={"700"}>
          {" "}
          There is often some processing time before a refund is posted.
          <br />
          If you’ve done all of this and you still have not received your
          refund, please contact us at support@newminatis.com.
        </Paragraph>
      </Box>
    </Container>
  );
};
