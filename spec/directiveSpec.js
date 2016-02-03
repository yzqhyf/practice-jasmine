describe('verify check directive', function() {
    var scope, $compile, $http, $httpBackend, $interval, $rootScope;

    beforeEach(module('check'));
    beforeEach(inject(function(_$http_, _$rootScope_, _$interval_, _$compile_, _$httpBackend_) {
        $rootScope = _$rootScope_;
        $compile = _$compile_;
        $http = _$http_;
        $interval = _$interval_;
        $httpBackend = _$httpBackend_;
    }));

    it('check init params', function() {
        var cnt = '<check-directive url="/check" number="3" interval="10"></check-directive>';
        var element = $compile(cnt)($rootScope);
        $rootScope.$digest();
        scope = element.isolateScope();
        expect('/check').toEqual(scope.url);
        expect('3').toEqual(scope.number);
        expect('10').toEqual(scope.interval);
    });

    it('check empty params', function(){
        var element = $compile('<check-directive></check-directive>')($rootScope);
        scope = element.ioslateScope();
        expect(scope.url).not.toBeDefined();
        expect(scope.number).not.toBeDefined();
        expect(scope.interval).not.toBeDefined();
    });
})
