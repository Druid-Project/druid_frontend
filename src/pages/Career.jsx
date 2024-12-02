import React from "react";
import styled from "styled-components";
import careerImage from "../assets/img/Career-image.jpg"; 

const Career = () => {
  return (
    <CareerWrapper>
      <Hero>
        <MainCircle>
          <Title>For developers by developers</Title>
          <SmallCircle>
            <p>Make the world more functional with every line of code.</p>
          </SmallCircle>
          <ButtonContainer>
            <Button>Contact</Button>
            <Button>Join</Button>
          </ButtonContainer>
        </MainCircle>
      </Hero>

      <ContentSection>
        <SectionTitle>Perks of Working at Druid</SectionTitle>
        <PerksList>
          <PerkItem>
            <PerkLabel>Flexible Hours:</PerkLabel>
            Set your schedule within agreed guidelines to balance work and life.
          </PerkItem>
          <PerkItem>
            <PerkLabel>Team Meetups:</PerkLabel>
            Annual cabin week and monthly office days for connection.
          </PerkItem>
          <PerkItem>
            <PerkLabel>Chill, Transparent Vibes:</PerkLabel>
            Collaboration and openness are in our DNA.
          </PerkItem>
          <PerkItem>
            <PerkLabel>Hybrid Work:</PerkLabel>
            Work remotely across Finland or enjoy office days in Helsinki.
          </PerkItem>
          <PerkItem>
            <PerkLabel>Pasila Office Perks:</PerkLabel>
            Office with a pool, sauna, gym, snacks, and more.
          </PerkItem>
          <PerkItem>
            <PerkLabel>Learning Support:</PerkLabel>
            Courses, certifications—grow your skills your way.
          </PerkItem>
          <PerkItem>
            <PerkLabel>Events & Conferences:</PerkLabel>
            Join meetups and workshops to level up and connect.
          </PerkItem>
        </PerksList>

        <JoinSection>
          <h2>Join us. From anywhere in Finland.</h2>
          <JobsList>
            <JobItem>
              <JobTitle>Open application - Trainee and internship possibilities from January 2025</JobTitle>
              <JobLocation>Helsinki</JobLocation>
            </JobItem>
            <JobItem>
              <JobTitle>Ohjelmistokehittäjä (Drupal)</JobTitle>
              <JobLocation>Helsinki · Hybrid Remote</JobLocation>
            </JobItem>
            <JobItem>
              <JobTitle>Freelancers/subcontractors - join our network</JobTitle>
              <JobLocation>Helsinki · Hybrid Remote</JobLocation>
            </JobItem>
            <JobItem>
              <JobTitle>Open application for Druid</JobTitle>
              <JobLocation>Helsinki · Hybrid Remote</JobLocation>
            </JobItem>
          </JobsList>
          <AllJobsButton>All jobs</AllJobsButton>
        </JoinSection>
      </ContentSection>
    </CareerWrapper>
  );
};

const CareerWrapper = styled.div`
  width: 100%;
`;

const Hero = styled.section`
  height: 100vh; 
  display: flex;
  align-items: center; 
  justify-content: center; 
  padding: 0 20px;
  background-image: url(${careerImage});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const MainCircle = styled.div`
  width: 600px; 
  height: 600px;
  background: rgba(255, 255, 255, 0.1); 
  border-radius: 50%; 
  position: relative; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  transform: translateX(2%);
`;

const Title = styled.h1`
  position: absolute;
  top: 22%; 
  left: 52%; 
  transform: translate(-50%, -50%); 
  font-size: 28px;
  text-align: center;
  color: #000;
`;

const SmallCircle = styled.div`
  width: 200px; 
  height: 200px;
  background: rgba(255, 255, 255, 0.5); 
  border-radius: 50%; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  position: absolute;
  top: 50%; 
  left: 54%; 
  transform: translate(-50%, -50%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  p {
    text-align: center;
    font-size: 16px; 
    color: #333;
    margin: 0;
    padding: 0 10px;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 20%; 
  left: 52%; 
  transform: translateX(-50%); 
  display: flex;
  gap: 20px;
  justify-content: center;
`;

const Button = styled.button`
  background-color: #d84315;
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

const ContentSection = styled.section`
  max-width: 800px;
  margin: 0 auto;
  padding: 80px 20px;
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  color: #000;
  margin-bottom: 40px;
`;

const PerksList = styled.div`
  margin-bottom: 80px;
`;

const PerkItem = styled.div`
  margin-bottom: 20px;
`;

const PerkLabel = styled.span`
  color: #d84315;
  font-weight: 500;
`;

const JoinSection = styled.div`
  text-align: center;
  margin-top: 100px;

  h2 {
    font-size: 36px;
    color: #000;
    margin-bottom: 60px;
  }
`;

const JobsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 40px;
`;

const JobItem = styled.div`
  text-align: center;
  padding: 20px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const JobTitle = styled.h3`
  color: #d84315;
  font-size: 18px;
`;

const JobLocation = styled.p`
  color: #666;
  font-size: 14px;
`;

const AllJobsButton = styled.button`
  background-color: #d84315;
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

export default Career;
