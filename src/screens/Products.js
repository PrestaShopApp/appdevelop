import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getProducts } from '../actions/api';

import styled from 'styled-components/native';
import { ScrollView, BackHandler, ActivityIndicator, View } from 'react-native';
import { Text, List, ListItem, Tile } from 'react-native-elements';
import { colors } from '../utils/constants';

const ContainerView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

const TitleText = styled.Text`
  fontSize: 30;
  color: ${props => props.theme.WHITE};
`;

class ProductsScreen extends Component {
  componentDidMount() {
    const { navigation } = this.props;
    const idCategory = navigation.getParam('idCategory', null);
    this.props.getProducts(idCategory);
  }
  render() {
    if (this.props.products != null) {
      return (
        <List
          containerStyle={{
            marginBottom: 0,
            marginTop: 0,
          }}>
          <ScrollView>
            {this.props.products.map(l =>
              <ListItem
                key={l.id}
                title={l.name}
                subtitle={l.price}
                avatar={{
                  uri: 'https://prestashopappmobile.es/api/images/products/1/1',
                }}
                containerStyle={{
                  borderBottomColor: colors.GRAY_200,
                  backgroundColor: colors.GRAY_100,
                }}
                rightIcon={{
                  color: colors.GRAY_500,
                }}
                onPress={() => {
                  // this.props.getCategories(false, l.id);
                }}
              />
            )}
          </ScrollView>
        </List>
      );
    } else {
      return (
        <ContainerView>
          <ActivityIndicator size="large" color={colors.GRAY_900} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
