# XML to Tweet parser for jQeury

xmlTweet was created due to the limitations of the Twitter API with static web pages (such as those hosted on Amazon S3).

Instead of using the Twitter API, xmlTweet generates the necessary tags from a XML document. This means no PHP file is required.

# How to use

xmlTweet is actually very simple to use. Just include jQuery in your document before the xmlTweet.jquery.js file.

```
<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<script src="xmlTweet.jquery.js"></script>
```

Put a placeholder element into your HTML

```
<div class="tweets">

</div>
```

And call the xmlTweet function on your placeholder

```
<script>
    var template = '<div class="tweets--tweet"><div class="profile_pic"><img class="img-circle" src="{{avatar_src}}"></div><div class="content"> <span class="user tag">{{screen_name}}</span> <span class="user_name">{{user_name}}</span> <p class="tweet-body">{{tweet_body}}</p> <span class="date">{{date}}</span></div></div>';

    $('.tweets').xmlTweet({
        xmlFile: './feed.xml', // Path to your XML file
        template: template // The template that you want the XML data to be injected into
    });
</script>
```

# Options

xmlTweet is still in it's infancy. Right now it only has 2 options:

xmlFile: The path to your XML file

template: The template that you want the XML data to be injected into

# Templates

A template is the HTML that xmlTweet will inject your XML data into and then loop through. Templates are defined by using standard HTML with double curly braces around the injectable tags.

For example: `<div class="profile_pic"><img class="img-circle" src="{{avatar_src}}"></div>`

The usable tags are as follows:

__{{avatar_src}}__      - The link to the users profile picture

__{{screen_name}]__     - The users twitter name prepended by a __@__

__{{user_name}}__       - The users actual name

__{{tweet_body}}__      - The body of the tweet. Hashtags, mentions, and links will be automatically parsed.

__{{date}}__            - The date the tweet was posted

# XML File Structure

The structure of the XML file is very important. If it isn't layed out right the tweets wont be parsed.

Here is an example file:

```
<xml version="1.0">
  <tweets>

    <tweet>
      <screen_name>@Paramore</screen_name>
      <user_name>Paramore</user_name>
      <avatar_src>https://pbs.twimg.com/profile_images/581568869099274240/JDAj9I1n.jpg</avatar_src>
      <tweet_body>We're in Louisville tonight for #WritingTheFuture. A few tickets are still available at http://bit.ly/paramore-512</tweet_body>
      <date>April 29, 2015</date>
    </tweet>

    <tweet>
      <screen_name>@AWOLNation</screen_name>
      <user_name>Awol Nation</user_name>
      <avatar_src>https://pbs.twimg.com/profile_images/559761107091329024/98qeYWlt.jpeg</avatar_src>
      <tweet_body>Our new album, 'RUN', is available now on @iTunesMusic! So excited to share these songs w/you: http://smarturl.it/AWOLRun  </tweet_body>
      <date>April 29, 2015</date>
    </tweet>

  </tweets>
</xml>
```