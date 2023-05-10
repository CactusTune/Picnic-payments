import styled from "styled-components";
import { Container } from "react-bootstrap";
import ModalComponent from "../Modal/Modal";

const HeroComponent = styled.header`
  padding: 5rem 0;
  height: 60vh;
  background-image: url("https://images.unsplash.com/photo-1682965636882-30892f3f5565?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80");
  background-size: cover;
  background-position: center;
`;

const HeaderContainer = styled.div`
  background-color: rgb(5, 148, 112);
  padding: 3rem;
  color: white;
  width: 32.5rem;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  margin: 1rem;
`;

const SubHeading = styled.h3`
  margin: 1rem 0;
  font-weight: 400;
`;

const Hero = () => {
  return (
    <HeroComponent>
      <Container>
        <HeaderContainer>
          <Heading>Feed your mind wth the best</Heading>
          <SubHeading>
            Grow, Learn, Visit and become more social by booking your picnics
            with family, friends and Coleagues
          </SubHeading>
          <ModalComponent text="Singup" variant="primary" isSignupFlow={true} />
          <ModalComponent text="Login" variant="danger" isSignupFlow={true}/>
        </HeaderContainer>
      </Container>
    </HeroComponent>
  );
};

export default Hero;
