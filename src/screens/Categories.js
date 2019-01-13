//Principal components
import React, { Component } from 'react';
import { connect } from 'react-redux';
//Resources
import { getCategories } from '../actions/index';
//Design
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import { Text, List, ListItem } from 'react-native-elements';
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
const list = [
  {
    name: `Amy Farha`,
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President',
  },
  {
    name: 'Chris Jackson2',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
  },
  {
    name: 'Chris Jackson3',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
  },
  {
    name: 'Chris Jackson4',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
  },
  {
    name: 'Chris Jackson5',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
  },
  {
    name: 'Chris Jackson6',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
  },
  {
    name: 'Chris Jackson7',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
  },
  {
    name: 'Chris Jackson8',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
  },
  {
    name: 'Chris Jackson90',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
  },
  {
    name: 'Chris Jackson123',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
  },
  {
    name: 'Chris Jackson321',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
  },
  {
    name: 'Chris Jackson223',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
  },
  {
    name: 'Chris Jackson332',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
  },
];

class CategoriesScreen extends Component {
  componentDidMount() {
    this.props.getCategories(true);
  }
  render() {
    const { loading, categories } = this.props;

    if (this.props.categories.childCategories != null) {
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
                onPress={() => console.log('Has pulsado ', l.name)}
              />
            )}
          </ScrollView>
        </List>
      );
    } else {
      return (
        <ContainerView>
          <Text h1>Cargando categorias</Text>
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
