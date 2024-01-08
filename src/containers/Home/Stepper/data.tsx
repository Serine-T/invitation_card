import cake from '@assets/images/cake.png';
import hands from '@assets/images/hands.png';
import dance from '@assets/images/dance.png';
import zags from '@assets/images/zags.png';

import Icon from './Icon';

export const steps = [{
  icon: () => <Icon src={hands} />,
  text: 'Church Ceremony!💍',
  time: '13:30',
  path: 'https://yandex.com/maps/org/141175950094/?ll=44.863637%2C40.141879&z=13.24',
},
{
  icon: () => <Icon src={zags} />,
  text: 'Wedding Ceremony!',
  time: '15:00',
  path: 'https://yandex.com/maps/org/200050986571/?ll=44.483207%2C40.188295&z=17.09',
}, {
  icon: () => <Icon src={dance} />,
  text: 'Let\'s party begin!😎',
  time: '18:00',
  path: 'https://yandex.com/maps/org/76916737047/?ll=44.533809%2C40.192637&z=17.29',

}, {
  icon: () => <Icon src={cake} />,
  text: 'Beddy-bye!😴',
  time: '23:00',
},
];
