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

/*
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
*/

// instance collection

const blogs = new Blogs()

// Backbone views

// Backbone view for one blog

const BlogView = Backbone.View.extend({
  model: new Blog(),
  tagName: 'tr',
  initialize: function () {
    this.template = _.template($('.blogs-list-template').html())
  },
  events: {
    'click .edit-blog': 'edit',
    'click .update-blog': 'update',
    'click .cancel': 'cancel',
    'click .delete-blog': 'delete'
  },
  edit: function () {
    $('.edit-blog').hide()
    $('.delete-blog').hide()
    this.$('.update-blog').show()
    this.$('.cancel').show()
    const author = this.$('.author').html()
    const title = this.$('.title').html()
    const url = this.$('.url').html()

    this.$('.author').html('<input type="text" class="form-control author-update" value=' + author + '>')
    this.$('.title').html('<input type="text" class="form-control title-update" value=' + title + '>')
    this.$('.url').html('<input type="text" class="form-control url-update" value=' + url + '>')
  },
  cancel: function () {
    blogsView.render()
  },
  delete: function () {
    this.model.destroy()
  },
  update: function () {
    this.model.set('author', $('.author-update').val())
    this.model.set('title', $('.title-update').val())
    this.model.set('url', $('.url-update').val())
  },
  render: function () {
    this.$el.html(this.template(this.model.toJSON()))
    return this
  }
})

// Backbone view for all blogs

const BlogsView = Backbone.View.extend({
  model: blogs,
  el: $('.blogs-list'),
  initialize: function () {
    const self = this
    this.model.on('add', this.render, this)
    this.model.on('change', function () {
      setTimeout(() => {
        self.render()
      }, 100)
    }, this)
    this.model.on('remove', this.render, this)
  },
  render: function () {
    var self = this
    this.$el.html('')
    _.each(this.model.toArray(), function (blog) {
      self.$el.append((new BlogView({model: blog})).render().$el)
    })
    return this
  }
})

const blogsView = new BlogsView()

$(document).ready(function () {
  $('.add-blog').on('click', function () {
    let blog = new Blog({
      author: $('.author-input').val(),
      title: $('.title-input').val(),
      url: $('.url-input').val()
    })
    $('.author-input').val('')
    $('.title-input').val('')
    $('.url-input').val('')
    blogs.add(blog)
  })
})

console.log('foobar!')
