describe('verify check directive', function() {
    var scope, $compile, $http, $httpBackend, $interval, $rootScope;

    beforeEach(module('check'));
    beforeEach(inject(function(_$http_, _$rootScope_, _$interval_, _$compile_, _$httpBackend_) {
        $rootScope = _$rootScope_;
        $compile = _$compile_;
        $http = _$http_;
        $interval = _$interval_;
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('/check').respond({});
    }));

    it('check init params', function() {
        var cnt = '<check-directive url="/check" number="3" interval="1000"></check-directive>';
        var element = $compile(cnt)($rootScope);
        $rootScope.$digest();
        scope = element.isolateScope();
        expect(scope.opts).toEqual({
            number:3,
            interval:1000,
            url:'/check'
        });
    });

    it('check interval and http', function() {
        var element = $compile('<check-directive></check-directive>')($rootScope);
        scope = element.isolateScope();
        $rootScope.$digest();
        expect(scope.msgs.length).toEqual(0);

        $interval.flush(10);
        $httpBackend.flush();
        expect(scope.msgs.length).toEqual(1);
    });

    it('check interval and http', function() {
        var element = $compile('<check-directive></check-directive>')($rootScope);
        scope = element.isolateScope();
        $rootScope.$digest();
        expect(scope.msgs.length).toEqual(0);

        $interval.flush(60);
        $httpBackend.flush();
        expect(scope.msgs.length).toEqual(5);
    });
});
