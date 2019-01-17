import React from 'react';
import Helmet from 'react-helmet';

import Header from './Header';
import Button from './Button';

import '../css/prism-tomorrow.scss';
import '../css/baseLayout.scss';

export default class Layout extends React.Component {
  constructor() {
    super();

    this.state = {
      navList: [
        // {
        //   path: '/',
        //   name: 'home'
        // },
        {
          path: '/posts',
          name: 'posts'
        },
        {
          path: '/article',
          name: 'article'
        },
        // {
        //   path: '/til',
        //   name: 'til'
        // },
        {
          path: '/tags',
          name: 'category'
        },
        {
          path: '/aboutMe',
          name: 'about me'
        }
      ]
    };
  }

  render() {
    const { location } = this.props;
    const { navList } = this.state;

    return (
      <>
        {/* head custom 진행*/}
        <Helmet
          title="Gatsby for SSEON"
          meta={[
            { name: 'description', content: 'sseon theme' },
            { name: 'keywords', content: 'sseon, blog, theme' },
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1'
            },{
              name: 'google-site-verification',
              content: 'uqsuHdzpL7wVqDf9dit8jnuBvq-FUIYtdxUdD35T2Mo'
            }
          ]}
        >
          {/* 한국어 설정 진행 */}
          <html lang="ko" />
        </Helmet>

        {/* ----------------------------------------------------- */}
        {location.pathname !== "/" && (
          <Header title={`<S/> DevNote`}>
            {navList.map(navItem => {
              return (
                <Button key={navItem.name} to={navItem.path}>{navItem.name.toUpperCase()}</Button>
              );
            }
            )}
          </Header>)}

        {/* ----------------------------------------------------- */}

        <div className="blog-posts-container">{this.props.children}</div>
      </>
    );
  }
}

export const pageQuery = graphql`
  query NavQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { category: { eq: "post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 100)
          id
          frontmatter {
            title
            date(formatString: "YYYY/MM/DD")
            path
          }
        }
      }
    }
  }
`;
