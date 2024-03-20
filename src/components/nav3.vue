<script>
import {mapActions, mapState} from "pinia";
import {categoriasStore} from "@/stores/categoriasStore.js";

export default {
  data() {
    return {
      showCategoriesPanel: true
    };
  },

  methods: {
    ...mapActions(categoriasStore, ['calcularPrecioTotal']),
    agregarAlCarrito(producto) {
      categoriasStore().agregarAlCarrito(producto);
    },
    eliminarDelCarrito(index) {
      categoriasStore().eliminarDelCarrito(index);
    },
  },
  mounted() {
    this.calcularPrecioTotal()
  },


  computed: {
    ...mapState(categoriasStore,{carrito: 'carrito',precioCarrito:'precioCarrito'}),
  },
};
</script>

<template>
  <nav class="wsmenu clearfix">
    <ul class="wsmenu-list">
      <li aria-haspopup="true" class="rightmenu">
        <form class="topmenusearch">
          <input placeholder="Search...">
          <button class="btnstyle"><i class="searchicon fas fa-search"></i></button>
        </form>
      </li>
      <li aria-haspopup="true"><a href="#" class="active menuhomeicon"><i class="fas fa-home"></i><span
          class="hometext">&nbsp;&nbsp;Home</span></a></li>
      <li aria-haspopup="true"><a href="#">Mega menu <span class="wsarrow"></span></a>
        <div class="wsmegamenu clearfix">
          <div class="container">
            <div class="row">

              <div class="col-lg-5 col-md-12 col-xs-12 link-list">
                <div class="title">More Text Header</div>
                <p class="wsmwnutxt">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and
                  scrambled it to make a type
                  specimen book. It has survived not only five centuries, but also the leap into electronic
                  typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
                  Letraset sheets containing Lorem Ipsum
                  passages,
                  and more recently with desktop publishing software like Aldus PageMaker including versions of
                  Lorem Ipsum.</p>
                <p class="wsmwnutxt">Lorem Ipsum is simplntly with desktop publishing software like Aldus PageMaker
                  but also the leap into electronic typesetting including versions of Lorem Ipsum.</p>
              </div>


              <ul class="col-lg-3 col-md-12 col-xs-12 link-list">
                <li class="title">Product Header</li>
                <li><a href="#"><i class="fas fa-arrow-circle-right"></i>Open Source link goes here</a></li>
                <li><a href="#"><i class="fas fa-arrow-circle-right"></i>Long link area with no scroll</a></li>
                <li><a href="#"><i class="fas fa-arrow-circle-right"></i>Dummy more link style</a></li>
                <li><a href="#"><i class="fas fa-arrow-circle-right"></i>Smart Shop link here</a></li>
                <li><a href="#"><i class="fas fa-arrow-circle-right"></i>CMS Submenu link style</a></li>
                <li><a href="#"><i class="fas fa-arrow-circle-right"></i>New link area with no scroll</a></li>
                <li><a href="#"><i class="fas fa-arrow-circle-right"></i>HTML5 link style</a></li>
                <li><a href="#"><i class="fas fa-arrow-circle-right"></i>Wordpress link style</a></li>
                <li><a href="#"><i class="fas fa-arrow-circle-right"></i>Submenu link style</a></li>

              </ul>



              <div class="col-lg-4 col-md-12 col-xs-12">
                <h3 class="title">New Arrival Slider </h3>
                <div id="demo" class="carousel slide" data-ride="carousel">
                  <!-- The slideshow -->
                  <div class="carousel-inner">
                    <div class="carousel-item active"><img src="/images/image01.jpg" alt="" />
                      <div class="carousel-caption">
                        <h3>Slider Caption Option 01</h3>
                      </div>
                    </div>
                    <div class="carousel-item"><img src="/images/image02.jpg" alt="" />
                      <div class="carousel-caption">
                        <h3>Slider Caption Option 02</h3>
                      </div>
                    </div>
                    <div class="carousel-item"><img src="/images/image03.jpg" alt="" />
                      <div class="carousel-caption">
                        <h3>Slider Caption Option 03</h3>
                      </div>
                    </div>
                    <div class="carousel-item"><img src="/images/image04.jpg" alt="" />
                      <div class="carousel-caption">
                        <h3>Slider Caption Option 04</h3>
                      </div>
                    </div>
                    <div class="carousel-item"><img src="/images/image05.jpg" alt="" />
                      <div class="carousel-caption">
                        <h3>Slider Caption Option 05</h3>
                      </div>
                    </div>
                    <div class="carousel-item"><img src="/images/image06.jpg" alt="" />
                      <div class="carousel-caption">
                        <h3>Slider Caption Option 06</h3>
                      </div>
                    </div>
                  </div>

                  <!-- Left and right controls -->
                  <a class="carousel-control-prev" href="#demo" data-slide="prev"> <span
                      class="carousel-control-prev-icon"></span>
                  </a>
                  <a class="carousel-control-next" href="#demo" data-slide="next"> <span
                      class="carousel-control-next-icon"></span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </li>
      <li aria-haspopup="true"><a href="#">Product images <span class="wsarrow"></span></a>
        <div class="wsmegamenu clearfix ">
          <div class="container">
            <div class="row">


              <div class="col-lg-4 col-md-12 col-xs-12">
                <h3 class="title">Product Features</h3>
                <div class="fluid-width-video-wrapper"><img src="/images/image02.jpg" alt="" /> </div>
                <p class="wsmwnutxt">Lorem Ipsum is dummy text of the printing specimen book. It has survived not
                  only five centuries, but also typesetting in the the contantly with desktoncluding.</p>
              </div>
              <div class="col-lg-4 col-md-12 col-xs-12">
                <h3 class="title">Blog Article </h3>
                <div class="fluid-width-video-wrapper"><img src="/images/image03.jpg" alt="" /> </div>
                <p class="wsmwnutxt">Lorem Ipsum is dummy text of the printing specimen book. It has survived not
                  only five centuries, but also typesetting in the the contantly with desktoncluding.</p>
              </div>
              <div class="col-lg-4 col-md-12 col-xs-12">
                <h3 class="title">Highlight Your Services</h3>
                <div class="fluid-width-video-wrapper"><a href="#"><img src="/images/image04.jpg" alt="" /></a>
                </div>
                <p class="wsmwnutxt">Lorem Ipsum is dummy text of the printing specimen book. It has survived not
                  only five centuries, but also typesetting in the the contantly with desktoncluding.</p>
              </div>

            </div>
          </div>
        </div>
      </li>
      <li aria-haspopup="true"><a href="#">Dropdowns <span class="wsarrow"></span></a>
        <ul class="sub-menu">
          <li aria-haspopup="true"><a href="#"><i class="fas fa-angle-right"></i>Website Design </a></li>
          <li aria-haspopup="true"><a href="#"><i class="fas fa-angle-right"></i>Ecommerce Solutions</a></li>
          <li aria-haspopup="true"><a href="#"><i class="fas fa-angle-right"></i>Application Development</a></li>
          <li aria-haspopup="true"><a href="#"><i class="fas fa-angle-right"></i>Website Development</a></li>
          <li aria-haspopup="true"><a href="#"><i class="fas fa-angle-right"></i>Open Source Development</a>
            <ul class="sub-menu">
              <li aria-haspopup="true"><a href="#"><i class="fas fa-angle-right"></i>Submenu item 1</a></li>
              <li aria-haspopup="true"><a href="#"><i class="fas fa-angle-right"></i>Submenu item 2</a></li>
              <li aria-haspopup="true"><a href="#"><i class="fas fa-angle-right"></i>Submenu item 3</a></li>
              <li aria-haspopup="true"><a href="#"><i class="fas fa-angle-right"></i>Submenu item 4</a></li>
            </ul>
          </li>
        </ul>
      </li>
      <li aria-haspopup="true"><a href="#"> Typography <span class="wsarrow"></span></a>
        <div class="wsmegamenu clearfix">
          <div class="typography-text clearfix">
            <div class="container">
              <div class="row">

                <div class="col-lg-6 col-sm-12">
                  <h3 class="title">This is another title</h3>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                    been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                    galley of type and scrambled it to make
                    a type
                    specimen book. It has survived not only five centuries, but also the leap into electronic
                    typesetting, remaining essentially unchanged. It was popularised in the 1960s Ipsum more
                    recently with desktop publishing software like
                    Aldus
                    PageMaker including versions of Lorem Ipsum.</p>
                </div>

                <div class="col-lg-3 col-sm-12">
                  <h3 class="title">This is another title</h3>
                  <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                    classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a
                    Latin professor at Hampden-Sydney
                    College in
                    Virginia.
                  </p>
                </div>

                <div class="col-lg-3 col-sm-12">
                  <h3 class="title">This is another title</h3>
                  <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                    classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a
                    Latin professor at Hampden-Sydney
                    College in
                    Virginia.
                  </p>
                </div>

              </div>

              <div class="row">
                <div class="cl"></div>

                <div class="col-lg-3 col-sm-12">
                  <h3 class="title">Other Services</h3>
                  <ul>
                    <li><a href="#"><i class="fab fa-wordpress"></i>Wordpress Development</a></li>
                    <li><a href="#"><i class="fab fa-drupal"></i>Drupal Development</a></li>
                    <li><a href="#"><i class="fas fa-shopping-cart"></i>Shoping Cart Development</a></li>
                  </ul>
                </div>

                <div class="col-lg-3 col-sm-12">
                  <h3 class="title">More Services</h3>
                  <ul>
                    <li><a href="#"><i class="fab fa-android"></i> Android App Development</a></li>
                    <li><a href="#"><i class="fab fa-apple"></i>iPhone App Development</a></li>
                    <li><a href="#"><i class="fab fa-windows"></i>Windows App Development</a></li>
                  </ul>
                </div>

                <div class="col-lg-3 col-sm-12">
                  <h3 class="title">Other Products</h3>
                  <ul>
                    <li><a href="#"><i class="fab fa-wordpress"></i>Wordpress Development</a></li>
                    <li><a href="#"><i class="fab fa-drupal"></i>Drupal Development</a></li>
                    <li><a href="#"><i class="fab fa-joomla"></i>Joomla Development</a></li>
                  </ul>
                </div>

                <div class="col-lg-3 col-sm-12">
                  <h3 class="title">More Services</h3>
                  <ul>
                    <li><a href="#"><i class="fab fa-android"></i> Android App Development</a></li>
                    <li><a href="#"><i class="fab fa-html5"></i>HTML5 App Development</a></li>
                    <li><a href="#"><i class="fab fa-paypal"></i>Paypal Store Integration</a></li>
                  </ul>
                </div>
              </div>

            </div>

          </div>
        </div>
      </li>
      <li aria-haspopup="true"><a href="#"> Contact Us <span class="wsarrow"></span></a>
        <div class="wsmegamenu halfdiv">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <h3 class="title">Contact Form</h3>
                <form name="contact_name" class="menu_form">
                  <input type="text" placeholder="Name">
                  <input type="text" placeholder="Email">
                  <textarea placeholder="Your message..."></textarea>
                  <input type="button" value="Reset">
                  <input type="submit" value="Send">

                </form>
                <div class="cl"></div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.nav-item {
  padding: 0.5rem 0;
}

.dropdown-hover:hover>.dropdown-menu {
  display: inline-block;
  width: 100%;
}

.dropdown-hover>.dropdown-toggle:active {
  /*Without this, clicking will make it sticky*/
  pointer-events: none;
}
</style>
