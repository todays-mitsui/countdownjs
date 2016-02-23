;(function($) {
  Number.prototype.padding = function(pd, length) {
    return (Array(length).join(pd) + this).slice(-length);
  };

  $.fn.countdown = function(options){
    var defaults = {
      //goal: '2015/01/01 00:00:00'
      digits: 1,
      wrapper: {
        day:    '.day',
        hour:   '.hour',
        minute: '.minute',
        second: '.second',
      },
      text: '期日を過ぎました。', //'ご好評につきキャンペーンは終了しました。'
    };
    var setting = $.extend(defaults, options);

    if (!setting.goal) {
      return this;
    }

    var goal    = new Date(setting.goal);
    var $this   = this;
    var $day    = this.find(setting.wrapper.day);
    var $hour   = this.find(setting.wrapper.hour);
    var $minute = this.find(setting.wrapper.minute);
    var $second = this.find(setting.wrapper.second);

    var remaining = function(diff, s, m, h, d) {
      s = (diff % 60000) / 1000;
      if (!setting.digits) {
        s = ~~s;
        if (s < 10) { s = ' ' + s; }
      } else {
        if (s.toString().indexOf('.') === -1) {
          s = s.padding(' ', 2) + '.' + Array(setting.digits).join('0');
        }
        if (s < 10) { s = ' ' + s; }
        s = ('' + s + Array(setting.digits).join('0')).substring(0,setting.digits+3);
      }

      diff /= 60000;
      m = Math.floor(diff % 60);

      diff /= 60;
      h = Math.floor(diff % 24);

      diff /= 24;
      d = Math.floor(diff);

      $day.text(d);
      $hour.text(h);
      $minute.text(m);
      $second.text(s);
    }

    var intervalID = setInterval(function() {
      var now  = new Date();
      var diff = goal - now;

      if (diff > 0) {
        remaining(diff);
      } else {
        $this.addClass('over').text(setting.text);
        clearInterval(intervalID);
      }
    }, 37);

    return this;
  };
})(jQuery);
