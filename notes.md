# CS 260 Notes

This file represents what I have learned about web programming. And truly, I can say that I love web programming!

> _Whatever I put in here can be used for the midterm and final_, so I need to be updating this often with my insights! My game plan for this is to note any useful keywords from HTML, CSS, Javascript and so on that I think I'll want to remember for my startup project, but I will also write down useful notes and commands for git and other topics covered in the course.

> Here is a link to the markdown [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) for reference.

- [My startup](https://startup.churchbingo260.click)
- [My simon](https://simon.churchbingo260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

### EC2
Important notes to keep in mind:
  
  My IP address: 3.217.224.89
  
  AWS - EC2 - Instances (to see the computer I connect to for my website)
  
  AWS - EC2 - Network & Security - Elastic IPs (to see the IP I reserved for my website)

```
: ssh -i [key pair file address] ubuntu@[ip address] # Template
: ssh -i MacOS/.../key.pem ubuntu@3.217.224.89    
    # Mostly filled, just change the filepath to the correct key pair
```

### DNS
DNS stands for Domain Name System. It connects IP addresses (computer readable numbers) to domain names (human readable words). When you type a domain name such as [google.com](https://google.com) into your browser, the browser will attempt to find the IP address using the DNS.

### Route53
NS = Name Server; SOA = Start of Authority
With Route53 my server is set up so I can type in:
[churchbingo260.click](http://churchbingo260.click) or [simon.churchbingo260.click](http://simon.churchbingo260.click) and it still works.

Route53 - Hosted Zones - churchbingo260.click - Create Record (lets me specify other subdomains for my server)
Route53 - Domains - Registered Domains (lets me register new domains to use for websites)

### Caddy
Forward Proxy - Hides client - Filtering/Anonymity - Gateway into the internet
Reverse Proxy - Hides server - Balancing loads - Protects traffic from the internet

With the new domain name, I can change how I SSH into the server.
```
: ssh -i MacOS/.../key.pem ubuntu@churchbingo260.click   
    # Mostly filled, just change the filepath to the correct key pair
```

Let's Encrypt changed the game for receiving web certificates for HTTPS access.

## HTML

### Input - Forms

Input Elements are:
 - form
 - fieldset
 - input
 - select
 - optgroup
 - option
 - textarea
 - label
 - output
 - meter

Example form usage:
```<form>
    <label for="learning">Practice Form</label>
    <textarea id="learning" name="learning-id">Input Here</textarea>
    <button type="submit">Submit</button>
    </form>

    <input></input> <!-- Highly customizable -->
```
*name*, *disabled*, *value*, *required* attributes are all common to input tags
You can use the *pattern* attribute to use Regex to validate input and make sure it follows a specific format

### Media

Media elements are:
 - img
 - audio
 - video
 - svg
 - canvas

 Note: Keep URL/file references as relative as possible to prevent breakage

 To embed Youtube videos - you need to use the *iframe* tag
 The *src* attribute is used to add images/audio/videos
 the *canvas* tag needs Javascript to display



 DOM = Document Object Model - This is how the HTML file is parsed and interpreted to make the website
 The DOM works like a system of nodes (think Godot and its node-based structure) and CSS and Javascript manipulates those nodes.


 ### Implementation discoveries
 Use this link: https://api.iconify.design/fluent-emoji-flat/bacon.svg on an image tag to to see an svg from Iconify API. Just change the ```*.svg``` to see a different image (and there are a ton). You can also change ```fluent-emoji-flat``` to one on [This site (Github)](https://github.com/iconify/icon-sets/blob/master/json/fluent-emoji-flat.json) under ```icon-sets/json``` to see even more svgs.

## React

Interesting things I have learned about React
