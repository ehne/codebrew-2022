if ('serviceWorker' in navigator) {
  const registration = await navigator.serviceWorker.ready;
  if ('periodicSync' in registration) {
    const status = await navigator.permissions.query({
      name: 'periodic-background-sync',
    });

    if (status.state === 'granted') {
      try {
        // Register new sync every 24 hours
        await registration.periodicSync.register('checkExpiry', {
          minInterval: 24 * 60 * 60 * 1000, // 1 day
        });
        console.log('Periodic background sync registered!');
      } catch(e) {
        console.error(`Periodic background sync failed:\n${e}`);
      }
    }
  }
}