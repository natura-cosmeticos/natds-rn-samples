import React from 'react';
import iconNames from '@naturacosmeticos/natds-icons/dist/natds-icons.json';
import styled from 'styled-components';
import {Icon} from '@naturacosmeticos/natds-rn';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

const App = () => {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        {Object.keys(iconNames).map((icon, i) => (
          <IconWrapper key={i}>
            <Icon name={icon} size="semi" color="highEmphasis" />
            <Caption style={styles.caption}>{icon}</Caption>
          </IconWrapper>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

const Caption = styled.Text`
  ${(props) => props.theme.caption};
  color: ${(props) => props.theme.color.highEmphasis};
  text-align: center;
`;

const IconWrapper = styled.View`
  margin-vertical: ${(props) => props.theme.size.small};
  flex-basis: ${(props) => props.theme.size.hugeXXX};
  justify-content: center;
  align-items: center;
`;

export default App;
