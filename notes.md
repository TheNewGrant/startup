# CS 260 Notes

This file represents what I have learned about web programming. And truly, I can say that I love web programming!

> _Whatever I put in here can be used for the midterm and final_, so I need to be updating this often with my insights! My game plan for this is to note any useful keywords from HTML, CSS, Javascript and so on that I think I'll want to remember for my startup project, but I will also write down useful notes and commands for git and other topics covered in the course.

> Here is a link to the markdown [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) for reference.

- [My startup](https://startup.cs260.click)
- [My simon](https://simon.cs260.click)

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

## HTML

Interesting things I have learned about HTML

## React

Interesting things I have learned about React
