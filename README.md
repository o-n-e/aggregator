<!DOCTYPE html>
<html ng-app="myApp">
<head>
    <!-- CSS -->
    <!-- load up bootstrap and add some spacing -->
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
    <style>
        body         { padding-top:50px; }
        form         { margin-bottom:50px; }
    </style>
  <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
  <!--<script src="app.js"></script>-->
<head>
<body ng-controller="MainCtrl">
  <pre>{{data | json}}</pre>
  <pre>{{fieldMap | json}}</pre>
  <select name="fields" multiple onchange="angular.element(this).scope().getOption(this.value)">
    <option ng-repeat="x in fieldMap" value="{{x.dbname}}">{{x.displayname}}</option>
  </select>
  <div id="aggsection" ng-show="isAggSelected">
    <label>Aggregate Type</label>
    <div class="form-group">
      <div class="radio" onclick="buttonClicked()">
      <input type="radio" id="aggregatetype" ng-model="aggtype" value="sum" ng-change="setOption()">Sum</input><br>
      <input type="radio" id="aggregatetype" ng-model="aggtype" value="avg" ng-change="setOption()">Average</input><br>
      <input type="radio" id="aggregatetype" ng-model="aggtype" value="count" ng-change="setOption()">Count</input><br>
    </div>
  </div>
  <script>
    var app = angular.module('myApp', [])
    app.controller('MainCtrl', function ($scope) {
      // The JSON object.
      $scope.data = {
        'group_cols': ['calc_date', 'sector'],
        'agg_cols': ['avg(price)', 'count(closing_number_of_shares)'],
        'calc_date': ['2016-06-09']
      }
      // Map of fieldname and display names used to populate the multiline select
      $scope.fieldMap = [
        {
          dbname: 'calc_date',
          displayname: 'Calculation Date'
        },
        {
          dbname: 'sector',
          displayname: 'Sector'
        },
        {
          dbname: 'price',
          displayname: 'Price'
        },
        {
          dbname: 'closing_number_of_shares',
          displayname: 'Closing Number Of Shares'
        }
      ]

      // aggregation type - defaults to "sum"
      $scope.aggtype = 'sum'
      $scope.selectedagg

      // function called when the selected output changes
      $scope.getOption = function (dbfield) {
        // set this to true when we find what we are looking for
        var found = false
        var groups = $scope.data.group_cols
        var aggs = $scope.data.agg_cols
        // loop through all the groups to see if we find out output field
        for (var i = 0; i < groups.length; i++) {
          if (groups[i] === dbfield) {
            // we know we are dealing with a group and so can hide the aggregation section
            $scope.isAggSelected = false
            // set found = true so we don't need to itterate the aggregate fields
            found = true
            // No need to keep iterating the groups so can escape
            break
          }
        }
        // only itterate the aggregate fields if we are not a group
        if (found === false) {
          // loop through all the aggregates to see if we find out output field
          for (i = 0; i < aggs.length; i++) {
            // here we are checking to see if the field name is found inside dbfiled - remember this will be like "sum(field)"
            if (aggs[i].search(dbfield) !== -1) {
              // we know we are dealing with an aggregate field
              $scope.isAggSelected = true
              // get the index of "("
              var n = aggs[i].indexOf('(')
              // get the aggregate type as what comes before "("
              var aggtype = aggs[i].substring(0, n)
              // set aggtype to this - the radio buttons are bound to this via ng-model
              $scope.aggtype = aggtype
              // No need to keep iterating the aggregates so can escape
              break
            }
          }
        }
        $scope.selectedagg = dbfield
        // update the UI
        $scope.$digest()
      }

      // function called aggregate type is changed
      $scope.setOption = function () {
        var aggs = $scope.data.agg_cols
        var newval = $scope.aggtype + '(' + $scope.selectedagg + ')'
        // get the selected item
        for (var i = 0; i < aggs.length; i++) {
          if (aggs[i].search($scope.selectedagg) !== -1) {
            // replace the aggregate type
            $scope.data.agg_cols[i] = newval
            break
          }
        }
        // update the UI
        $scope.$digest()
      }
    })
  </script>
</body>
</html>
