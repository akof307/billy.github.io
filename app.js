var title = document.querySelector('.title');
var courseFeatureElements = document.querySelectorAll('.course-feature');
var button = document.querySelector('button');

navigator.serviceWorker.register('/service-worker.js');

var deferredPrompt;
window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  deferredPrompt = event;
  return false;
});
