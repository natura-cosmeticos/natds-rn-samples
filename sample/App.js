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
          <View key={i} style={styles.iconWrapper}>
            <Icon name={icon} />
            <Caption style={styles.caption}>{icon}</Caption>
          </View>
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
  iconWrapper: {
    margin: 8,
    flexBasis: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  caption: {
    textAlign: 'center',
  },
});

const Caption = styled.Text`
  ${(props) => props.theme.caption};
`;

export default App;
