angular.module('app.factory.business', [])

.service 'BusinessCache', ()->
  _cache = {}
  instance =
    get: (key)->
      result = false
      if _cache[key] then return _cache[key]
      result
    set: (key, obj)->
      _cache[key] = obj
  instance



.factory 'Business', [
  'Restangular'
  (Rest)->
    # Global nearby filter input value
    nearbyFilter = ""
    getByLocation: (data, cb, filter)->
      # if filter then set the global filter to its value
      if filter then nearbyFilter = filter
      # if filter is "empty" set the global filter to ""
      if filter is "empty" then nearbyFilter = ""
      # set the search value on data before sending to the server
      data.val = nearbyFilter
      # url: POST - api/businesses/location
      Rest.all('menus').all('location').post(data).then (result)->
        cb(result, nearbyFilter)

    find: (id)->
      Rest.one('menus', id).get()

]


.service 'ImagesService', ()->
  return {

    get: ->
      return [
        'http://www.listing99.com/images/showcase/1400572578_Dining-512.png',
        'http://www.hindustantimes.com/Images/popup/2012/11/delhi_food_new.jpg',
        'http://www.hindustantimes.com/Images/popup/2012/11/bombay_food.jpg',
        'https://pbs.twimg.com/media/Bcgct8rCMAE7Cvl.png',
        'http://d2ch1jyy91788s.cloudfront.net/dinewise/images/product/7153_CPPkg_10Off-430_430.jpg',
        'http://momadvice.com/blog/wp-content/uploads/2012/06/summer_dinner_inspiration_2.jpg?w=750&mode=max',
        'http://thewifewithaknife.com/wp-content/uploads/2014/04/frittata2.jpg',
        'http://www.surlatable.com/images/customers/c1079/CFA-190675/generated/CFA-190675_Default_1_430x430.jpg',
        'http://www.levyrestaurants.co.uk/uploads/20120203151004.jpg',
        'http://www.timing-design.com/food/eest1-6.jpg',
        'http://www.houseofbarbecue.com/wp-content/uploads/2014/06/Porterhouse-Steaks-14-Oz-2-0.jpg',
        'http://www.surlatable.com/images/customers/c1079/REC-235732/generated/REC-235732_Default_1_430x430.jpg',
        'http://us.123rf.com/450wm/rez_art/rez_art1209/rez_art120900051/15529230-salmon-steak-dinner-with-herbs-and-roasted-potatoes.jpg',
        'http://www.surlatable.com/images/customers/c1079/CFA-878751/generated/CFA-878751_Default_1_430x430.jpg',
        'http://www.surlatable.com/images/customers/c1079/CFA-878728/generated/CFA-878728_Default_1_430x430.jpg',
        'http://www.surlatable.com/images/customers/c1079/PRO-593426/generated/PRO-593426_Default_1_430x430.jpg',
        'http://www.surlatable.com/images/customers/c1079/CFA-878769/generated/CFA-878769_Default_1_430x430.jpg',
        'http://www.surlatable.com/images/customers/c1079/CFA-905208/generated/CFA-905208_Default_1_430x430.jpg',
        'http://www.surlatable.com/images/customers/c1079/PRO-192962/generated/PRO-192962_Default_1_430x430.jpg',
        'http://www.tedhickman.com/wp-content/uploads/2013/05/2013obama.png',
        'http://www.surlatable.com/images/customers/c1079/PRO-1101054/generated/PRO-1101054_Default_1_430x430.jpg',
        'http://www.noplainjaneskitchen.com/wp-content/uploads/2012/03/Brownie-Ice-Cream-Fados.png',
        "http://timing-design.com/food/salmon1-7.jpg",
        "http://draxe.com/wp-content/uploads/2014/06/recipe-cat-sides.jpg",
        "http://besthomechef.com.au/wp/wp-content/uploads/2012/10/my-dish-430x430.jpg",
        "http://www.timing-design.com/food/eest1-6.jpg",
        "http://sin.stb.s-msn.com/i/F9/B2C4BB068CC74E7C81E43A5BAE391.jpg",
        "http://media-cache-ec0.pinimg.com/736x/03/49/ce/0349ced599b533aac986105db75ee7ce.jpg",
        "http://2.bp.blogspot.com/-hnvMrHaZfbA/TcapY-NzZFI/AAAAAAAACRY/IHszV7C6j_s/s1600/quiche.jpg",
        "http://www.surlatable.com/images/customers/c1079/PRO-16597/generated/PRO-16597_Default_1_430x430.jpg",
        "http://lh3.googleusercontent.com/-ToMtDDvA6eA/UGOmQgbBWKI/AAAAAAAAW6I/efBYac1mDAs/s430/Crockpot%2520Jambalaya.JPG",
        "http://www.moneysavingmadness.com/wp-content/uploads/2013/06/bacon-cheddar-tomato-grille.jpg",
        "http://d2ch1jyy91788s.cloudfront.net/dinewise/images/product/6244_n-430_430.jpg",
        "http://media-cache-ak0.pinimg.com/originals/18/90/5e/18905e47619aaef7d8771ba8eeb5d9c9.jpg",
        "http://www.surlatable.com/images/customers/c1079/REC-163427/generated/REC-163427_Default_1_430x430.jpg",
        "http://i-cms.journaldesfemmes.com/image_cms/original/1102116-flan-d-endive-au-magret-de-canard-fume.jpg",
        "http://www.tallahasseemagazine.com/images/cache/cache_6/cache_9/cache_0/6909ffff915c6f5db1b50dcf9232b150.jpeg?ver=1401934458&aspectratio=1",
        "http://i.mctimg.com/file/b0f261c36335598285775e9f7891893bc3aff1b1.png/r430x430/2ae291a11d3db0b565a00c3b9b61599468326cdc155d42e92560d46545b19340",
        "http://ww-recipes.net/wp-content/uploads/2008/07/weight-watchers-french-onion-soup-recipe.jpg",
        "http://www.inspired2cook.com/wp-content/uploads/2009/11/Turkey-Chowder-2.jpg",
        "http://canofgoodgoodies.files.wordpress.com/2012/06/soup.jpg",
        "http://ww-recipes.net/wp-content/uploads/2012/03/weight-watchers-mango-pudding-recipe-picture.jpg",
        "http://spatulascorkscrews.typepad.com/.a/6a00e54fc0864288330120a89ad210970b-500wi",
        "http://media-cache-ak0.pinimg.com/736x/7f/32/2a/7f322a8537e5e511ca003ff89367c6d9.jpg",
        "http://spatulascorkscrews.typepad.com/.a/6a00e54fc0864288330133f64a57b5970b-500wi",
        "https://i.mctimg.com/file/8789722894454995953b9e36624aba7516ee9390.png/r430x430/0285ee32ae4595d92ed5e888790b4d2a3dc45255a6d6641c31f090fd5615d907",
        "http://www.inspired2cook.com/wp-content/uploads/2009/10/broccoli-soup.jpg",
        "http://azestforlife.com/sites/default/files/img_7323_0.jpg",
        "http://besthomechef.com.au/wp/wp-content/uploads/2012/10/IMG_0409-430x430.jpg",
        "http://30dayssugarfree.com/wp-content/uploads/71f38d7145bd2e4ee0957a3d81efb9b72fcbc057d29cc3ca995f3f7e09c7b191.png",
        "http://thedish.restaurant.com/wp-content/uploads/2013/12/trufflefrenchfriessquare.jpg",
        "http://www.diyvalley.com/wp-content/uploads/2014/02/Coffee-art-10.jpg",
        "http://www.thehindu.com/multimedia/dynamic/00666/25CMSANDWICH_GO22V7_666379g.jpg",
        "http://sf1.viepratique.fr/wp-content/uploads/sites/2/2014/05/187529-430x430.jpg",
        "http://i.mctimg.com/file/5a3bdae1064c52232b75cb859e4f768a2e7b13b8.png/r430x430/a1daecafa27a522bf7d4fa11ed18ff2717bab102ca84ce4e77d51773cd05a787",
        "http://www.timing-design.com/food/lele1-5.jpg",
        "http://www.timing-design.com/food/thorntree1-6.jpg",
        "http://besthomechef.com.au/wp/wp-content/uploads/2012/10/Thai-Prawn-Pork-Neck-Salad-430x430.jpg",
        "http://ww-recipes.net/wp-content/uploads/2012/01/weight-watchers-chicken-tortilla-soup-recipe-picture.jpg",
        "http://www.marieclairemaison.com/data/photo/mh600_c18/G_25665_art.jpg",
        "http://media-cache-ec0.pinimg.com/736x/f8/52/d8/f852d86b4f7cd8cae3e16939446df1b2.jpg",
        "http://thegastrognome.files.wordpress.com/2010/04/taylor-mussels.jpg",
        "http://cdn-femina.ladmedia.fr/var/femina/storage/images/cuisine/idees-de-menus/le-cidre-en-recettes-pour-les-fetes/cocktails-entree-plat-dessert-le-cidre-en-fete/cocktail-le-mont-saint-michel2/3196536-1-fre-FR/Cocktail-Le-Mont-Saint-Michel_current_diaporama.jpg",
        "http://cocktailsdetails.com/wp-content/uploads/2010/06/jamaicamargarita.jpg",
        "http://media.kuechengoetter.de/media/174/12503760385760/sommerliche_cocktails.jpg",
        "http://singlemindedwomen.com/wp/wp-content/uploads/2014/03/St_Pats_Drinks_0083-430x430.jpg",
        "http://bp1.blogger.com/_0ekp2fmR6Vw/Rx8S9-HZxMI/AAAAAAAAAOQ/4MdyS-SR8eE/s1600-h/gambas.jpg",
        "http://www.marieclairemaison.com/data/photo/mw430_c18/baba-geant-a-partager.jpg",
        "http://www.lesfoodies.com/_recipeimage/recipe/46203/w/430",
        "http://besthomechef.com.au/wp/wp-content/uploads/2012/10/Thai-Prawn-Pork-Neck-Salad-430x430.jpg",
        "http://www.surlatable.com/images/customers/c1079/CFA-1022664/generated/CFA-1022664_Default_1_430x430.jpg"
      ]
  }
