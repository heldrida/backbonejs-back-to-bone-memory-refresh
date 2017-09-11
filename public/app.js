// Backbone Model
const Blog = Backbone.Model.extend({
  defaults: {
    author: '',
    title: '',
    url: ''
  }
})

// Backbone Collection

const Blogs = Backbone.Collection.extend({})

// two Blog instance

const blog1 = new Blog({
  author: 'Jordan',
  title: 'Jordan\'s Blog',
  url: 'http://jordanblog.com'
})

const blog2 = new Blog({
  author: 'Peter',
  title: 'Peter\'s Blog',
  url: 'http://peterblog.com'
})

// instance collection

const blogs = new Blogs([blog1, blog2])
