const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = event;
  // Update UI notify the user they can install the PWA
  butInstall.style.display = 'block';

  console.log('👍', 'beforeinstallprompt', event);
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  // Show the install prompt
  if (deferredPrompt) {
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log('👍', 'userChoice', outcome);
    // We've used the prompt, and can't use it again, throw it away
    deferredPrompt = null;
    // Hide the install button
    butInstall.style.display = 'none';
  }
});

// Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('👍', 'appinstalled', event);
  // Clear the deferredPrompt so it can be garbage collected
  deferredPrompt = null;
  // Hide the install button
  butInstall.style.display = 'none';
});