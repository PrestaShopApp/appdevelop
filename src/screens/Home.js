import React, { Component } from "react";
import styled from "styled-components/native";
// import { State } from "react-native-gesture-handler";
//Redux
import { connect } from "react-redux";
import { getProducts } from "../actions/index";
//Components
import { Button } from "../components/Button";
import { Text, List, ListItem } from "react-native-elements";

const ContainerView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

const TitleText = styled.Text`
  fontSize: 30;
  color: ${props => props.theme.GRAY_100};
`;

class HomeScreen extends React.Component {
  componentDidMount() {
    // this.props.getProducts();
  }
  render() {
    // const { loading, products } = this.props;
    const list = {
      title: "Appointments",
      icon: "av-timer",
    };
    if (this.props.products != null) {
      return (
        <ContainerView>
          <TitleText>Inicio</TitleText>
          {/* <List>
            {this.props.products.map(l =>
              <ListItem
                key={l.id}
                title={`${l.name}`}
                leftIcon={{ name: "av-timer" }}
              />
            )}
          </List> */}
        </ContainerView>
      );
    } else {
      return (
        <ContainerView>
          <TitleText>Inicio</TitleText>
          <Text h1>Productos</Text>
          {/* <Button
            text="Obtener productos"
            onPress={() => console.log(getProducts())}
          /> */}
        </ContainerView>
      );
    }
  }
}

const mapStateToProps = state => ({
  loading: state.Api.loading,
  products: state.Api.products,
});

const mapDispatchToProps = {
  getProducts: getProducts,
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
