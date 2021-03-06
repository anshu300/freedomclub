<!DOCTYPE html>
<html>

<head>
  <title>freedm club</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" type="text/css" href="stylesheets/bootstrap.min.css">
  <!-- <link rel="stylesheet" type="text/css" href="css/foundation.min.css"> -->
  <link rel="stylesheet" type="text/css" href="/stylesheets/main-style.css">
  <!-- <link rel="stylesheet" type="text/css" href="stylesheets/main-s.css"> -->
  <script type="text/javascript" src="javascripts/jquery-3.3.1.min.js"></script>
  <script type="text/javascript" src="javascripts/bootstrap.min.js"></script>
  <!-- <script type="text/javascript" src="js/foundation.min.js"></script> -->




  <style>
    .tab {
      float: left;
      border: 1px solid #ccc;
      background-color: #f1f1f1;
      width: 30%;
      height: 300px;
    }

    /* Style the buttons inside the tab */

    .tab button {
      display: block;
      background-color: inherit;
      color: black;
      padding: 15px 16px;
      width: 100%;
      border: none;
      outline: none;
      text-align: left;
      cursor: pointer;
      transition: 0.3s;
      font-size: 17px;
    }

    /* Change background color of buttons on hover */

    .tab button:hover {
      background-color: #ddd;
      border-left: 5px solid #630;
    }

    /* Create an active/current "tab button" class */

    .tab button.active {
      background-color: #ccc;
      border-left: 5px solid #630;
    }

    /* Style the tab content */

    .tabcontent {
      float: left;
      padding: 0px 12px;
      border: 1px solid #ccc;
      width: 70%;
      border-left: none;
      height: 300px;
    }
  </style>

</head>

<body>
  <!--           top header                  -->

  <section class="top-header-section">
    <div class="container-fluid">
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-sm-6 col-xs-6 text-left">
            <div class="lang">
              <div class="btn-group" style="margin-left: 0px;">
                <span class="dropdown-toggle" data-toggle="dropdown">
                  <i class="fa fa-share-alt" id="share"></i>
                </span>



                <ul class="dropdown-menu share-btn1" role="menu">

                  <li>
                    <a data-original-title="Twitter" rel="tooltip" href="#" class="btn btn-twitter" data-placement="left">
                      <i class="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a data-original-title="Facebook" rel="tooltip" href="#" class="btn btn-facebook" data-placement="left">
                      <i class="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a data-original-title="Google+" rel="tooltip" href="#" class="btn btn-google" data-placement="left">
                      <i class="fa fa-google-plus"></i>
                    </a>
                  </li>
                  <li>
                    <a data-original-title="LinkedIn" rel="tooltip" href="#" class="btn btn-linkedin" data-placement="left">
                      <i class="fa fa-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a data-original-title="Pinterest" rel="tooltip" class="btn btn-pinterest" data-placement="left">
                      <i class="fa fa-pinterest"></i>
                    </a>
                  </li>
                  <li>
                    <a data-original-title="Email" rel="tooltip" class="btn btn-mail" data-placement="left">
                      <i class="fa fa-envelope"></i>
                    </a>
                  </li>
                </ul>

              </div>
              <div class="btn-group" style="margin-left: 7px;">
                <span class="dropdown-toggle" data-toggle="dropdown">
                  Eng
                  <span class="glyphicon glyphicon-chevron-down" style="font-size: 15px; top:4px; margin-left: 2px;"></span>
                </span>
                <ul class="dropdown-menu" role="menu">
                  <li>
                    <a href="#">Action</a>
                  </li>
                  <li>
                    <a href="#">Another action</a>
                  </li>
                  <li>
                    <a href="#">Something else here</a>
                  </li>
                  <li class="divider"></li>
                  <li>
                    <a href="#">Separated link</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-6 col-xs-6 text-right">
            <div class="lang">
              <ul>
                <li>
                  <span>Customer Support</span>
                  <span> | &nbsp;</span>
                </li>
                <li>
                  <span>Download App</span>
                  <i class="fa fa-android"></i>
                  <i class="fa fa-apple"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--          end  top header                  -->
  <!--    logo and category section          -->
  <section class="logo-section">
    <div class="container-fluid">
      <div class="container">
        <div class="row">
          <div class="col-md-3">
            <div class="logo">
              <img src="images/logo.png">
            </div>
          </div>
          <div class="col-md-6">
            <div class="logo-add">
              <img src="images/logo-add.jpg">
            </div>
          </div>
          <div class="col-md-3 text-right">
            <div class="site-ls-btn">
              <div class="btn-group-vertical" style="margin-bottom: 10px;">
                <!-- <button type="button" class="btn btn-primary"> <i class="fa fa-user" aria-hidden="true"></i> &nbsp;Login&nbsp; &nbsp;</button> -->
                <% if(user==0){ %>
                  <a href='/login' class="btn btn-primary">
                    <i class="fa fa-user" aria-hidden="true"></i> &nbsp;
                    <%= login %>
                  </a>
                  <% } %>
              </div>
              <br>
              <div class="btn-group-vertical">
                <!-- <button type="button" class="btn btn-primary"> <i class="fa fa-sign-in" aria-hidden="true"></i>&nbsp;SignUp</button> -->

                <% if(user==1){ %>
                  <a href='/users' class="btn btn-primary">
                    <i class="fa fa-sign-in" aria-hidden="true"></i> &nbsp; My Account
                    <% } else{ %>
                      <a href='/register' class="btn btn-primary">
                        <i class="fa fa-sign-in" aria-hidden="true"></i> &nbsp; SignUp
                        <% } %>
                      </a>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <!-- Megha menu -->
          <div class="col-md-12 text-left">
            <div class="collapse navbar-collapse js-navbar-collapse navi-menu">
              <ul class="nav navbar-nav">
                <li class="dropdown mega-dropdown ">
                  <a href="#" class="dropdown-toggle icon" data-toggle="dropdown">
                    <span class="glyphicon glyphicon-align-justify" style="font-size: 20px;"></span>
                  </a>
                  <ul class="dropdown-menu mega-dropdown-menu">
                    <li class="col-sm-3">
                      <ul>
                        <li class="dropdown-header">Men Collection</li>
                        <div id="menCollection" class="carousel slide" data-ride="carousel">
                          <div class="carousel-inner">
                            <div class="item active">
                              <a href="#">
                                <img src="http://placehold.it/254x150/ff3546/f5f5f5/&amp;text=New+Collection" alt="product 1">
                              </a>
                              <h4>
                                <small>Summer dress floral prints</small>
                              </h4>
                              <button class="btn btn-primary pricebtn" type="button">49,99 €</button>
                              <button href="#" class="btn btn-default" type="button">
                                <span class="glyphicon glyphicon-heart"></span> Add to Wishlist</button>
                            </div>
                            <!-- End Item -->
                            <div class="item">
                              <a href="#">
                                <img src="http://placehold.it/254x150/3498db/f5f5f5/&amp;text=New+Collection" alt="product 2">
                              </a>
                              <h4>
                                <small>Gold sandals with shiny touch</small>
                              </h4>
                              <button class="btn btn-primary" type="button">9,99 €</button>
                              <button href="#" class="btn btn-default" type="button">
                                <span class="glyphicon glyphicon-heart"></span> Add to Wishlist</button>
                            </div>
                            <!-- End Item -->
                            <div class="item">
                              <a href="#">
                                <img src="http://placehold.it/254x150/2ecc71/f5f5f5/&amp;text=New+Collection" alt="product 3">
                              </a>
                              <h4>
                                <small>Denin jacket stamped</small>
                              </h4>
                              <button class="btn btn-primary" type="button">49,99 €</button>
                              <button href="#" class="btn btn-default" type="button">
                                <span class="glyphicon glyphicon-heart"></span> Add to Wishlist</button>
                            </div>
                            <!-- End Item -->
                          </div>
                          <!-- End Carousel Inner -->
                          <!-- Controls -->
                          <a class="left carousel-control" href="#menCollection" role="button" data-slide="prev">
                            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                          </a>
                          <a class="right carousel-control" href="#menCollection" role="button" data-slide="next">
                            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                          </a>
                        </div>
                        <!-- /.carousel -->
                        <li class="divider"></li>
                        <li>
                          <a href="#">View all Collection
                            <span class="glyphicon glyphicon-chevron-right pull-right"></span>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li class="col-sm-3">
                      <ul>
                        <li class="dropdown-header">Features</li>
                        <li>
                          <a href="#">Auto Carousel</a>
                        </li>
                        <li>
                          <a href="#">Carousel Control</a>
                        </li>
                        <li>
                          <a href="#">Left &amp; Right Navigation</a>
                        </li>
                        <li>
                          <a href="#">Four Columns Grid</a>
                        </li>
                        <li class="divider"></li>
                        <li class="dropdown-header">Fonts</li>
                        <li>
                          <a href="#">Glyphicon</a>
                        </li>
                        <li>
                          <a href="#">Google Fonts</a>
                        </li>
                      </ul>
                    </li>
                    <li class="col-sm-3">
                      <ul>
                        <li class="dropdown-header">Plus</li>
                        <li>
                          <a href="#">Navbar Inverse</a>
                        </li>
                        <li>
                          <a href="#">Pull Right Elements</a>
                        </li>
                        <li>
                          <a href="#">Coloured Headers</a>
                        </li>
                        <li>
                          <a href="#">Primary Buttons &amp; Default</a>
                        </li>
                      </ul>
                    </li>
                    <li class="col-sm-3">
                      <ul>
                        <li class="dropdown-header">Much more</li>
                        <li>
                          <a href="#">Easy to Customize</a>
                        </li>
                        <li>
                          <a href="#">Calls to action</a>
                        </li>
                        <li>
                          <a href="#">Custom Fonts</a>
                        </li>
                        <li>
                          <a href="#">Slide down on Hover</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul class="select-option">
                <li>
                  <form>
                    <div class="row">
                      <div class="col-md-4 col-sm-4 col-xs-4  in">
                        <input type="text" class="form-control" placeholder="Keywords">
                      </div>
                      <div class="col-md-4 col-sm-4 col-xs-4  in">
                        <select id="category" class="form-control">
                          <option selected>Select Location</option>
                          <option>...</option>
                        </select>
                      </div>
                      <div class="col-md-4 col-sm-4 col-xs-4  in">
                        <select id="category1" class="form-control">
                          <option selected>Select Category</option>
                          <option>...</option>
                        </select>
                      </div>
                    </div>
                  </form>
                </li>
                <button class="btn btn-default search-btn" type="submit">
                  <i class="fa fa-search"></i>
                </button>
                <li>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>




    <!-- Signup and SignIn Modal  -->



    <!-- End Signup and SignIn Modal  -->




  </section>
  <!--       end logo and category section          -->
  <!--       Racharge section          -->
  <section class="recharge-section">
    <div class="container">
      <div class="row">
        <div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">
          <div class="recharge-box">

            <ul class="nav nav-tabs rechrge-item">
              <li class="tr text-center active" data-id="Mobile">
                <a data-toggle="tab" href="#home">
                  <img src="images/Mobile_Icon.png">
                  <label class="rechrge-cap">Mobile</label>
                </a>
              </li>
              <li class="tr text-center dth-recharge" data-id="DTH">
                <a data-toggle="tab" href="#menu1">
                  <img src="images/dth.png">
                  <label class="rechrge-cap">DTH</label>
                </a>
              </li>
              <li class="tr text-center">
                <a data-toggle="tab" href="#menu2">
                  <img src="images/electricity.png">
                  <label class="rechrge-cap">Electricity</label>
                </a>
              </li>

              </a>
              </li>
              <li class="text-center tr">
                <a data-toggle="tab" href="#menu3">
                  <img src="images/metro.png">
                  <label class="rechrge-cap">Metro</label>
                </a>
              </li>
              <li class="tr text-center">
                <a data-toggle="tab" href="#menu4">
                  <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                  <label class="rechrge-cap">More</label>
                </a>
              </li>
            </ul>

            <div class="tab-content cnt-panel">
              <div id="home" class="tab-pane fade in active">
                <h3>Recharge Your Mobile. </h3>
                <p>
                  <!-- <form> -->
                  <input type="hidden" value="<%= user %>" id="uid">

                  <label class="radio-inline mob-op">
                    <input type="radio" name="optradio" value="Prepaid" checked="">Prepaid
                    <span class="checkmark"></span>
                  </label>
                  <label class="radio-inline mob-op">
                    <input type="radio" name="optradio" value="Postpaid" class="chk">Postpaid
                    <span class="checkmark"></span>
                  </label>

                  <div class="floated-label-wrapper form-group">
                    <label for="full-name">Mobile No.</label>
                    <input type="text" id="mobile_num" name="full name input" placeholder="+91 " class="form-control recharge-form">
                  </div>
                  <div class="floated-label-wrapper form-group">
                    <div class="floated-label-wrapper form-group">
                      <label for="email">Select Metro</label>
                      <select id="metro" name="metro" class="rech form-control recharge-form">
                        <!-- <option value="1">Airtel</option>
                        <option value="10">Vodafone</option>
                        <option value="3">Idea</option>                         -->
                      </select>
                    </div>
                    <span>
                      <a href="javascript:void(0)" class="browsePlan">Browse Plan</a>
                    </span>
                  </div>
                  <div class="floated-label-wrapper form-group">
                    <label for="pass">Enter Amount</label>
                    <input type="text" id="amount" name="amount" placeholder="Enter Amount" class="form-control recharge-form">
                  </div>
                  <button class="btn btn-primary rechrgebutton" id="Rechage" type="button">Recharge Now</button>


                  <!-- </form> -->
                </p>

                <!--===============================================Mobile Plane Modal========= ========================================================-->



                <div class="modal fade" id="myModal" role="dialog">
                  <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Modal Header</h4>
                      </div>
                      <div class="modal-body" style="padding: 0px;">
                        <div class="tbpn">


                          <div class="tab">
                            <button class="tablinks" onclick="openCity(event, 'Normal')" id="defaultOpen">Normal Plan</button>
                            <button class="tablinks" onclick="openCity(event, 'FTT')">Full TalkTime Plan</button>
                            <button class="tablinks" onclick="openCity(event, '2g')">2g Data</button>
                            <button class="tablinks" onclick="openCity(event, '3g')">3g Data</button>
                            <button class="tablinks" onclick="openCity(event, '4g')">4g Data</button>
                          </div>

                          <div id="Normal" class="tabcontent">
                            <h3>Normal Plan</h3>
                            <!-- <table class="table table-hover">
                              <thead>
                                <tr>
                                  <th>Talktime</th>
                                  <th>Validity</th>
                                  <th>Description</th>
                                  <th>Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>150</td>
                                  <td>Unlimited</td>
                                  <td>Full TalkTime</td>
                                  <td>
                                    <button type="button" class="btn btn-outline-secondary">RS. 150</button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>300</td>
                                  <td>Unlimited</td>
                                  <td>Full TalkTime</td>
                                  <td>
                                    <button type="button" class="btn btn-outline-secondary">RS. 300</button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>500</td>
                                  <td>Unlimited</td>
                                  <td>Full TalkTime</td>
                                  <td>
                                    <button type="button" class="btn btn-outline-secondary">RS. 500</button>
                                  </td>
                                </tr>
                              </tbody>
                            </table> -->
                          </div>

                          <div id="FTT" class="tabcontent">
                            <h3>Paris</h3>
                            <p>No plan exit</p>
                          </div>

                          <div id="2g" class="tabcontent">
                            <h3>2G</h3>
                            <p>No plan exit</p>
                          </div>
                          <div id="3g" class="tabcontent">
                            <h3>3g</h3>
                            <p>No plan exit</p>
                          </div>
                          <div id="4g" class="tabcontent" style="overflow:scroll;">
                            <h3>4g</h3>
                            <p class="4g-plan"></p>
                            <table class="table table-hover">
                              <thead>
                                <tr>
                                  <th>Talktime</th>
                                  <th>Detail</th>
                                  <th>Validity</th>
                                  <th>Price</th>
                                </tr>
                              </thead>
                              <tbody class="4G">
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">

                      </div>
                    </div>
                  </div>
                </div>



                <!--===============================================Login Modal========= ========================================================-->

                <div class="modal fade" tabindex="-1" role="dialog" id="Loginmodal">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">Plan Detail</h4>
                      </div>
                      <div class="modal-body">
                        <h2 class="error-mess text-center" style="color:red;"></h2>
                        <div class="form-group">
                          <label for="recipient-name" class="control-label">Mobile</label>
                          <input type="number" class="form-control" id="mobile_number" placeholder="Enter Mobile Number">
                        </div>
                        <div class="form-group">
                          <label for="recipient-name" class="control-label">Password:</label>
                          <input type="password" class="form-control" id="modal_Password" placeholder="Password">
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" id="SaveChange">Save changes</button>
                      </div>
                    </div>
                    <!-- /.modal-content -->
                  </div>
                  <!-- /.modal-dialog -->
                </div>
                <!-- /.modal -->


              </div>
              <div id="menu1" class="tab-pane fade">
                <h3>Recharge DTH</h3>
                <p>


                  <div class="floated-label-wrapper form-group">
                    <label for="email">Select Operator</label>
                    <select id="metro" name="metro" class="form-control recharge-form  recharge-dth">
                      <option value="27">Tata Sky</option>
                      <option value="31">Airtel</option>
                      <option value="24">Videocon</option>
                    </select>
                    <span>
                      <!-- <a href="#">Browse Plan</a> -->
                    </span>
                  </div>

                  <div class="floated-label-wrapper form-group">
                    <label for="full-name">Enter Card No.</label>
                    <input type="text" id="dth-no" name="card_no" placeholder="Enter Card No. " class="form-control recharge-form">
                  </div>

                  <div class="floated-label-wrapper form-group">
                    <label for="pass">Enter Amount</label>
                    <input type="text" id="dth-amount" name="password input" placeholder="Enter Amount" class="form-control recharge-form">
                  </div>
                  <!-- <input class="btn btn-primary rechrgebutton" id="RechrgeDth" type="submit" value="Recharge Now"> -->
                  <button class="btn btn-primary rechrgebutton" id="RechrgeDth">Recharge Now</button>


                </p>
              </div>


              <script type="text/javascript">
                var rtype = "Prepaid";
                var oprator;
                var recharge = "mobile";
                $('.text-center').on("click", function () {
                  recharge = $(this).data().id;
                });
                $('.chk').on("click", function () {
                  rtype = $(this).val();
                });
                $('select').on("change", function () {
                  oprator = $(this).val();
                });
                $('#Rechage').on("click", function () {
                  var uid = $('#uid').val();
                  if (uid == 0) {
                    $('#Loginmodal').modal('show');
                    $('#SaveChange').on("click", function () {
                      var mob = $('#mobile_number').val();
                      var pass = $('#modal_Password').val();
                      $.post("/ajaxlogin", { "mobile": mob, "password": pass }, function (d) {
                        if (d.status == 200) {
                          $('#uid').val(1);
                          $('#Loginmodal').modal('hide');
                        }
                        if (d.status == 500) {
                          $('.error-mess').html("Your User Name And Password Is not Correct");
                        }
                      });
                    });
                  } else {
                    var mobile = $('#mobile_num').val();
                    var amount = $('#amount').val();
                    if (mobile == "") {
                      alert("Please Enter A Mobile Number");
                      return false;
                    }
                    if (/^\d{10}$/.test(mobile)) {
                    } else {
                      alert("Invalid number");
                      return false;
                    }
                    $.post("/users/dthrecharge", { "mobile": mobile, "amount": amount, "oprator": oprator, "rechage_type": recharge }, function (d) {
                      console.log(d);
                      //window.location.href=""
                    });
                    // var url = "http://api.rechapi.com/recharge.php?format=json&token=R5eWtAEIYqJWQFlHFwQeNco5cZpUWC&mobile=9616499322&amount=10&opid=3&urid=66C02462A2211022C&opvalue1=#opvalue1&opvalue2=#opvalue2";
                    // $.get(url, function (d) {
                    //   console.log(d);
                    // });
                  }
                });
                $('.browsePlan').on("click", function () {
                  $('.tlb').html(" ");
                  $('#myModal').modal('show');
                  $.get("https://api.rechapi.com/rech_plan.php?format=json&token=R5eWtAEIYqJWQFlHFwQeNco5cZpUWC&type=3G&cirid=1&opid=" + oprator, function (d) {
                    data = JSON.parse(d);
                    console.log(d);
                    var d = data.data;
                    for (i in d) {
                      var arr = d[i];
                    }
                    for (i in arr) {
                      console.log(arr[i]);
                      $('<tr><td>' + arr[i].talktime + '</td><td>' + arr[i].detail + '</td><td>' + arr[i].validity + '</td><td><button type="button" class="btn btn-outline-secondary" id="Recharge_amount" data-id="' + arr[i].amount + '">RS. ' + arr[i].amount + '</button></td></tr>').appendTo('.4G');
                    }
                  });
                });
                var num = [];
                $("#mobile_num").keyup(function () {
                  var val = $(this).val();
                  num.push(val);
                  if (num.length == 4) {
                    $.post("/detail", { "service": val }, function (d) {
                      oprator = d.data[0].operator_code;
                      $('<option value="' + d.data[0].operator_code + '">' + d.data[0].service + '</option>').appendTo('.rech');
                    });
                  }
                });
                $(document).on("click", "#Recharge_amount", function () {
                  var amount = $(this).data().id;
                  $('#amount').val(amount);
                  $('#myModal').modal('hide');
                });

                //Recharge DTh Plane
                  var dthoprator
                $('.recharge-dth').on("change",function(d){
                  dthoprator=$(this).val();
                });
                $('.dth-recharge').on("click", function () {
                  $('#RechrgeDth').on("click", function (d) {
                    var num = $('#dth-no').val();
                    var amu = $('#dth-amount').val();
                    $.post("/users/recharge", { "mobile": mobile, "amount": amu, "oprator": dthoprator,  "rechage_type": recharge }, function (d) {
                      console.log(d);
                      window.location.href="users/recharge";
                    });
                  });
                });
              </script>

              <script>
                function openCity(evt, cityName) {
                  var i, tabcontent, tablinks;
                  tabcontent = document.getElementsByClassName("tabcontent");
                  for (i = 0; i < tabcontent.length; i++) {
                    tabcontent[i].style.display = "none";
                  }
                  tablinks = document.getElementsByClassName("tablinks");
                  for (i = 0; i < tablinks.length; i++) {
                    tablinks[i].className = tablinks[i].className.replace(" active", "");
                  }
                  document.getElementById(cityName).style.display = "block";
                  evt.currentTarget.className += " active";
                }

                // Get the element with id="defaultOpen" and click on it
                document.getElementById("defaultOpen").click();
              </script>

              <div id="menu2" class="tab-pane fade">
                <h3>Payment Electricity Bill</h3>
                <p>
                  <!-- <form> -->

                  <div class="floated-label-wrapper form-group">
                    <label for="email">Select Operator</label>
                    <select id="metro" name="metro" class="form-control recharge-form">
                      <option value="AT">Delhi</option>
                      <option value="VF">Airtel</option>
                      <option value="ID">Videocon</option>
                    </select>
                    <span>
                      <a href="#">Browse Plan</a>
                    </span>
                  </div>

                  <div class="floated-label-wrapper form-group">
                    <label for="full-name">Enter Your Customer ID</label>
                    <input type="text" id="full-name" name="full name input" placeholder="+91 " class="form-control recharge-form">
                  </div>

                  <div class="floated-label-wrapper form-group">
                    <label for="pass">Enter Amount</label>
                    <input type="password" id="pass" name="password input" placeholder="Enter Amount" class="form-control recharge-form">
                  </div>
                  <button class="btn btn-primary rechrgebutton" type="button" value="Recharge Now">


                    <!-- </form> -->
                </p>
              </div>






              <div id="menu3" class="tab-pane fade">
                <h3>Recharge Your Metro Card</h3>
                <p>
                  <form>

                    <div class="floated-label-wrapper form-group">
                      <label for="email">Select Metro</label>
                      <select id="metro" name="metro" class="form-control recharge-form">
                        <option value="AT">Delhi Metro</option>
                        <option value="VF">Mumbai Metro</option>
                        <option value="ID">Hydrabad Metro</option>
                      </select>
                    </div>


                    <div class="floated-label-wrapper form-group">
                      <label for="full-name">Metro Card</label>
                      <input type="text" id="full-name" name="full name input" placeholder="+91 " class="form-control recharge-form">
                    </div>

                    <div class="floated-label-wrapper form-group">
                      <label for="pass">Enter Amount</label>
                      <input type="password" id="pass" name="password input" placeholder="Enter Amount" class="form-control recharge-form">
                    </div>
                    <input class="btn btn-primary rechrgebutton" type="submit" value="Recharge Now">


                  </form>
                </p>
              </div>
            </div>



          </div>
          <!-- <p class="rech-p">Lorem Epsum Raj Kumar Lorem Epsum Raj Kumar</p> -->
        </div>
        <div class="col-sm-8 col-md-8 col-lg-8 col-xs-12">
          <div class="marchent-selling-box">
            <ul class="selling-handing">
              <li>
                <h3>What Our Merchants Selling</h3>
              </li>
              <li>
                <img src="images/bird.png">
              </li>
              <li class="veiw-all-pr">
                <a href="" type="button" class="btn btn-default">
                  <i class="fa fa-list" aria-hidden="true"></i> View All</a>
              </li>
            </ul>



            <div class="row">
              <div class="selling-pr">
                <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12">
                  <div class="pr-img">
                    <img src="images/prm1.png">
                  </div>
                </div>
                <div class="col-lg-10 col-md-10 col-sm-10 col-xs-12">
                  <div class="pr-cnt">
                    <h4>Lorem ipsum dolor sit amet, consectetur adipiscing</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                      dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                      ex ea commodo consequat.
                      <a href="#" type="button" class="btn btn-default read-more-pr">Read More >></a>
                    </p>

                  </div>
                </div>
              </div>
            </div>


            <div class="row">
              <div class="selling-pr">
                <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12">
                  <div class="pr-img">
                    <img src="images/prm1.png">
                  </div>
                </div>
                <div class="col-lg-10 col-md-10 col-sm-10 col-xs-12">
                  <div class="pr-cnt">
                    <h4>Lorem ipsum dolor sit amet, consectetur adipiscing</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                      dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                      ex ea commodo consequat.
                      <a href="#" type="button" class="btn btn-default read-more-pr">Read More >></a>
                    </p>

                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="selling-pr">
                <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12">
                  <div class="pr-img">
                    <img src="images/prm1.png">
                  </div>
                </div>
                <div class="col-lg-10 col-md-10 col-sm-10 col-xs-12">
                  <div class="pr-cnt">
                    <h4>Lorem ipsum dolor sit amet, consectetur adipiscing</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                      dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                      ex ea commodo consequat.
                      <a href="#" type="button" class="btn btn-default read-more-pr">Read More >></a>
                    </p>

                  </div>
                </div>
              </div>
            </div>






          </div>
        </div>
      </div>
    </div>

  </section>
  <!--       End Racharge section          -->

  <!--      Services section          -->
  <section class="Services-section">
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-lg-6 col-sm-6 col-xs-12">
          <div class="booking">
            <h3>BOOKING</h3>
            <ul class="booking-pr">
              <li class="text-center">
                <a href="#">
                  <img src="images/booking1.png">
                  <div class="caption cap-text">
                    <p>Movies</p>
                  </div>
                </a>
              </li>
              <li class="text-center">
                <a href="#">
                  <img src="images/booking2.png">
                  <div class="caption cap-text">
                    <p>Trains</p>
                  </div>
                </a>
              </li>
              <li class="text-center">
                <a href="#">
                  <img src="images/booking3.png">
                  <div class="caption cap-text">
                    <p>Bus</p>
                  </div>
                </a>
              </li>
              <li class="text-center">
                <a href="#">
                  <img src="images/booking4.png">
                  <div class="caption cap-text">
                    <p>Flights</p>
                  </div>
                </a>
              </li>
              <li class="text-center">
                <a href="#">
                  <img src="images/booking5.png">
                  <div class="caption cap-text">
                    <p>Hotels</p>
                  </div>
                </a>
              </li>.
              <li class="text-center">
                <a href="#">
                  <img src="images/more.png">
                  <div class="caption cap-text">
                    <p>More..</p>
                  </div>
                </a>
              </li>
              <!-- <li><a href="#"><img src="images/booking6.png"  ></a></li> -->

            </ul>
          </div>
        </div>
        <div class="col-md-6 col-lg-6 col-sm-6 col-xs-12">
          <div class="Services">
            <h3>SERVICES</h3>

            <ul class="Services-pr">
              <li class="text-center">
                <a href="#">
                  <img src="images/Services1.png">
                  <div class="caption cap-text">
                    <p>Matrimonial</p>
                  </div>
                </a>
              </li>
              <li class="text-center">
                <a href="#">
                  <img src="images/Services2.png">
                  <div class="caption cap-text">
                    <p>Automobile</p>
                  </div>
                </a>
              </li>
              <li class="text-center">
                <a href="#">
                  <img src="images/Services3.png">
                  <div class="caption cap-text">
                    <p>Web Designs</p>
                  </div>
                </a>
              </li>
              <li class="text-center">
                <a href="#">
                  <img src="images/Services4.png">
                  <div class="caption cap-text">
                    <p>Management</p>
                  </div>
                </a>
              </li>
              <li class="text-center">
                <a href="#">
                  <img src="images/more.png">
                  <div class="caption cap-text">
                    <p>More..</p>
                  </div>
                </a>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--    End  Services section          -->







  <!-- ============  Celebiration Section =========== -->

  <section class="Celebiration">
    <div class="container">
      <div class="row">
        <div class="col-md-4 col-sm-4 col-xs-6">
          <div class="cele-offer1">
            <img src="images/cele-1.png">
          </div>
        </div>
        <div class="col-md-8 col-sm-4 col-xs-6">
          <div class="cele-offer2">
            <img src="images/cele-2.png">
          </div>
        </div>
      </div>
    </div>
  </section>





  <!-- ============ End Celebiration Section =========== -->








  <!-- ============ Ecmrece product Section =========== -->



  <section class="e-section">
    <div class="container-fluid">
      <div class="container">
        <div class="e-product">
          <div class="row">
            <div class="col-md-12">
              <div class="panel pr-panel ">
                <div class="panel-heading pr-head">
                  <h2 class="panel-title pr-title">Leads by Merchants
                    <i class="fa fa-handshake-o" aria-hidden="true"></i>
                  </h2>
                  <span class="pull-right right-panel">
                    <!-- Tabs -->
                    <ul class="nav panel-tabs">
                      <li class="active">
                        <a href="#tab1" data-toggle="tab">Mobiles</a>
                      </li>
                      <li>
                        <a href="#tab2" data-toggle="tab">Fashion</a>
                      </li>
                      <li>
                        <a href="#tab3" data-toggle="tab">Home & Kitchen</a>
                      </li>
                      <li>
                        <a href="#tab4" data-toggle="tab">Electronics</a>
                      </li>
                      <li>
                        <a href="#tab4" data-toggle="tab">Clothes</a>
                      </li>
                    </ul>
                  </span>
                </div>
                <div class="panel-body pr-body">
                  <div class="tab-content">
                    <div class="tab-pane active" id="tab1">

                      <div class="container" style="width: 100%;">

                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12">
                            <div class="carousel carousel-showmanymoveone slide" id="itemsliderm">
                              <div class="carousel-inner">

                                <div class="item active">
                                  <div class="col-xs-12 col-sm-6 col-md-2">
                                    <a href="#">
                                      <img src="images/mobile1.png" class="img-responsive center-block">
                                    </a>
                                    <h5 class="text-center">RED MI Note4</h5>
                                    <h4 class="text-center">13MP | 16MP</h4>
                                    <h6 class="text-center">Now
                                      <i class="fa fa-inr" aria-hidden="true"></i> 15000</h6>
                                  </div>
                                </div>

                                <div class="item">
                                  <div class="col-xs-12 col-sm-6 col-md-2">
                                    <a href="#">
                                      <img src=" images/mobile4.png" class="img-responsive center-block">
                                    </a>
                                    <h5 class="text-center">RED MI Note4</h5>
                                    <h4 class="text-center">13MP | 16MP</h4>
                                    <h6 class="text-center">Now
                                      <i class="fa fa-inr" aria-hidden="true"></i> 15000</h6>
                                  </div>
                                </div>

                                <div class="item">
                                  <div class="col-xs-12 col-sm-6 col-md-2">
                                    <a href="#">
                                      <img src="images/mobile3.png" class="img-responsive center-block">
                                    </a>
                                    <span class="badge">10%</span>
                                    <h5 class="text-center">PANTALONE TERI 2</h5>
                                    <h4 class="text-center">13MP | 16MP</h4>
                                    <h6 class="text-center">Now
                                      <i class="fa fa-inr" aria-hidden="true"></i> 15000</h6>
                                  </div>
                                </div>

                                <div class="item">
                                  <div class="col-xs-12 col-sm-6 col-md-2">
                                    <a href="#">
                                      <img src="images/mobile4.png" class="img-responsive center-block">
                                    </a>
                                    <h5 class="text-center">RED MI Note4</h5>
                                    <h4 class="text-center">13MP | 16MP</h4>
                                    <h6 class="text-center">Now
                                      <i class="fa fa-inr" aria-hidden="true"></i> 15000</h6>
                                  </div>
                                </div>

                                <div class="item">
                                  <div class="col-xs-12 col-sm-6 col-md-2">
                                    <a href="#">
                                      <img src="images/mobile4.png">
                                    </a>
                                    <h5 class="text-center">RED MI Note4</h5>
                                    <h4 class="text-center">13MP | 16MP</h4>
                                    <h6 class="text-center">Now
                                      <i class="fa fa-inr" aria-hidden="true"></i> 15000</h6>
                                  </div>
                                </div>

                                <div class="item">
                                  <div class="col-xs-12 col-sm-6 col-md-2">
                                    <a href="#">
                                      <img src="images/mobile1.png" class="img-responsive center-block">
                                    </a>
                                    <h5 class="text-center">RED MI Note4</h5>
                                    <h4 class="text-center">13MP | 16MP</h4>
                                    <h6 class="text-center">Now
                                      <i class="fa fa-inr" aria-hidden="true"></i> 15000</h6>
                                  </div>
                                </div>

                              </div>

                              <div id="slider-control">
                                <a class="left carousel-control" href="#itemsliderm" data-slide="prev">
                                  <i class="fa fa-chevron-left"></i>
                                </a>
                                <a class="right carousel-control" href="#itemsliderm" data-slide="next">
                                  <i class="fa fa-chevron-right"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>


                    </div>
                    <div class="tab-pane" id="tab2">
                      <div class="container" style="width: 100%;">

                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12">
                            <div class="carousel carousel-showmanymoveone slide" id="itemsliderf">
                              <div class="carousel-inner">

                                <div class="item active">
                                  <div class="col-xs-12 col-sm-6 col-md-2">
                                    <a href="#">
                                      <img src="images/fashion1.png" class="img-responsive center-block">
                                    </a>
                                    <h5 class="text-center">ETHNIC WEAR</h5>
                                    <h4 class="text-center">13MP | 16MP</h4>
                                    <h6 class="text-center">Now
                                      <i class="fa fa-inr" aria-hidden="true"></i> 15000</h6>
                                  </div>
                                </div>

                                <div class="item">
                                  <div class="col-xs-12 col-sm-6 col-md-2">
                                    <a href="#">
                                      <img src=" images/fashion2.png" class="img-responsive center-block">
                                    </a>
                                    <h5 class="text-center">RED MI Note4</h5>
                                    <h4 class="text-center">13MP | 16MP</h4>
                                    <h6 class="text-center">Now
                                      <i class="fa fa-inr" aria-hidden="true"></i> 15000</h6>
                                  </div>
                                </div>

                                <div class="item">
                                  <div class="col-xs-12 col-sm-6 col-md-2">
                                    <a href="#">
                                      <img src="images/fashion3.png" class="img-responsive center-block">
                                    </a>
                                    <span class="badge">10%</span>
                                    <h5 class="text-center">RED MI Note4</h5>
                                    <h4 class="text-center">13MP | 16MP</h4>
                                    <h6 class="text-center">Now
                                      <i class="fa fa-inr" aria-hidden="true"></i> 15000</h6>
                                  </div>
                                </div>

                                <div class="item">
                                  <div class="col-xs-12 col-sm-6 col-md-2">
                                    <a href="#">
                                      <img src="images/fashion4.png" class="img-responsive center-block">
                                    </a>
                                    <h5 class="text-center">RED MI Note4</h5>
                                    <h4 class="text-center">13MP | 16MP</h4>
                                    <h6 class="text-center">Now
                                      <i class="fa fa-inr" aria-hidden="true"></i> 15000</h6>
                                  </div>
                                </div>

                                <div class="item">
                                  <div class="col-xs-12 col-sm-6 col-md-2">
                                    <a href="#">
                                      <img src="images/fashion5.png">
                                    </a>
                                    <h5 class="text-center">RED MI Note4</h5>
                                    <h4 class="text-center">13MP | 16MP</h4>
                                    <h6 class="text-center">Now
                                      <i class="fa fa-inr" aria-hidden="true"></i> 15000</h6>
                                  </div>
                                </div>

                                <div class="item">
                                  <div class="col-xs-12 col-sm-6 col-md-2">
                                    <a href="#">
                                      <img src="images/fashion3.png" class="img-responsive center-block">
                                    </a>
                                    <h5 class="text-center">RED MI Note4</h5>
                                    <h4 class="text-center">13MP | 16MP</h4>
                                    <h6 class="text-center">Now
                                      <i class="fa fa-inr" aria-hidden="true"></i> 15000</h6>
                                  </div>
                                </div>

                              </div>

                              <div id="slider-control">
                                <a class="left carousel-control" href="#itemsliderf" data-slide="prev">
                                  <i class="fa fa-chevron-left"></i>
                                </a>
                                <a class="right carousel-control" href="#itemsliderf" data-slide="next">
                                  <i class="fa fa-chevron-right"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane" id="tab3">
                      <div class="container" style="width: 100%;">

                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12">
                            <div class="carousel carousel-showmanymoveone slide" id="itemsliderh">
                              <div class="carousel-inner">

                                <div class="item active">
                                  <div class="col-xs-12 col-sm-6 col-md-2">
                                    <a href="#">
                                      <img src="images/mobile1.png" class="img-responsive center-block">
                                    </a>
                                    <h5 class="text-center">RED MI Note4</h5>
                                    <h4 class="text-center">13MP | 16MP</h4>
                                    <h6 class="text-center">Now
                                      <i class="fa fa-inr" aria-hidden="true"></i> 15000</h6>
                                  </div>
                                </div>

                                <div class="item">
                                  <div class="col-xs-12 col-sm-6 col-md-2">
                                    <a href="#">
                                      <img src=" images/mobile4.png" class="img-responsive center-block">
                                    </a>
                                    <h5 class="text-center">RED MI Note4</h5>
                                    <h4 class="text-center">13MP | 16MP</h4>
                                    <h6 class="text-center">Now
                                      <i class="fa fa-inr" aria-hidden="true"></i> 15000</h6>
                                  </div>
                                </div>

                                <div class="item">
                                  <div class="col-xs-12 col-sm-6 col-md-2">
                                    <a href="#">
                                      <img src="images/mobile3.png" class="img-responsive center-block">
                                    </a>
                                    <span class="badge">10%</span>
                                    <h5 class="text-center">PANTALONE TERI 2</h5>
                                    <h4 class="text-center">13MP | 16MP</h4>
                                    <h6 class="text-center">Now
                                      <i class="fa fa-inr" aria-hidden="true"></i> 15000</h6>
                                  </div>
                                </div>

                                <div class="item">
                                  <div class="col-xs-12 col-sm-6 col-md-2">
                                    <a href="#">
                                      <img src="images/mobile4.png" class="img-responsive center-block">
                                    </a>
                                    <h5 class="text-center">RED MI Note4</h5>
                                    <h4 class="text-center">13MP | 16MP</h4>
                                    <h6 class="text-center">Now
                                      <i class="fa fa-inr" aria-hidden="true"></i> 15000</h6>
                                  </div>
                                </div>

                                <div class="item">
                                  <div class="col-xs-12 col-sm-6 col-md-2">
                                    <a href="#">
                                      <img src="images/mobile4.png">
                                    </a>
                                    <h5 class="text-center">RED MI Note4</h5>
                                    <h4 class="text-center">13MP | 16MP</h4>
                                    <h6 class="text-center">Now
                                      <i class="fa fa-inr" aria-hidden="true"></i> 15000</h6>
                                  </div>
                                </div>

                                <div class="item">
                                  <div class="col-xs-12 col-sm-6 col-md-2">
                                    <a href="#">
                                      <img src="images/mobile1.png" class="img-responsive center-block">
                                    </a>
                                    <h5 class="text-center">RED MI Note4</h5>
                                    <h4 class="text-center">13MP | 16MP</h4>
                                    <h6 class="text-center">Now
                                      <i class="fa fa-inr" aria-hidden="true"></i> 15000</h6>
                                  </div>
                                </div>

                              </div>

                              <div id="slider-control">
                                <a class="left carousel-control" href="#itemsliderh" data-slide="prev">
                                  <i class="fa fa-chevron-left"></i>
                                </a>
                                <a class="right carousel-control" href="#itemsliderh" data-slide="next">
                                  <i class="fa fa-chevron-right"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane" id="tab4">
                      <div class="container" style="width: 100%;">

                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12">
                            <div class="carousel carousel-showmanymoveone slide" id="itemslidere">
                              <div class="carousel-inner">

                                <div class="item active">
                                  <div class="col-xs-12 col-sm-6 col-md-2">
                                    <a href="#">
                                      <img src="images/mobile1.png" class="img-responsive center-block">
                                    </a>
                                    <h5 class="text-center">RED MI Note4</h5>
                                    <h4 class="text-center">13MP | 16MP</h4>
                                    <h6 class="text-center">Now
                                      <i class="fa fa-inr" aria-hidden="true"></i> 15000</h6>
                                  </div>
                                </div>

                                <div class="item">
                                  <div class="col-xs-12 col-sm-6 col-md-2">
                                    <a href="#">
                                      <img src=" images/mobile4.png" class="img-responsive center-block">
                                    </a>
                                    <h5 class="text-center">RED MI Note4</h5>
                                    <h4 class="text-center">13MP | 16MP</h4>
                                    <h6 class="text-center">Now
                                      <i class="fa fa-inr" aria-hidden="true"></i> 15000</h6>
                                  </div>
                                </div>

                                <div class="item">
                                  <div class="col-xs-12 col-sm-6 col-md-2">
                                    <a href="#">
                                      <img src="images/mobile3.png" class="img-responsive center-block">
                                    </a>
                                    <span class="badge">10%</span>
                                    <h5 class="text-center">RED MI Note4</h5>
                                    <h4 class="text-center">13MP | 16MP</h4>
                                    <h6 class="text-center">Now
                                      <i class="fa fa-inr" aria-hidden="true"></i> 15000</h6>
                                  </div>
                                </div>

                                <div class="item">
                                  <div class="col-xs-12 col-sm-6 col-md-2">
                                    <a href="#">
                                      <img src="images/mobile4.png" class="img-responsive center-block">
                                    </a>
                                    <h5 class="text-center">RED MI Note4</h5>
                                    <h4 class="text-center">13MP | 16MP</h4>
                                    <h6 class="text-center">Now
                                      <i class="fa fa-inr" aria-hidden="true"></i> 15000</h6>
                                  </div>
                                </div>

                                <div class="item">
                                  <div class="col-xs-12 col-sm-6 col-md-2">
                                    <a href="#">
                                      <img src="images/mobile4.png">
                                    </a>
                                    <h5 class="text-center">RED MI Note4</h5>
                                    <h4 class="text-center">13MP | 16MP</h4>
                                    <h6 class="text-center">Now
                                      <i class="fa fa-inr" aria-hidden="true"></i> 15000</h6>
                                  </div>
                                </div>

                                <div class="item">
                                  <div class="col-xs-12 col-sm-6 col-md-2">
                                    <a href="#">
                                      <img src="images/mobile1.png" class="img-responsive center-block">
                                    </a>
                                    <h5 class="text-center">RED MI Note4</h5>
                                    <h4 class="text-center">13MP | 16MP</h4>
                                    <h6 class="text-center">Now
                                      <i class="fa fa-inr" aria-hidden="true"></i> 15000</h6>
                                  </div>
                                </div>

                              </div>

                              <div id="slider-control">
                                <a class="left carousel-control" href="#itemslidere" data-slide="prev">
                                  <i class="fa fa-chevron-left"></i>
                                </a>
                                <a class="right carousel-control" href="#itemslidere" data-slide="next">
                                  <i class="fa fa-chevron-right"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>







  <!-- ============ End Ecmrece product Section =========== -->









  <!-- ============ Deals And testimonials  Section =========== -->



  <section class="Deals-section">
    <div class="container-fluid">
      <div class="container">
        <div class="Deals-customer">
          <div class="row">
            <div class="col-md-8 col-sm-8 col-xs-12">

              <div class="Deals-img">
                <h2>Freedom Club Deals
                  <i class="fa fa-tags de-icon" aria-hidden="true"></i>
                </h2>
                <img src="images/deals.png" class="img-responsive">
              </div>
            </div>



            <div class="col-md-4 col-sm-4 col-xs-12 testi">
              <h2>
                <i class="fa fa-comments" aria-hidden="true"> What Customer Speaks</i>
              </h2>
              <div class="container" style="width: 100% !important;">

                <div class="customer">



                  <div class='row'>
                    <div class='col-md-12'>
                      <div class="carousel slide cust-sll" data-ride="carousel" id="quote-carousel1">
                        <!-- Bottom Carousel Indicators -->
                        <ol class="carousel-indicators indi">
                          <li data-target="#quote-carousel1" data-slide-to="0" class="active"></li>
                          <li data-target="#quote-carousel1" data-slide-to="1"></li>
                          <li data-target="#quote-carousel1" data-slide-to="2"></li>
                        </ol>

                        <!-- Carousel Slides / Quotes -->
                        <div class="carousel-inner teti-sli">

                          <!-- Quote 1 -->
                          <div class="item active">

                            <div class="row">
                              <div class="cust-section">
                                <div class="col-sm-12 col-md-12 cop text-center">
                                  <div class="cust-img">
                                    <img class=" img-responsive img-circle" src="images/test1.jpg">
                                  </div>
                                  <br>
                                  <div class="cust-comment text-center">
                                    <p>
                                      <strong>
                                        <i>Raj Kumar :-</i>
                                      </strong>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                                      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                      ullamco laboris nisi ut aliquip ex ea commodo
                                      <br>
                                      <a href="#">Read More..</a>
                                    </p>

                                  </div>

                                </div>
                              </div>



                            </div>

                          </div>
                          <!-- Quote 2 -->
                          <div class="item">
                            <div class="row">
                              <div class="cust-section">
                                <div class="col-sm-12 col-md-12 cop text-center">
                                  <div class="cust-img">
                                    <img class=" img-responsive img-circle" src="images/test2.jpg">
                                  </div>
                                  <br>
                                  <div class="cust-comment text-center">
                                    <p>
                                      <strong>
                                        <i>Raj Kumar :-</i>
                                      </strong>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                                      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                      ullamco laboris nisi ut aliquip ex ea commodo
                                      <br>
                                      <a href="#">Read More..</a>
                                    </p>
                                  </div>

                                </div>
                              </div>



                            </div>
                          </div>
                          <!-- Quote 3 -->
                          <div class="item">
                            <div class="row">
                              <div class="cust-section">
                                <div class="col-sm-12 col-md-12 cop text-center">
                                  <div class="cust-img">
                                    <img class=" img-responsive img-circle" src="images/test3.jpg">
                                  </div>
                                  <br>
                                  <div class="cust-comment text-center">
                                    <p>
                                      <strong>
                                        <i>Raj Kumar :-</i>
                                      </strong>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                                      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                      ullamco laboris nisi ut aliquip ex ea commodo
                                      <br>
                                      <a href="#">Read More..</a>
                                    </p>
                                  </div>

                                </div>
                              </div>



                            </div>
                          </div>
                        </div>



                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>





  <!-- ============ End Deals And testimonials Section =========== -->









  <!-- ============ Discount ans coupon Section =========== -->
  <section class="discount-coupon">
    <div class="container-fluid">
      <div class="container">
        <div class="cop-container">

          <h2>Discount Coupons
            <i class="fa fa-tag" aria-hidden="true"></i>
          </h2>

          <div class='row'>
            <div class='col-md-12'>
              <div class="carousel slide" data-ride="carousel" id="quote-carousel">
                <!-- Bottom Carousel Indicators -->


                <!-- Carousel Slides / Quotes -->
                <div class="carousel-inner">

                  <!-- Quote 1 -->
                  <div class="item active">

                    <div class="row">
                      <div class="col-sm-3 col-md-3 cop text-center">
                        <img class=" img-responsive" src="images/copun1.png">
                      </div>
                      <div class="col-sm-3 col-md-3 cop text-center">
                        <img class=" img-responsive" src="images/copun2.png">
                      </div>
                      <div class="col-sm-3 col-md-3 cop text-center">
                        <img class=" img-responsive" src="images/copun1.png">
                      </div>
                      <div class="col-sm-3 col-md-3 cop text-center">
                        <img class=" img-responsive" src="images/copun3.png">
                      </div>


                    </div>

                  </div>
                  <!-- Quote 2 -->
                  <div class="item">
                    <div class="row">
                      <div class="col-sm-3 col-md-3 cop text-center">
                        <img class=" img-responsive" src="images/copun1.png">
                      </div>
                      <div class="col-sm-3 col-md-3 cop text-center">
                        <img class=" img-responsive" src="images/copun2.png">
                      </div>
                      <div class="col-sm-3 col-md-3 cop text-center">
                        <img class=" img-responsive" src="images/copun1.png">
                      </div>
                      <div class="col-sm-3 col-md-3 cop text-center">
                        <img class=" img-responsive" src="images/copun3.png">
                      </div>


                    </div>
                  </div>
                  <!-- Quote 3 -->
                  <div class="item">
                    <div class="row">
                      <div class="col-sm-3 col-md-3 cop text-center">
                        <img class=" img-responsive" src="images/copun1.png">
                      </div>
                      <div class="col-sm-3 col-md-3 cop text-center">
                        <img class=" img-responsive" src="images/copun2.png">
                      </div>
                      <div class="col-sm-3 col-md-3 cop text-center">
                        <img class=" img-responsive" src="images/copun1.png">
                      </div>
                      <div class="col-sm-3 col-md-3 cop text-center">
                        <img class=" img-responsive" src="images/copun3.png">
                      </div>


                    </div>
                  </div>
                </div>

                <!-- Carousel Buttons Next/Prev -->
                <a data-slide="prev" href="#quote-carousel" class="left carousel-control">
                  <i class="fa fa-chevron-left"></i>
                </a>
                <a data-slide="next" href="#quote-carousel" class="right carousel-control">
                  <i class="fa fa-chevron-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>





  <!-- ============ End Discount ans coupon Section =========== -->





  <!-- ============  Policy Section =========== -->


  <section class="Policy-secion">
    <div class="container-fluid">
      <div class="container">
        <div class="policy">
          <div class="row">

            <div class="col-md-3 col-sm-3 col-xs-3">
              <div class="policy-img1">
                <img src="images/policyimg1.png">
              </div>
            </div>
            <div class="col-md-3 col-sm-3 col-xs-3">
              <div class="policy-img1">
                <img src="images/policyimg2.png">
              </div>
            </div>
            <div class="col-md-3 col-sm-3 col-xs-3">
              <div class="policy-img1">
                <img src="images/policyimg3.png">
              </div>
            </div>
            <div class="col-md-3 col-sm-3 col-xs-3">
              <div class="policy-img1">
                <img src="images/policyimg4.png">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>



  <!-- ============ End Policy Section =========== -->



  <!-- ============  Subscribe  Section =========== -->


  <section class="Subscribe-section">

    <div class="container-fluid">
      <div class="container">
        <div class="Subscribe">
          <div class="row">
            <div class="col-md-2 col-sm-2">
              <div class="subsimg1">
                <img src="images/subs1.png">
              </div>
            </div>

            <div class="col-md-8 col-sm-8">
              <div class="subs-form text-center">
                <h2>Newsletter</h2>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ut enim ad minim veniam, quis nostrud </p>
                <form class="form-horizontal">

                  <!-- Form Name -->

                  <!-- Text input-->
                  <div class="form-group">
                    <label class="control-label" for="email"></label>
                    <input id="email" name="email" type="email" placeholder="Enter Your Email" class="form-control input-md" required>
                    <br>
                    <button id="subs" name="subs" class="btn btn-default">GET NOTIFIED</button>
                  </div>
                </form>
                <!-- Button -->

              </div>
            </div>

            <div class="col-md-2 col-sm-2">
              <div class="subsimg2">
                <img src="images/subs2.png">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>


  <!-- ============  END Subscribe  Section =========== -->

  <!-- ============  Download app  Section =========== -->

  <section class="app-section">
    <div class="container-fluid">
      <div class="container">
        <div class="app">
          <div class="row">
            <div class="col-md-8 col-sm-8 col-xs-6">
              <div class="app-img">
                <img src="images/appimg.png">
              </div>
            </div>
            <div class="col-md-4 col-sm-4 col-xs-6">
              <div class="download-app">
                <ul>
                  <li>
                    <div class="applogo-img text-center">
                      <img src="images/applogo.png" class="img-responsive">
                    </div>
                  </li>
                  <li>
                    <div class="appstore-img text-center">
                      <img src="images/appstore.png" class="img-responsive">
                    </div>
                  </li>
                  <li>
                    <div class="playstore-img text-center">
                      <img src="images/playstore.png" class="img-responsive">
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>


  <!-- ============  END Download App  Section =========== -->




  <!-- ============  Fotter   Section =========== -->

  <section class="footer">
    <div class="container-fluid">
      <div class="container">
        <div class="foot-cont">
          <div class="row">
            <div class="col-md-2 col-sm-2 col-xs-6">
              <div class="navi">
                <h3>navigatio</h3>
                <ul>
                  <li>
                    <a href="">Home</a>
                  </li>
                  <li>
                    <a href="">About Us</a>
                  </li>
                  <li>
                    <a href="">Services </a>
                  </li>
                  <li>
                    <a href="">Team</a>
                  </li>
                  <li>
                    <a href="">Contact Us</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-md-2 col-sm-2 col-xs-6">
              <div class="pop-link">
                <h3>usefull link</h3>
                <ul>
                  <li>
                    <a href="">Create Account</a>
                  </li>
                  <li>
                    <a href="">Company Philosaphy</a>
                  </li>
                  <li>
                    <a href="">Corporate Culture </a>
                  </li>
                  <li>
                    <a href="">Portfolio</a>
                  </li>
                  <li>
                    <a href="">Clint Management</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-md-4 col-sm-4 col-xs-6">
              <div class="cont">
                <h3>contact Us</h3>
                <ul>
                  <li>
                    <i class="fa fa-map-marker" aria-hidden="true"></i> Pocket B Sector-5 Rohini New Delhi (102102)</li>
                  <li>
                    <i class="fa fa-phone" aria-hidden="true"></i> +91 8384868882</a>
                  </li>
                  <li>
                    <i class="fa fa-envelope-o" aria-hidden="true"></i> abcd1234@gmail.com </a>
                  </li>

                </ul>
              </div>
            </div>
            <div class="col-md-4 col-sm-4 col-xs-6">
              <div class="subs-foot">
                <h3>subscribe our Newsletter</h3>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore </p>
                <form class="form-horizontal">

                  <!-- Form Name -->

                  <!-- Text input-->
                  <div class="form-group">
                    <label class="control-label" for="email"></label>
                    <input id="email" name="email" type="email" placeholder="Enter Your Email" class="form-control input-sm" required>
                    <br>
                    <button id="subs" name="subs" class="btn btn-default">GET NOTIFIED</button>
                  </div>
                </form>
                <!-- Button -->

              </div>
            </div>
          </div>

        </div>
        <div class="row">
          <div class="col-md-6 col-sm-6 col-xs-12">

            <div class="copyright">
              <span>© Copyright 2018 Freedom Club All Rights Reserved</span>
            </div>
          </div>
          <div class="col-md-6 col-sm-6 col-xs-12">
            <div class="foot-link">
              <ul>
                <li class="fb">
                  <a href="">
                    <i class="fa fa-facebook" aria-hidden="true"></i>
                  </a>
                </li>
                <li class="tw">
                  <a href="">
                    <i class="fa fa-twitter" aria-hidden="true"></i>
                  </a>
                </li>
                <li class="gp">
                  <a href="">
                    <i class="fa fa-google-plus" aria-hidden="true"></i>
                  </a>
                </li>
                <li class="lin">
                  <a href="">
                    <i class="fa fa-linkedin" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  </section>


  <!-- ============  END Fotter  Section =========== -->





  <script>

    $(function () {
      var showClass = 'show';

      $('input').on('checkval', function () {
        var label = $(this).prev('label');
        if (this.value !== '') {
          label.addClass(showClass);
        } else {
          label.removeClass(showClass);
        }
      }).on('keyup', function () {
        $(this).trigger('checkval');
      });
    });


  </script>

  <script>
    // When the DOM is ready, run this function
    $(document).ready(function () {
      //Set the carousel options
      $('#quote-carousel, #quote-carousel1').carousel({
        pause: true,
        interval: 4000,
      });
    });
  </script>



  <script>
    $(document).ready(function () {

      $('#itemslider').carousel({ interval: 3000 });

      $('.carousel-showmanymoveone .item').each(function () {
        var itemToClone = $(this);

        for (var i = 1; i < 6; i++) {
          itemToClone = itemToClone.next();

          if (!itemToClone.length) {
            itemToClone = $(this).siblings(':first');
          }

          itemToClone.children(':first-child').clone()
            .addClass("cloneditem-" + (i))
            .appendTo($(this));
        }
      });
    });

  </script>
  <script>
    $(document).ready(function () {
      $("#share").click(function () {
        $(".social-btns").toggle();
      });
    });
  </script>

</body>




</html>