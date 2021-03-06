import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { FormattedWrapper, FormattedMessage } from 'react-native-globalize';

import { Button } from '../components';
import { ImageBackground } from 'react-native';

import messages from '../Messages';

const ContainerView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

const TitleText = styled.Text`
  fontSize: 30;
  color: ${props => props.theme.GRAY_900};
`;

const ButtonContainer = styled.View`top: 100;`;
class WelcomeScreen extends Component {
  render() {
    return (
      <FormattedWrapper
        locale={this.props.curState.Language.language}
        messages={messages}>
        <ImageBackground
          source={require('../resources/backgroundLogin.jpg')}
          style={{ width: '100%', height: '100%' }}>
          <ContainerView>
            <TitleText>
              <FormattedMessage message="Welcome" />
            </TitleText>
            <ButtonContainer>
              <Button
                text="Go to main"
                onPress={() => this.props.navigation.navigate('Main')}
              />
            </ButtonContainer>
          </ContainerView>
        </ImageBackground>
      </FormattedWrapper>
    );
  }
}

const mapStateToProps = state => ({
  curState: state,
});

export default connect(mapStateToProps, {})(WelcomeScreen);
