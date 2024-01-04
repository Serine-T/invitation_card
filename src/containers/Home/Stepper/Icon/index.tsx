import { StyledIconBox, StyledImage } from '../styled';

interface IIcon {
  src: string;
}

const Icon = ({ src }:IIcon) => (
  <StyledIconBox>
    <StyledImage src={src} alt="" />
  </StyledIconBox>
);

export default Icon;
