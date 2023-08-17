import { memo } from 'react';

import StyledDatePicker from '@containers/common/DatePicker';
import { FormProvider, useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';

const OpenJobs = () => {
  const methods = useForm();

  const { handleSubmit } = methods;

  // TODO: Add logic
  const onSubmit = (data: any) => {
    console.log('data****', data);
  };

  return (
    <>
      Open Jobs Testing
      <FormProvider {...methods}>
        <Stack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
        >
          <StyledDatePicker width="153px" name="dateFrom" />
        </Stack>
        <div style={{ background: '#f0f0f0' }}>
          What is your favorite day? Lorem ipsum dolor,
          sit amet consectetur adipisicing elit. Debitis est quibusdam possimus animi sint ullam!
          Hic quasi suscipit error. Soluta, aut magnam aspernatur deleniti, unde voluptates animi
          placeat voluptatibus enim temporibus tempora et cumque qui. Exercitationem
          sunt officiis cum reiciendis veniam minima impedit libero unde atque cupiditate
          accusantium molestiae enim neque repellendus voluptatum modi quidem necessitatibus sint,
          voluptatibus nemo sapiente blanditiis. Laboriosam, quo! Explicabo consectetur exercitationem
          tenetur aperiam sit! Dolores, praesentium commodi cupiditate iste optio exercitationem quod
          sed recusandae aspernatur nam quasi, a id deserunt ratione maiores repellendus
          quaerat quos tempora maxime minima enim ad animi ab accusamus! Incidunt, rerum?
          What is your favorite day? Lorem ipsum dolor,
          sit amet consectetur adipisicing elit. Debitis est quibusdam possimus animi sint ullam!
          Hic quasi suscipit error. Soluta, aut magnam aspernatur deleniti, unde voluptates animi
          placeat voluptatibus enim temporibus tempora et cumque qui. Exercitationem
          sunt officiis cum reiciendis veniam minima impedit libero unde atque cupiditate
          accusantium molestiae enim neque repellendus voluptatum modi quidem necessitatibus sint,
          voluptatibus nemo sapiente blanditiis. Laboriosam, quo! Explicabo consectetur exercitationem
          tenetur aperiam sit! Dolores, praesentium commodi cupiditate iste optio exercitationem quod
          sed recusandae aspernatur nam quasi, a id deserunt ratione maiores repellendus
          quaerat quos tempora maxime minima enim ad animi ab accusamus! Incidunt, rerum?
          sed recusandae aspernatur nam quasi, a id deserunt ratione maiores repellendus
          quaerat quos tempora maxime minima enim ad animi ab accusamus! Incidunt, rerum?
          What is your favorite day? Lorem ipsum dolor,
          sit amet consectetur adipisicing elit. Debitis est quibusdam possimus animi sint ullam!
          Hic quasi suscipit error. Soluta, aut magnam aspernatur deleniti, unde voluptates animi
          placeat voluptatibus enim temporibus tempora et cumque qui. Exercitationem
          sunt officiis cum reiciendis veniam minima impedit libero unde atque cupiditate
          accusantium molestiae enim neque repellendus voluptatum modi quidem necessitatibus sint,
          voluptatibus nemo sapiente blanditiis. Laboriosam, quo! Explicabo consectetur exercitationem
          tenetur aperiam sit! Dolores, praesentium commodi cupiditate iste optio exercitationem quod
          sed recusandae aspernatur nam quasi, a id deserunt ratione maiores repellendus
          quaerat quos tempora maxime minima enim ad animi ab accusamus! Incidunt, rerum?
        </div>
      </FormProvider>
    </>
  );
};

export default memo(OpenJobs);
