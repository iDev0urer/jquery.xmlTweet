/*!
 * xmlTweet jQuery Plugin
 * Original author: @iDev0urer
 * Licensed under the MIT license
 */

;(function ( $, window, document, undefined ) {

        // Create the defaults
        var pluginName = 'xmlTweet',
            defaults = {
                xmlFile: './assets/feed.xml',
                template: ''
            }

        function Plugin( element, options ) {
            this.element = element;

            // jQuery has an extend method that merges the 
            // contents of two or more objects, storing the 
            // result in the first object. The first object 
            // is generally empty because we don't want to alter 
            // the default options for future instances of the plugin
            this.options = $.extend( {}, defaults, options) ;

            this._defaults = defaults;
            this._name = pluginName;

            this.init();
        }

        Plugin.prototype.init = function () {


        var options = this.options;
        var self = this.element;

        $.ajax({
            url: options.xmlFile, // name of file you want to parse
            dataType: "xml", // type of file you are trying to read
            success: buildTweets, // name of the function to call upon success
            error: function (err) {

            }
        });

        var tweets = [];

        function buildTweets(xml) {
			var tweetObj;
            xml = $(xml);
            tweetObj = xml.find('tweet');

            tweetObj.each(function () {
                var linkExp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

                var screen_name = $(this).find('screen_name').text();
                var user_name = $(this).find('user_name').text();
                var avatar_src = $(this).find('avatar_src').text();
                var tweet_body = $(this).find('tweet_body').text();
                var date = $(this).find('date').text();

                screen_name = screen_name.replace(/@(\S*)/g, '<a href="http://twitter.com/$1">\@$1</a>');

                tweet_body = tweet_body.replace(/#(\S*)/g, '<a href="http://twitter.com/#!/search/\#$1">\#$1</a>');
                tweet_body = tweet_body.replace(/@(\S*)/g, '<a href="http://twitter.com/$1">\@$1</a>');
                tweet_body = tweet_body.replace(linkExp,"<a href='$1' target='_blank'>$1</a>");

                var template = options.template;

                template = template.replace('{{screen_name}}', screen_name);
                template = template.replace('{{user_name}}', user_name);
                template = template.replace('{{avatar_src}}', avatar_src);
                template = template.replace('{{tweet_body}}', tweet_body);
                template = template.replace('{{date}}', date);


                tweets.push(template);

            });

            var count = tweets.length;
            $(self).html('');

            for (var i = 0; i < count; i++) {
                $(self).append(tweets[i]);
            }

        }


        };

        // A really lightweight plugin wrapper around the constructor,
        // preventing against multiple instantiations
        $.fn[pluginName] = function ( options ) {
            return this.each(function () {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, 
                    new Plugin( this, options ));
                }
            });
        }

})( jQuery, window, document );