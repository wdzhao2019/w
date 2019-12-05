var jw = new Vue({
  el: '#jw',
  data: {
    year_loaded: {
      '2019': false,
      '2018': false,
      '2017': false,
      '2016': false,
      '2015': false,
      '2014': false,
      '2013': false
    },
    json_files: [
      '20191117', // 2019
      '20191113',
      '20191111',
      '20191107',
      '20191027',
      '20191021',
      '20191020',
      '20191014',
      '20191009',
      '20191005',
      '20190930',
      '20190929',
      '20190910',
      '20190805',
      '20190721',
      '20190627',
      '20190614',
      '20190602',
      '20190601',
      '20190526',
      '20190430',
      '20190420',
      '20190323',
      '20190205',
      '20190112',
      '20181227', // 2018
      '20181225',
      '20181207',
      '20181117',
      '20181115',
      '20181102',
      '20181030',
      '20181021',
      '20181007',
      '20180930',
      '20180924',
      '20180903',
      '20180818',
      '20180723',
      '20180701',
      '20180618',
      '20180603',
      '20180602',
      '20180531',
      '20180526',
      '20180521',
      '20180513',
      '20180502',
      '20180416',
      '20180401',
      '20180312',
      '20180218',
      '20180128',
      '20180117',
      '20180115',
      '20171201', // 2017
      '20171124',
      '20171029',
      '20171025',
      '20170815',
      '20170811',
      '20170625',
      '20170411',
      '20170409',
      '20161214', // 2016
      '20161119',
      '20161112',
      '20161015',
      '20160604',
      '20160523',
      '20160516',
      '20151203', // 2015
      '20151126',
      '20151125',
      '20151107',
      '20151025',
      '20151024',
      '20151004',
      '20150920',
      '20150919',
      '20150907',
      '20150825',
      '20150816',
      '20150815',
      '20150808',
      '20150806',
      '20150725',
      '20150627',
      '20150525',
      '20150518',
      '20141101', // 2014
      '20141013',
      '20141011',
      '20141007',
      '20140929',
      '20140926',
      '20140914',
      '20140913',
      '20140912',
      '20140907',
      '20140902',
      '20140822',
      '20140621',
      '20140525',
      '20140322',
      '20140220',
      '20131014', // 2013
      '20131005',
      '20130710',
      '20130424',
      '20130214'
    ],
    reading_blogs: [
      '2019-10-27',
      '2019-09-10'
    ],
    blogs: []
  },
  mounted: function(){
    this.loadJsonFiles(2019);
  },
  methods: {
    loadJsonFiles: function (year) {
      if (!this.year_loaded[year.toString()]) {
        for (json_file of this.json_files) {
          if (json_file.startsWith(year.toString())) {
            $.getJSON('https://wj.wj9.ca/json/' + json_file + '.json',function(data){jw.blogs.push(data);});
          }
        }
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
        blog_body += line.replace("<jw-img", "<img style='width:100%'").replace("data-pi='", "src='https://i.pinimg.com/originals/") + "<br />";
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
