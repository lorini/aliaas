ALiaaS
======

Description
-----------

ALiaaS is an multi-protocol home automation project. It will considerate each house's element as a service provider. More information (in french) at http://www.aliaas.fr/

Technologies
------------

At this point, ALiaaS uses : 
 - HTML5/CSS UI based on twitter bootstrap/jQuery/jQuery-UI 
 - Node.js proxy and observator
 - C++ linux daemon

The goal is to use only one technologie on the server side. Node.js ? 

Installation
============

Install node.js
---------------

### Debian or Ubuntu
```
apt-get install node  
```


Install ALiaaS 
--------------

### With Git

```
git clone git@github.com:lorini/aliaas.git
cd aliaas
npm install
node app
```

### Direct download 

```
wget https://github.com/lorini/aliaas/zipball/master
unzip aliaas*
cd aliaas*
npm install 
node app
```

Test
----

Visit `http://localhost:3000`


Contact
=======

Gulian : [@gulian](http://twitter.com/gulian), [github-aliaas@gulian.fr](github-aliaas@gulian.fr) 

Copyright and License
=====================

Copyright
---------

**Copyright © 2012 CPE Lyon**

ALiaaS has been created within CPE Lyon project by F. Jumel and G. Lorini. CPE Lyon is a computing and chemistry engineer school based in Lyon, France. For more informations please visit [the official website](http://www.cpe.fr).

License
-------

**ALiaaS is under The MIT License (MIT)**

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
