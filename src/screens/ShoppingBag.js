import React, { Component } from "react";
import styled from "styled-components/native";

const ContainerView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

const TitleText = styled.Text`
  fontSize: 30;
  color: ${props => props.theme.WHITE};
`;

class ShoppingBagScreen extends Component {
  render() {
    return (
      <ContainerView>
        <TitleText>ShoppingBag</TitleText>
      </ContainerView>
    );
  }
}

export default ShoppingBagScreen;
