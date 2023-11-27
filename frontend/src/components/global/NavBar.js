import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from 'styled-components';
import {
    GiAxolotl,
    GiLightBackpack,
    GiTicket,
    GiHexagonalNut,
    GiHearts,
} from "react-icons/gi";

const IconSideNavContainer = styled.div`
  display: flex;
`;

const IconSideNavContent = styled.div`
background-color: #1F2626;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

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

    return (
        <StyledSideNav>
            {/* Temp logo from https://logoipsum.com/ */}
            <NavItem selected={selected === 0} id={0} setSelected={setSelected} to="/">
                <GiAxolotl />
            </NavItem>
            <NavItem selected={selected === 1} id={1} setSelected={setSelected} to="/discover">
                <GiLightBackpack />
            </NavItem>
            <NavItem selected={selected === 2} id={2} setSelected={setSelected} to="/news">
                <GiTicket />
            </NavItem>
            <NavItem selected={selected === 3} id={3} setSelected={setSelected} to="/settings">
                <GiHexagonalNut />
            </NavItem>
            <NavItem selected={selected === 4} id={4} setSelected={setSelected} to="/favourites">
                <GiHearts />
            </NavItem>
        </StyledSideNav>
    );
};


const StyledSideNav = styled.nav`
  width: 100%;
  padding: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2;

  @media (max-width: 768px) {
    background-color: #2E4146;
    position: fixed;
    flex-direction: row;
    justify-content: space-around;
    height: auto;
    bottom: 0;
    width: 100%;
  }
`;

//Sisältää sen violetin >:(

const NavItem = ({ children, selected, id, setSelected, to }) => {
    return (
        <Link to={to}>
            <StyledButton
                onClick={() => setSelected(id)}
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.95 }}
            >
                <StyledSpan>{children}</StyledSpan>
                <AnimatePresence>
                    {selected && (
                        <StyledSpanBackground
                            initial={{ scale: 0 }}
                            animate={{ scale: 0.0 }}
                            exit={{ scale: 0 }}
                        />
                    )}
                </AnimatePresence>
            </StyledButton>
        </Link>
    );
};


//Button size
const StyledButton = styled(motion.button)`
  padding: 10px;
  font-size: 50px;
  background-color: #1F262600;
  color: #B3BAAE;
  border: none;
  cursor: pointer;
  border-radius: 8px;
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
  background-color: #6B46C1;
  z-index: 0;
`;

export default IconSideNav;
