import { Stepper, Step, StepLabel } from '@mui/material';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import StyledTypography from '@containers/common/StyledTypography';

import { steps } from './data';
import { StyledLine, StyledLink } from './styled';

const MyStepper = () => {
  return (
    <Stack maxWidth="500px" p="40px 20px">
      <Stepper activeStep={2} orientation="vertical" connector={<StyledLine />}>
        {steps.map(({ icon, text, time, path }) => (
          <Step key={text} sx={{ width: '100%', display: 'flex', alignItems: 'flex-start' }}>
            <StepLabel StepIconComponent={icon}>
              <Stack width="100%">
                <StyledTypography variant="h6">{time}</StyledTypography>
                <Typography variant="h9">{text}</Typography>
                { path && (<StyledLink variant="body3" href={path}>See On Map</StyledLink>)}
              </Stack>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
};

export default MyStepper;
