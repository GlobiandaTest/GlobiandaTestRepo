'use strict';

describe('Controller: ProtectedCtrl', function () {

  // load the controller's module
  beforeEach(module('test150327App'));

  var ProtectedCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProtectedCtrl = $controller('ProtectedCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
