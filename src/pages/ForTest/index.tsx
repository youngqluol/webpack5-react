import { FC } from 'react';
import styled, { keyframes } from 'styled-components';
import Download from '@src/components/Download';

const Component = styled('div')``;

const ForTest: FC = () => {
  return <Component as={Download} text='1111' />;
};

export default ForTest;
