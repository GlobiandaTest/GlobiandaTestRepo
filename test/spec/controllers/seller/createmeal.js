'use strict';

describe('Controller: SellerCreatemealCtrl', function () {

  // load the controller's module
  beforeEach(module('test150327App'));

  var SellerCreatemealCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SellerCreatemealCtrl = $controller('SellerCreatemealCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});