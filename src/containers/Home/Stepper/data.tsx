import cake from '@assets/images/cake.png';
import hands from '@assets/images/hands.png';
import dance from '@assets/images/dance.png';
import camera from '@assets/images/camera.png';

import Icon from './Icon';

export const steps = [{
  icon: () => <Icon src={hands} />,
  text: 'The church wedding!💍',
  time: '13:30',
  path: '#church',
},
{
  icon: () => <Icon src={camera} />,
  text: 'We\'ll go to Photoshop. You? Hmm...🤔 Maybe have a little rest?',
  time: '15:00',
}, {
  icon: () => <Icon src={dance} />,
  text: 'Let\'s party begin!😎',
  time: '18:00',
  path: '#restaurant',

}, {
  icon: () => <Icon src={cake} />,
  text: 'Beddy-bye!😴',
  time: '23:00',
},
];
