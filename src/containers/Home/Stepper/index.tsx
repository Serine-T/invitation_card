import { Stepper, Step, StepLabel, Box, Stack, Link } from '@mui/material';
import champagne from '@assets/images/champagne.png';
import hands from '@assets/images/hands.png';
import dance from '@assets/images/dance.png';
import camera from '@assets/images/camera.png';
import Typography from '@mui/material/Typography';

const CakeIcon = () => {
  return (
    <Box sx={{ width: 120, height: 120, background: '#88AC7D', borderRadius: '50%' }}>
      <img
        src={champagne}
        alt=""
        style={{
          width: 100, height: 100, borderRadius: '50%', marginLeft: '4px', marginTop: '6px',
        }}
      />
    </Box>
  );
};

const CameraIcon = () => {
  return (
    <Box sx={{ width: 120, height: 120, background: '#88AC7D', borderRadius: '50%' }}>
      <img
        src={camera}
        alt=""
        style={{
          width: 100, height: 100, borderRadius: '50%', marginLeft: '4px', marginTop: '6px',
        }}
      />
    </Box>
  );
};

const HandsIcon = () => {
  return (
    <Box sx={{ width: 120, height: 120, background: '#88AC7D', borderRadius: '50%' }}>
      <img
        src={hands}
        alt=""
        style={{
          width: 100, height: 100, borderRadius: '50%', marginLeft: '4px', marginTop: '6px',
        }}
      />
    </Box>
  );
};

const DanceIcon = () => {
  return (
    <Box sx={{ width: 120, height: 120, background: '#88AC7D', borderRadius: '50%' }}>
      <img
        src={dance}
        alt=""
        style={{
          width: 100, height: 100, borderRadius: '50%', marginLeft: '16px', marginTop: '6px',
        }}
      />
    </Box>
  );
};

const StyledLine = () => {
  return <Box sx={{ height: '100px', width: '1px', background: '#88AC7D' }} />;
};

const steps = [{
  icon: HandsIcon,
  text: 'The church wedding!💍',
  time: '13:30',
  path: '#church',
},
{
  icon: CameraIcon,
  text: 'We\'ll go to Photoshop. You? Hmm...🤔 Maybe have a little rest?',
  time: '13:30',
}, {
  icon: DanceIcon,
  text: 'Let\'s party begin!😎',
  time: '13:30',
  path: '#restaurant',

}, {
  icon: CakeIcon,
  text: 'Beddy-bye!😴',
  time: '13:30',
}];

const MyStepper = () => {
  return (
    <Stack maxWidth="600px">
      <Stepper activeStep={2} orientation="vertical" connector={<StyledLine />}>
        {steps.map(({ icon, text, time, path }) => (
          <Step key={text}>
            <StepLabel
              StepIconComponent={icon}
            >
              <Stack>
                <Typography>{time}</Typography>
                <Typography variant="h8">{text}</Typography>
                { path && (
                <Link
                  color="primary"
                  variant="body3"
                  component="a"
                  href={path}
                  display="display"
                  sx={{ color: '#88AC7D' }}
                >
                  See On Map
                </Link>
                )}

              </Stack>

            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
};

export default MyStepper;
