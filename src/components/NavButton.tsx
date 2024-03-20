import Button from "@mui/material/Button";
import styled from "styled-components";

interface NavButtonProps {
  name: string;
  link: string;
}

const Wrapper = styled.div`
  &:hover .Nav-Button-Styling {
    color: #ff0000;
  }
`;

const NavButton = ({ name, link }: NavButtonProps) => {
  return (
    <Wrapper>
      <Button
        className="Nav-Button-Styling"
        href={link}
        key={name}
        sx={{ my: 2, color: "white", display: "block", fontSize: "18px", fontWeight: 600, paddingLeft: "32px"  }}
      >
        {name}
      </Button>
    </Wrapper>
  );
};

export default NavButton;