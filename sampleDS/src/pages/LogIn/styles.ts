import { Theme } from '@naturacosmeticos/natds-rn';
import styled from 'styled-components/native';

type Sizes = 'small' | 'medium' | 'large';
interface BaseStyleProps {
  theme: Theme;
}

type BoxStyleProps = BaseStyleProps & {
  size?: Sizes;
};

type ContainerStyleProps = BaseStyleProps;

export const Container = styled.View(({ theme }: ContainerStyleProps) => ({
  backgroundColor: theme.color.surface,
  height: '100%',
  paddingTop: theme.size.semi,
  paddingHorizontal: theme.size.tiny,
}));

export const Box = styled.View<BoxStyleProps>(
  ({ theme, size = 'small' }: BoxStyleProps) => ({
    marginBottom: theme.size[size],
  }),
);
