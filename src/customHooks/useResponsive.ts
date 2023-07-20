import { useTheme, Breakpoint } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const useResponsive = (
  query: 'up' | 'down' | 'between',
  start: Breakpoint,
  end?: Breakpoint,
) => {
  const theme = useTheme();

  const mediaUp = useMediaQuery(theme.breakpoints.up(start));
  const mediaDown = useMediaQuery(theme.breakpoints.down(start));
  const mediaBetween = end && useMediaQuery(theme.breakpoints.between(start, end));
  const mediaOnly = useMediaQuery(theme.breakpoints.only(start));

  if (query === 'up') {
    return mediaUp;
  }

  if (query === 'down') {
    return mediaDown;
  }

  if (query === 'between') {
    return mediaBetween;
  }

  return mediaOnly;
};

const useWidth = () => {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();

  return (
    keys.reduce<Breakpoint | null>((output, key) => {
      const matches = useMediaQuery(theme.breakpoints.up(key));

      return !output && matches ? key : output;
    }, null) || 'xs'
  );
};

export default useResponsive;
export { useWidth };
