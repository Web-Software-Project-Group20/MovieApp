import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { useLogin } from '../contexts/LoginContext'
import styled from 'styled-components'
import { HiHome } from "react-icons/hi2"
import { PiUserFill } from "react-icons/pi"
import {
    GiLightBackpack,
    GiTicket,
    GiHexagonalNut,
} from "react-icons/gi";

const IconSideNav = () => {
    return (
        <IconSideNavContainer>
            <SideNav />
            <IconSideNavContent>
            </IconSideNavContent>
        </IconSideNavContainer>
    );
};

const SideNav = () => {
    const [selected, setSelected] = useState(0);
    const { isLoggedIn } = useLogin();


    return (
        <StyledSideNav>
            <NavItem selected={selected === 0} id={0} setSelected={setSelected} to="/">
                <HiHome />
                <TooltipText>Home</TooltipText>
            </NavItem>
            <NavItem selected={selected === 1} id={1} setSelected={setSelected} to="/discover">
                <GiLightBackpack />
                <TooltipText>Discover</TooltipText>
            </NavItem>
            <NavItem selected={selected === 2} id={2} setSelected={setSelected} to="/news">
                <GiTicket />
                <TooltipText>News</TooltipText>
            </NavItem>
            {isLoggedIn && (
                <>
                    <NavItem selected={selected === 3} id={3} setSelected={setSelected} to="/settings">
                        <GiHexagonalNut />
                        <TooltipText>Settings</TooltipText>
                    </NavItem>
                    <NavItem selected={selected === 4} id={4} setSelected={setSelected} to="/profile">
                        <PiUserFill />
                        <TooltipText>Profile</TooltipText>
                    </NavItem>
                </>
            )}
        </StyledSideNav>
    );
};

const NavItem = ({ children, id, setSelected, to }) => {
    const location = useLocation();

    const isSelected = location.pathname === to;

    return (
        <Link to={to}>
            <StyledButton
                onClick={() => setSelected(id)}
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.95 }}
                isSelected={isSelected}
            >
                <StyledSpan>{children}</StyledSpan>
                <AnimatePresence>
                    {isSelected && (
                        <StyledSpanBackground
                            key="background"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                        />
                    )}
                </AnimatePresence>
            </StyledButton>
        </Link>
    );
};

const IconSideNavContainer = styled.div`
  display: flex;
`;

const IconSideNavContent = styled.div`
background-color: #1F2626;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

//Button size
const StyledButton = styled(motion.button)`
margin-top: 15px;
  padding: 10px;
  font-size: 50px;
  background-color: #1F262600;
  color: #B3BAAE;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  position: relative;
  color: ${(props) => (props.isSelected ? "#bc9a44  " : "#B3BAAE")};


  @media (max-width: 951px) {
    margin-top: 0;
    margin-bottom: 10px;
  }
`;

const StyledSpan = styled.span`
  display: block;
  position: relative;
  z-index: 10;
`;

const StyledSpanBackground = styled(motion.span)`
  position: absolute;
  inset: 0;
  border-radius: 8px;
  z-index: 0;
  background-color: ${(props) => (props.isSelected ? "#f0f0f0" : "transparent")};

`;

const StyledSideNav = styled.nav`
  width: 100%;
  margin-top: 19px;
  margin-left: 20px;
  margin-right: 20px;
  padding: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;

  @media (max-width: 951px) {
    margin: 0;
    background-color: #2E4146;
    position: fixed;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    height: auto;
    bottom: 0;
    width: 100%;
  }
`;
const TooltipText = styled.span`
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  background: transparent;
  color: #B3BAAE;
  padding: 4px;
  border-radius: 4px;
  font-size: 14px;
`;

export default IconSideNav;
