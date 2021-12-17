import React, { useState } from 'react';
import { Button, Checkbox, Link, TextField } from '@naturacosmeticos/natds-rn';
import { SafeAreaView, View } from 'react-native';

import * as S from './styles';

export function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [memorize, setMemorize] = useState(false);

  return (
    <SafeAreaView>
      <S.Container>
        <S.Box>
          <TextField
            label="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
            returnKeyType="next"
          />
        </S.Box>
        <S.Box>
          <TextField
            label="Senha"
            type="password"
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </S.Box>
        <S.Box>
          <Checkbox
            label="Memorizar senha"
            onPress={() => setMemorize(!memorize)}
            selected={memorize}
          />
        </S.Box>
        <S.Box>
          <S.Box size="large">
            <Button
              type="contained"
              size="medium"
              onPress={() => {}}
              text="Login"
            />
          </S.Box>
          <Button
            type="outlined"
            size="medium"
            onPress={() => {}}
            text="criar conta"
          />
        </S.Box>
        <View style={{ alignItems: 'center' }}>
          <Link onPress={() => {}} type="underline">
            Esqueceu sua senha?
          </Link>
        </View>
      </S.Container>
    </SafeAreaView>
  );
}
