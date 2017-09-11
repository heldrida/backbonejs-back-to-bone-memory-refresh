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

// Backbone views

// Backbone view for one blog

const BlogView = Backbone.View.extend({
  model: new Blog(),
  tagName: 'tr',
  initialize: function () {
    this.template = _.template($('.blogs-list-template').html())
  },
  render: function () {
    this.$el.html(this.template(this.model.toJSON()))
  }
})

// Backbone view for all blogs

const BlogsView = Backbone.View.extend({
  model: blogs,
  el: $('.blogs-list'),
  initialize: function () {
    this.model.on('add', this.render(), this)
  },
  render: function () {
    var self = this
    this.$el.html('')
    _.each(this.model.toArray(), function (blog) {
      this.$el.append((new BlogView({model: blog})).render().$el)
    })
  }
})
