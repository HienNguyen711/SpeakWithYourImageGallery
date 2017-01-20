(function () {
    'use strict';

    angular.module('app')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['settingsService', 'speechSynthesisService'];

    function SettingsController(settingsService, speechSynthesisService) {
        var vm = this;

        vm.alerts = [];
        vm.text;

        vm.addAlert = addAlert;
        vm.closeAlert = closeAlert;
        vm.speak = speak;
        vm.saveSettings = saveSettings;

        vm.settings = {
            voice: "",
            rate: 1.0,
            pitch: 1.0,
            volume: 1.0
        };

        activate();
        //activate
        function activate() {
            getVoices();
            getSettings();
        }
            //getSetting function
        function getSettings() {
            settingsService.getSettings()
                .then(function (response) {
                    var settings = response.data;

                    if (settings) {
                        vm.settings = settings;
                    }
                });
        }
            //saveSettings function
        function saveSettings() {
            settingsService.saveSettings(angular.toJson(vm.settings))
                .then(function() {
                    addAlert('success', 'Settings has been saved:)');
                });
        }
            //getVoiced
        function getVoices() {
            vm.voices = speechSynthesisService.getVoices();
        }
            //speak
        function speak() {
            speechSynthesisService.speak(vm.text, vm.settings);
        }
            //addAlert
        function addAlert(type, msg) {
            vm.alerts.push({type: type, message: msg});
        }
            //close Alert
        function closeAlert(index) {
            vm.alerts.splice(index, 1);
        }
    }
})();
