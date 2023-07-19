import { memo } from 'react';

import StatisicsCard from './StatisicsCard';

const StatisicsSection = () => {
  return (
    <>
      <StatisicsCard />
      <StatisicsCard />
      <StatisicsCard />
    </>
  );
};

export default memo(StatisicsSection);
