//Principal components
import React, { Component } from 'react';
import { connect } from 'react-redux';
//Resources
import { getCategories } from '../actions/index';
//Design
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

class CategoriesScreen extends Component {
  componentDidMount() {
    this.props.getCategories(true);
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.props.categories.principalCategory) {
        let id = this.props.categories.principalCategory.idParent;
        let level = this.props.categories.principalCategory.level_depth;
        if (id && level > 2) {
          this.props.getCategories(false, id);
        } else {
          this.props.getCategories(true);
        }
      }
      return true;
    });
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  render() {
    if (this.props.categories.principalCategory != null) {
      return (
        <View>
          <Tile
            imageSrc={require('../resources/banner.png')}
            title={this.props.categories.principalCategory.name}
            containerStyle={{ height: 220 }}
          />
          <List
            title="Child Categories"
            containerStyle={{
              marginBottom: 0,
              marginTop: 0,
            }}>
            <ListItem
              key="0"
              title="Ver productos"
              subtitle="Ver todos los productos de esta categoria"
              containerStyle={{
                borderBottomColor: colors.GRAY_200,
                backgroundColor: colors.GRAY_100,
              }}
              rightIcon={{
                color: colors.GRAY_500,
              }}
              onPress={() => {
                this.props.navigation.navigate('Products', {
                  idCategory: this.props.categories.principalCategory.id,
                });
              }}
            />
            {this.props.categories.childCategories
              ? <ScrollView>
                  {this.props.categories.childCategories.map(l =>
                    <ListItem
                      key={l.id}
                      title={l.name}
                      subtitle={l.description}
                      containerStyle={{
                        borderBottomColor: colors.GRAY_200,
                        backgroundColor: colors.GRAY_100,
                      }}
                      rightIcon={{
                        color: colors.GRAY_500,
                      }}
                      onPress={() => {
                        this.props.getCategories(false, l.id);
                      }}
                    />
                  )}
                </ScrollView>
              : null}
          </List>
        </View>
      );
    } else if (this.props.categories.childCategories != null) {
      return (
        <List
          containerStyle={{
            marginBottom: 0,
            marginTop: 0,
          }}>
          <ScrollView>
            {this.props.categories.childCategories.map(l =>
              <ListItem
                key={l.id}
                title={l.name}
                subtitle={l.description}
                containerStyle={{
                  borderBottomColor: colors.GRAY_200,
                  backgroundColor: colors.GRAY_100,
                }}
                rightIcon={{
                  color: colors.GRAY_500,
                }}
                onPress={() => {
                  this.props.getCategories(false, l.id);
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
  categories: state.Api.categories,
});

const mapDispatchToProps = {
  getCategories: getCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesScreen);
