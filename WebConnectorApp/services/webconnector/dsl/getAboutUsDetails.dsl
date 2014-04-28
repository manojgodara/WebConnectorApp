#Enter your input statements here

url `http://www.kony.com/about `get

-----
#Enter your output statements here

record `aboutUs `//:section[@class="container clearfix"]//:div[@class="grid layer layer_alt"]
	field `header `.//:div[@class="benefit-hd"]//:h2
	field `content `.//:div[@class="benefit-bd wysiwyg featuredContent-bd"]
	field `img `.//:div[@class="modalAnchor"]//:a[@class="fancybox"]//@href
#End of scraper DSL file
