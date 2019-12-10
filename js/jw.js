var jw = new Vue({
  el: '#jw',
  data: {
    blogs: [],
    year_loaded: {},
    reading_blogs: [
      '2019-10-27',
      '2019-09-10'
    ]
  },
  mounted: function(){
    var year;
    for (year = 2020; year > 2012; year--) this.year_loaded[year.toString()] = false;
    this.loadJsonFiles(2019);
  },
  methods: {
    loadJsonFiles: function (year) {
      if (!this.year_loaded[year.toString()]) {
        $.getJSON('https://wj.wj9.ca/json/' + year.toString() + '.json', function (data) {
          data.forEach( function (blog) {    
            jw.blogs.push(blog);
          });
        });
        this.year_loaded[year.toString()] = true;
      }
    },
    gotoLoadedYear: function (year) {
      this.loadJsonFiles(year);      
      document.location = '#' + year.toString();
    },
    classLoadedYear: function (year) {
      return (this.year_loaded[year.toString()] ? 'w3-white' : 'w3-grey');
    },
    blogIndexID: function (index) {
      if ((index == 0) || (index < this.blogs.length && this.blogs[index].publishedAt.substring(0, 4) != this.blogs[index - 1].publishedAt.substring(0, 4))) return this.blogs[index].publishedAt.substring(0, 4);
      return '';
    },
    blogBody: function (blog) {
      var blog_body = "";
      blog.body.forEach( function(line) {
        blog_body += line.replace("<jw-img", "<img style='width:100%'").replace("data-pa-", "src='https://cdn").replace("='jw/", ".picsart.com/") + "<br />";
        //blog_body += line.replace("<jw-img", "<img style='width:100%'").replace("data-pi='", "src='https://i.pinimg.com/originals/") + "<br />";
      });
      return blog_body;
    },
    blogReading: function (blog) {
      if (!this.reading_blogs.includes(blog.publishedAt)) this.reading_blogs.push(blog.publishedAt);
    },
    scrollPageTop: function () {
      $('html, body').animate({scrollTop: 0}, 'fast');
    },
    scrollPageBottom: function () {
      $('html, body').animate({scrollTop: document.body.scrollHeight}, 'fast');
    }
  },
  computed: {
    classLocationHostJFan: function () {
      return {
        'w3-disabled': window.location.host.toLowerCase().endsWith('jfan.ca')
      }
    },
    classLocationHostWZhao: function () {
      return {
        'w3-disabled': window.location.host.toLowerCase().endsWith('wzhao.ca')
      }
    }
  }
});
