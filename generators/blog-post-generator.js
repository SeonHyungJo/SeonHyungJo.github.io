const { inputRequired } = require('./utils');

const tabList = [
  {
    'type': 'post',
    'path': '/post',
    'name': 'Post',
  },
  {
    'type': 'article',
    'path': '/article',
    'name': 'Article',
  },
]

module.exports = plop => {
  plop.setGenerator('blog post', {
    prompts: [
      {
        type: 'input',
        name: 'title',
        message: 'Blog post title?',
        validate: inputRequired('title'),
      },
      {
        type: 'list',
        name: 'postType',
        message: 'The type of blog post?',
        choices: tabList.map(tab => ({ name: tab.type, value: tab.type })),
      },
      {
        type: 'input',
        name: 'tags',
        message: 'tags? (separate with coma)',
      },
    ],
    actions: data => {
      data.createdDate = new Date().toISOString().split('T')[0];
      data.path = data.createdDate + '--' + data.title

      if (data.tags) {
        data.tags = `\ntags: [${data.tags.split(',')}]`;
      } else{
        data.tags = `\ntags: []`
      }

      return [
        {
          type: 'add',
          path: '../contents/{{postType}}s/{{path}}/index.md',
          templateFile: 'templates/blog-post-md.template',
        },
      ];
    },
  });
};
